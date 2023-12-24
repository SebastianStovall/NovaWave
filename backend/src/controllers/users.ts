import { RequestHandler } from "express";
import { deleteUserById, getUserById, getUsers } from "../db/actions/user-actions";
import CustomError from "../utils/CustomError";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (e: any) {
    next(e)
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUserById(id);

    res.clearCookie("AuthToken", { domain: "localhost", path: "/" }); // clear session token after deleting account

    return res.json({ message: `Successfully Deleted User ${id}` });
  } catch (e: any) {
    next(e)
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      throw new CustomError(
        "MissingFieldError",
        "A required field is missing",
        422
      );
    }

    const user = await getUserById(id);
    if (user) {
      user.username = username;
      await user.save();
    }

    return res
      .status(200)
      .json({ message: "Successfully Updated User Info", user: user });
  } catch (e: any) {
    next(e)
  }
};
