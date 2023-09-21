import React from 'react';
import '../App.scss';
import logo from '../LoginAssets/leaf-logo.png';
import { AiOutlineSwapLeft } from 'react-icons/ai';

const ResetSuccess = () => {
  return (
    <>
      <div className="loginPage flex">
        <div className="container flex">
          <div className="formDiv flex">
            <div className="headerDiv ">
              <img src={logo} alt="Logo" />
              <h3 className="w-max">Password Reset Link Sent</h3>
              <h4 className="pt-6">
                Please check your email and click the link to reset your
                password.
              </h4>
            </div>

            <form action="" className="form grid">
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

export default ResetSuccess;
