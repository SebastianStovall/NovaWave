import { UserModel } from "../models/User";

// helper actions for User (used in controller functions)

export const getUsers = () => // queries all documents in collection, return null if error occured in query
  UserModel.find()
    .exec()
    .catch((error) => {
      console.error(error);
      return null;
    });

export const getUserByEmail = (email: string) => UserModel.findOne({ email });

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
    console.error('Error creating user:', e.message);
    return null;
  }
};

export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);

export const deleteUserById = async (id: string) => {
  try {
    const deletedUser = await UserModel.findOneAndDelete({ _id: id });
    return deletedUser;
  } catch (e) {
    return null;
  }
};
