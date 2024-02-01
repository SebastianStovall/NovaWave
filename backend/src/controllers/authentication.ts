import { RequestHandler } from "express";
import { createUser, getUserByEmail } from "../db/actions/user-actions";
import { random, authentication } from "../helpers/auth";
import CustomError from "../utils/CustomError";
import { get } from 'lodash';

export const register: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      throw new CustomError(
        "MissingFieldError",
        "A required field is missing",
        422
      );
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new CustomError(
        "DuplicateAccountError",
        "This account is already registered",
        409
      );
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password), // store salted password in the database
      },
    });

    return res.status(200).json({ message: "Successfully Registered User", user: user });
  } catch (e: any) {
    next(e)
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError(
        "MissingFieldError",
        "A required field is missing",
        422
      );
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    ); // INCLUDE AUTH DATA (non-selected by default)
    if (!user || !user.authentication || !user.authentication.salt) {
      throw new CustomError(
        "UserNotFound",
        "email or password is incorrect",
        401
      );
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      // user input hashed password and stored hashed password need to match
      throw new CustomError(
        "UserNotFound",
        "email or password is incorrect",
        401
      );
    }

    const salt = random(); // if login success, generate session token for this user
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    const isLocalhost = process.env.NODE_ENV === 'local'; // check if on local or in production env
    res.cookie("AuthToken", user.authentication.sessionToken, {
      domain: isLocalhost ? "localhost" : "novawave.onrender.com", // set cookie domain based on env
      path: "/",
    }); // store session token as cookie

    res
      .status(200)
      .json({ message: "Successfully Logged In User", user: {id: user._id, email: user.email, username: user.username} });
  } catch (e: any) {
    next(e)
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const isLocalhost = process.env.NODE_ENV === 'local'; // check if on local or in production env
    res.clearCookie("AuthToken", { domain: isLocalhost ? "localhost" : "novawave.onrender.com", path: "/" });
    res.status(200).json({ message: "Successfully signed out user" });
  } catch (e: any) {
    next(e)
  }
};


export const restoreUser: RequestHandler = async (req, res, next) => {
  try {

    interface SafeUser { // if Authenticated, attach user info
      _id: string,
      email: string
      username: string
    }

    const user = get(req, "identity") as unknown as SafeUser
    return res.status(200).json({message: 'User Logged In', isLoggedIn: true, user: {id: user._id, email: user.email, username: user.username }})

  } catch (e: any) {
    next(e)
  }
};
