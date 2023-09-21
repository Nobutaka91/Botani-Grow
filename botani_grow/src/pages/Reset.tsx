import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';

import React from 'react';

import '../App.scss';

import logo from '../LoginAssets/leaf-logo.png';

import { AiOutlineSwapLeft } from 'react-icons/ai';
import { MdEmail } from 'react-icons/md';

import { sendPasswordResetEmail } from 'firebase/auth';

export const Reset = () => {
  const [emailError, setEmailError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      // リセットメールの送信に成功したらResetSuccessページに遷移
      navigate('/Reset-Success');
    } catch (error) {
      // エラーメッセージを表示する
      setEmailError('*Error Occurred');
    }
  };

  return (
    <>
      <div className="loginPage flex">
        <div className="container flex">
          <div className="formDiv flex">
            <div className="headerDiv ">
              <img src={logo} alt="Logo" />
              <h3>Reset password</h3>
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

              <button type="submit" className="btn flex">
                <span>Email Reset Link</span>
              </button>

              <span className="flex">
                <AiOutlineSwapLeft className="icon text-red-800" />
                <a href="/">Get back to login form</a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};