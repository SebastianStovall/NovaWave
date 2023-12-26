import { UserModel } from "../models/User";
import CustomError from "../../utils/CustomError";

// helper actions for User (used in controller functions)

export const getUsers = async () => {
  try {
    const users = await UserModel.find()
    return users
  } catch(e) {
    throw new CustomError(
      "queryError",
      "Error while querying User collection using find()",
      500
    );
  }
}

export const getUserByEmail = (email: string) => {
  try {
    return UserModel.findOne({ email })
  } catch(e) {
    throw e
  }
}

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.find({
    "authentication.sessionToken": sessionToken,
  }); // verify if a user is logged in

export const getUserById = (id: string) => UserModel.findById(id);


export const createUser = async (values: Record<string, any>) => {
  try {
    const user = await UserModel.create(values); // when using pre-middleware, specifically use mongoose create method to ensure it triggers
    return user.toObject();
  } catch (e: any) {
    throw e
  }
};

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ _id: id });
    return deletedUser;
  } catch (e) {
    throw new CustomError(
      "UserNotFound",
      "Cannot delete this user. No user exists with this id",
      404
    );
  }
};
