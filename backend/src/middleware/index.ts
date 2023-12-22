import { RequestHandler } from 'express'
import {get, merge} from 'lodash' // get retreives nested object values and merge will merge two object's properties together

import { getUserBySessionToken } from '../db/users'
import CustomError from '../utils/CustomError'

export const isOwner: RequestHandler = async(req, res, next) => {
    try {
        const {id} = req.params
        const currentUserId = get(req, 'identity._id') as unknown as string // key into identify and grab ._id field

        if(!currentUserId || currentUserId.toString() !== id) {
            throw new CustomError('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403)
        }

        next()

    } catch(e: any) {
        console.log("ERROR STACK", e.stack)
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}

export const isAuthenticated: RequestHandler = async(req, res, next) => { // middleware to determine if user is authenticated
    try {
        const sessionToken = req.cookies['AuthToken']

        if(!sessionToken) {
            throw new CustomError('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)
        if(!existingUser) {
            throw new CustomError('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403)
        }

        merge(req, { identity: existingUser[0] }) // if the user is authenticated, add a key to the req object called identity which includes the user's information

        return next()

    } catch(e: any) {
        console.log("ERROR STACK", e.stack)
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}
