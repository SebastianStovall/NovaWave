import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login, logout } from "../../store/session/session";

import { getQuickplayGridThunk } from "../../store/dashboard/dashboard";

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
    const payload = await dispatch(login(sebassUser));
    if(payload.type === 'session/login/fulfilled') { // getQuickplayGridThunk only called once per session. Data is persisted with redux-persist
      await dispatch(getQuickplayGridThunk())
    }
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
