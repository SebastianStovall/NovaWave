import { RequestHandler } from "express";
import { deleteUserById, getUsers } from "../db/users";
import CustomError from "../utils/CustomError";

export const getAllUsers: RequestHandler = async(req, res) => {
    try {
        const users = await getUsers()
        return res.status(200).json(users)
    } catch(e: any) {
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}

export const deleteUser: RequestHandler = async(req, res) => {
    try {
        const { id } = req.params
        const deletedUser = await deleteUserById(id)

        if (!deletedUser) {
            throw new CustomError('UserNotFound', 'Cannot delete this user. No user exists with this id', 404);
        }

        return res.json({message: `Successfully Deleted User ${id}`})
    } catch(e: any) {
        if (e instanceof CustomError) {
            res.status(e.code).json({ message: e.name, error: e.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error', error: e.message });
        }
    }
}
