import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Firebase';

import React from 'react';

import '../App.scss';

// @ts-ignore
import video from '../LoginAssets/water.mp4';

import logo from '../LoginAssets/leaf-logo.png';

import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';
import { FirebaseError } from 'firebase/app';
import { signInAnonymously } from 'firebase/auth';

type LoginProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Login: React.FC<LoginProps> = ({ isLogin, setIsLogin }) => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Guestユーザーのログイン認証
  const onGuestLogin = async () => {
    try {
      const userCredential = await signInAnonymously(auth);
      console.log(userCredential);
      setIsLogin(true);
    } catch (error) {
      console.log('Guest Login Failed', error);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // ユーザーがsubmitしたときの画面のリフレッッシュを防ぐ
    setEmailError(null);
    setPasswordError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential);
      if (userCredential.user) {
        navigate('/Plants');
      }
      setIsLogin(true);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof Error) {
        // エラーオブジェクトかどうか確認
        const firebaseError = error as FirebaseError; // FireError型にキャスト

        if (firebaseError.code === 'auth/user-not-found') {
          setEmailError('*Not Correct');
        } else if (firebaseError.code === 'auth/wrong-password') {
          setPasswordError('*Not Correct');
        } else {
          setEmailError('*Not Correct');
          setPasswordError('*Not Correct');
        }
      }
    }
  };

  return (
    <>
      <div className="loginPage flex">
        <div className="container flex">
          <div className="videoDiv">
            <video
              src={video}
              // className="h-auto w-full"
              autoPlay
              muted
              loop
            ></video>

            <div className="textDiv">
              <h2 className="title">Track Plant's Health and Watering</h2>
              <p>Grow Plants Easily</p>
            </div>

            <div className="footerDiv flex">
              <span className="text">Don't you have an account?</span>
              <Link to={'/Plants'}>
                <button className="btn flex" onClick={onGuestLogin}>
                  <span>Guest</span>
                  <BsPersonCircle className="icon" />
                </button>
              </Link>
            </div>
          </div>

          <div className="formDiv flex">
            <div className="headerDiv ">
              <img src={logo} alt="Logo" />
              <h3>Botani-Grow</h3>
            </div>

            <form action="" className="form grid" onSubmit={onSubmit}>
              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="email">Email</label>
                  {emailError && (
                    <label className="error-message">{emailError}</label>
                  )}
                </div>
                <div className="input flex">
                  <MdEmail className="icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="password">Password</label>
                  {passwordError && (
                    <label className="error-message">{passwordError}</label>
                  )}
                </div>
                <div className="input flex">
                  <BsFillShieldLockFill className="icon" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn flex">
                <span>Login</span>
                <AiOutlineSwapRight className="icon" />
              </button>

              <span className="forgotPassword">
                Forgot your password? <a href="/Reset">Click Here</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};