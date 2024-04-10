import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { login } from "../../store/session/session";
import { useNavigate } from "react-router-dom";
import { FormEvent } from 'react';
import styles from "./login.module.css";

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

export const Login: React.FC = () => {
  const navigate = useNavigate()
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
    const response = await dispatch(login(user));
    if(response.meta.requestStatus === 'rejected') {
      setErrors(response.payload.error)
    } else {
      navigate('/')
      window.location.reload();
    }
  };


  return (
    <div>
      <div className={styles.header}>
      </div>

      <div className={styles.mainGradient}>
        <div className={styles.formContainer}>
          <h1>Log in to Novawave</h1>
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
                  {!email && <p>Please enter your Novawave email address.</p>}
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
                  {!password && <p>Please enter your password.</p>}
                </div>

                <div className={styles.buttonContainer}>
                  <button className={styles.button} type='submit'>Log In User</button>
                  <button
                    className={styles.button}
                    type="button"
                    style={{marginTop: '15px'}}
                    onClick={() => {
                      dispatch(login({email: 'sebastianstovall@gmail.com', password: 'password'}))
                      navigate('/')
                      window.location.reload();
                    }}
                  >
                    Demo User
                  </button>
                </div>
              </div>
            </div>

            <hr className={styles.formHr2} />

          </form>

          <div className={styles.signup}>
            <div>
              <div>
              <span>Don't have an account?</span>
              </div>
              <div>
              <a href='/signup'>Signup</a>
              </div>
            </div>


          </div>

        </div>


      </div>

      <div className={styles.header}>
      </div>

    </div>
  );
};
