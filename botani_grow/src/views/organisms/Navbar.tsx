import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { New } from '../molecules/New';
import { Notification } from '../molecules/Notification';
import myImage from '../../LoginAssets/leaf-logo.png';
import './Navbar.scss';

import { PlantInfo } from '../../types/plantInfo';

type PlantProps = {
  plantsData: PlantInfo[];
};

type NavbarProps = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
} & PlantProps;

export const Navbar: React.FC<NavbarProps> = ({
  plantsData,
  isLogin,
  setIsLogin,
}) => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  };

  return (
    <header className="navigation-container fixed w-full inset-x-0 border-b-2 border-gray-200 px-32 py-1.5 backdrop-filter backdrop-blur-lg ">
      <div className=" flex justify-between items-center align-items-center">
        <div className="flex cursor-pointer" onClick={navigateHome}>
          <div className="relative ml-4">
            <img
              src={myImage}
              alt="icon"
              className="h-12 w-12 object-cover border-2 border-lime-100 bg-lime-400 rounded-full"
            />
          </div>
          <h1 className="app-name">
            Botani
            <br />
            Grow
          </h1>
        </div>
        <div className="flex mr-7">
          <div className="flex gap-1 text-base font-normal pr-4">
            <Link
              to="/Plants"
              className="hover:bg-gray-200/50 transition-all duration-300 px-2 py-3 rounded-lg text-slate-700 text-base "
            >
              Plants
            </Link>
            {isLogin ? (
              <Link
                to="/"
                className="hover:bg-gray-200/50 transition-all duration-300 px-2 py-3 rounded-lg text-slate-700  text-base "
                onClick={() => {
                  setIsLogin(false); // ログアウト処理
                }}
              >
                Logout
              </Link>
            ) : (
              <Link
                to="/"
                className="hover:bg-gray-200/50 transition-all duration-300 px-2 py-3 rounded-lg text-slate-700  text-base "
              >
                Login
              </Link>
            )}
          </div>
          <div className="flex gap-3">
            <New />
            <Notification />
          </div>
        </div>
      </div>
    </header>
  );
};
