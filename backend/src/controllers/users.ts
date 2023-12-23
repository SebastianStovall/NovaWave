import { RequestHandler } from "express";
import { deleteUserById, getUserById, getUsers } from "../db/actions/user-actions";
import CustomError from "../utils/CustomError";

export const getAllUsers: RequestHandler = async (req, res) => {
  try {
    const users = await getUsers();
    if(!users) {
      throw new CustomError(
        "queryError",
        "Error while querying User collection using find()",
        500
      );
    }
    return res.status(200).json(users);

  } catch (e: any) {
    if (e instanceof CustomError) {
      res.status(e.code).json({ message: e.name, error: e.message });
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.message });
    }
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserById(id);

    if (!deletedUser) {
      throw new CustomError(
        "UserNotFound",
        "Cannot delete this user. No user exists with this id",
        404
      );
    }

    res.clearCookie("AuthToken", { domain: "localhost", path: "/" }); // clear session token after deleting account

    return res.json({ message: `Successfully Deleted User ${id}` });
  } catch (e: any) {
    if (e instanceof CustomError) {
      res.status(e.code).json({ message: e.name, error: e.message });
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.message });
    }
  }
};

export const updateUser: RequestHandler = async (req, res) => {
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
    if (e instanceof CustomError) {
      res.status(e.code).json({ message: e.name, error: e.message });
    } else {
      res
        .status(500)
        .json({ message: "Internal Server Error", error: e.message });
    }
  }
};
