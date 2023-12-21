import { RequestHandler } from 'express'
import {get, merge} from 'lodash' // get retreives nested object values and merge will merge two object's properties together

import { getUserBySessionToken } from '../db/users'
import CustomError from '../utils/CustomError'

export const isAuthenticated: RequestHandler = async(req, res, next) => { // middleware to determine if user is authenticated
    try {
        const sessionToken = req.cookies['Auth-Token']

        if(!sessionToken) {
            throw new CustomError('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403)
        }

        const existingUser = await getUserBySessionToken(sessionToken)
        if(!existingUser) {
            throw new CustomError('UserNotAuthenticated', 'You do not have permission to access this requested resource', 403)
        }

        merge(req, { identity: existingUser }) // if the user is authenticated, add a key to the req object called identity which includes the user's information

        return next()

    } catch(e: any) {
        if (e instanceof CustomError) {
            switch (e.name) {
                case 'UserNotAuthenticated':
                    res.status(e.code).json({ message: 'Unauthorized', error: e.message });
                    break;
                default:
                    break;
            }
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}
