import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/Firebase';

// import React from 'react';

import './Reset.scss';

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
      setEmailError('*Not Correct');
    }
  };

  return (
    <>
      <div className="resetPassword-page flex">
        <div className="container flex">
          <div className="formDiv">
            <div className="headerDiv ">
              <img src={logo} alt="Logo" />
              <h3>Reset Password</h3>
            </div>

            <form action="" className="form grid" onSubmit={onSubmit}>
              <div className="inputDiv">
                {/* <label htmlFor="email">Email</label> */}
                <div className="input flex">
                  <MdEmail className="icon" />
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="space-x-4">
                  {emailError && (
                    <label className="error-message">{emailError}</label>
                  )}
                </div>
              </div>

              <div className="button">
                <button type="submit" className="btn">
                  <span>Send</span>
                </button>
              </div>

              <span className="return-loginPage-btn flex">
                <AiOutlineSwapLeft className="icon" />
                <a href="/" className="back">
                  back
                </a>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
