import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, logout } from "../../store/session/session";

export interface ILoginUser {
  // TODO ----> Refactor interfaces to a file for User interfaces
  email: string;
  password: string;
}

export interface IRegisterUser {
  // TODO ----> Refactor interfaces to a file for User interfaces
  email: string;
  password: string;
  username: string;
}

export const Auth: React.FC = () => {
  const sessionUser = useAppSelector((state) => state.session.user);
  const dispatch = useAppDispatch();

  const logInUser = async () => {
    const sebassUser: ILoginUser = {
      email: "sebastianstovall@gmail.com",
      password: "password",
    };
    dispatch(login(sebassUser));
  };

  const logoutUser = async () => {
    await dispatch(logout());
  };

  return (
    <div>
      <h1>Signup / Login Form</h1>
      <button onClick={logInUser}>Log In User</button>
      <button onClick={logoutUser}>Logout User</button>
      {sessionUser ? (
        <p>{JSON.stringify(sessionUser)}</p>
      ) : (
        <p>No Current User</p>
      )}
    </div>
  );
};
