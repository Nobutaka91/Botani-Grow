import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Notification } from '../molecules/Notification';
import myImage from '../../LoginAssets/leaf-logo.png';

type PlantInfo = {
  id: number;
  name: string;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  leafCount: number;
  waterFrequency: number; // 水やりの頻度(日数)
  previousCondition: string; // 前回の状態(良, ふつう, 微妙)
};

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
  const location = useLocation(); // 現在のURLのパスを取得
  console.log(location.pathname);

  const [open, setOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // dropdownメニュー以外をクリックしたときに表示をオフにする
      if (e.target !== menuRef.current && e.target !== imgRef.current) {
        setOpen(false);
      }
    };

    // イベントリスナーの登録
    window.addEventListener('click', handleClickOutside);

    // コンポーネントがアンマウントされたときにイベントリスナーを削除する
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <header className="pt-4">
      <div className="bg-gray-200 flex justify-between items-center align-items-center">
        <div className="flex">
          <h1>Botani-grow</h1>
          <div className="relative ml-4">
            <img
              ref={imgRef}
              onClick={() => setOpen(!open)}
              src={myImage}
              alt="icon"
              className="h-20 w-20 object-cover border-4 border-lime-100 bg-lime-400 rounded-full cursor-pointer"
            />
            {open && (
              <div
                ref={menuRef}
                className="bg-white p-4 w-52 shadow-lg absolute -left-14 top-24 rounded-lg"
              >
                <nav>
                  <ul>
                    <Link
                      to="/"
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg  rounded-lg hover:bg-blue-100 flex justify-between"
                    >
                      <span>Top</span>
                      {isActive('/') && <span>✔️</span>}
                    </Link>
                    <Link
                      to="/Plants"
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg  rounded-lg hover:bg-blue-100 flex justify-between"
                    >
                      <span>Plants</span>
                      {isActive('/Plants') && <span>✔️</span>}
                    </Link>
                    <Link
                      to="/History"
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg  rounded-lg hover:bg-blue-100 flex justify-between"
                    >
                      <span>History</span>
                      {isActive('/History') && <span>✔️</span>}
                    </Link>
                    {isLogin ? (
                      <Link
                        to="/Logout"
                        onClick={() => {
                          setOpen(!open);
                          setIsLogin(false); // ログアウト処理
                        }}
                        className="p-2 text-lg  rounded-lg hover:bg-blue-100 flex justify-between"
                      >
                        <span>Logout</span>
                        {isActive('/Logout') && <span>✔️</span>}
                      </Link>
                    ) : (
                      <Link
                        to="/"
                        onClick={() => {
                          setOpen(!open);
                          setIsLogin(true); // ログイン処理
                        }}
                        className="p-2 text-lg  rounded-lg hover:bg-blue-100 flex justify-between"
                      >
                        <span>Login</span>
                        {isActive('/Login') && <span>✔️</span>}
                      </Link>
                    )}
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
        <div className="mr-7 -mb-32">
          <Notification />
        </div>
      </div>
    </header>
  );
};
