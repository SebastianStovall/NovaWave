import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../store/session/session";
import { useNavigate } from "react-router-dom";

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

export const Signup: React.FC = () => {
  const navigate = useNavigate()
  const sessionUser = useAppSelector((state) => state.session.user);
  const dispatch = useAppDispatch();

  const logInUser = async () => {
    const sebassUser: ILoginUser = {
      email: "sebastianstovall@gmail.com",
      password: "password",
    };
    await dispatch(login(sebassUser));
    navigate('/')
  };

  return (
    <div>

      <div>
        <h1>Signup to Spotify</h1>
        <button onClick={logInUser}>Signup User</button>
        {/* {sessionUser ? (
          <p>{JSON.stringify(sessionUser)}</p>
        ) : (
          <p>No Current User</p>
        )} */}

        <p>
          Already a user? <button onClick={() => navigate('/login')}>Login</button>
        </p>
      </div>

    </div>
  );
};
