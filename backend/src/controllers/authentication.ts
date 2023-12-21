import express, { RequestHandler } from "express";
import { createUser, getUserByEmail } from '../db/users'
import { random, authentication } from "../helpers/auth";
import CustomError from "../utils/CustomError";

export const register: RequestHandler = async (req, res) => {
    try {
        const {email, password, username} = req.body;

        if(!email || !password || !username) {
            throw new CustomError('MissingFieldError', 'A required field is missing', 422)
        }

        const existingUser = await getUserByEmail(email)
        if(existingUser) {
            throw new CustomError('DuplicateAccountError', 'This account is already registered', 409);
        }

        const salt = random()
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password) // store salted password in the database
            }
        })

        return res.status(200).json({message: 'Successfully Registered User', user: user})

    } catch(e: any) {
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}


export const login: RequestHandler = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            throw new CustomError('MissingFieldError', 'A required field is missing', 422)
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password') // INCLUDE AUTH DATA (non-selected by default)
        if(!user || !user.authentication || !user.authentication.salt) {
            throw new CustomError('UserNotFound', 'email or password is incorrect', 401)
        }

        const expectedHash = authentication(user.authentication.salt, password)

        if(user.authentication.password !== expectedHash) { // user input hashed password and stored hashed password need to match
            throw new CustomError('UserNotFound', 'email or password is incorrect', 401)
        }

        const salt = random() // if login success, generate session token for this user
        user.authentication.sessionToken = authentication(salt, user._id.toString())
        await user.save()

        res.cookie('Auth-Token', user.authentication.sessionToken, {domain: 'localhost', path: '/'}) // store session token as cookie

        res.status(200).json({message: 'Successfully Logged In User', user: user})

    } catch(e: any) {
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}
