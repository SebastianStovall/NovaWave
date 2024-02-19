import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { login } from "../../store/session/session";
import { useNavigate } from "react-router-dom";
import { FormEvent } from 'react';
import styles from "./signup.module.css";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const logInUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user: ILoginUser = {
      email: email,
      password: password,
    };
    console.log('am i here bros')
    const response = await dispatch(login(user));
    if(response.meta.requestStatus === 'rejected') {
      setErrors(response.payload.error)
    } else {
      navigate('/')
    }
    console.log('res -----------------', response.meta)
  };


  return (
    <div>
      <div className={styles.header}>
        Header
      </div>

      <div className={styles.mainGradient}>
        <div className={styles.formContainer}>
          <h1>Sign up to start listening</h1>
          <form onSubmit={logInUser}>

            <div className={styles.errorsContainer}>
              {errors.length > 0 && <div className={styles.errors}>
                  <p>{errors}</p>
              </div>
              }
            </div>

            <hr className={styles.formHr} />
            <div className={styles.loginInputs}>
              <div className={styles.emailContainer}>

                <div className={styles.emailLabel}>
                  <label>
                    Email
                  </label>
                </div>

                <input
                  className={styles.emailInput}
                  placeholder="Email"
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className={styles.emailError}>
                  {!email && <p>Please enter your email address.</p>}
                </div>

              </div>

              <div className={styles.usernameContainer}>

                <div className={styles.usernameLabel}>
                  <label>
                    Username
                  </label>
                </div>

                <input
                  className={styles.usernameInput}
                  placeholder="Username"
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <div className={styles.usernameError}>
                  {!email && <p>Please enter in a Username</p>}
                </div>

              </div>

              <div className={styles.passwordContainer}>
                <div className={styles.passwordLabel}>
                  <label>
                    Password
                  </label>
                </div>

                <input
                    className={styles.passwordInput}
                    type='text'
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                <div className={styles.passwordError}>
                  {!password && <p>Please enter in a password.</p>}
                </div>

                <div className={styles.buttonContainer}>
                  <button className={styles.button} type='submit'>Sign up</button>
                </div>
              </div>
            </div>

            <hr className={styles.formHr2} />

          </form>

          <div className={styles.signup}>
            <div>
              <div>
              <span>Already have an account?</span>
              </div>
              <div>
              <a href='/login'>Login</a>
              </div>
            </div>


          </div>

        </div>


      </div>

      <div className={styles.header}>
        footer
      </div>

    </div>
  );
};
