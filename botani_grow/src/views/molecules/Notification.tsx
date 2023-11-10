import React, { useEffect, useState, useRef } from 'react';
import LocalFloristTwoToneIcon from '@mui/icons-material/LocalFloristTwoTone';
import IconButton from '@mui/material/IconButton';
import { TbDropletQuestion } from 'react-icons/tb';
import './Notification.scss';

export const Notification = () => {
  const [open, setOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('open changed:', open);
    const handleClickOutside = (e: MouseEvent) => {
      // dropdownメニュー以外をクリックしたときに表示をオフにする
      // (実際にはクリックした植物の詳細情報ページに飛ぶ)
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
    <div>
      <div className="m-0 p-0 box-border bg-blue-200  w-12 h-12 rounded-full flex justify-center items-center relative">
        <div className="notification-btn">
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            <TbDropletQuestion
              type="checkbox"
              className="cursor-pointer w-full h-full font-medium text-blue-600"
            />
          </IconButton>
        </div>

        <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex justify-center items-center text-white ">
          4
        </div>
        {open && (
          <div
            className="w-48 h-120 bg-white shadow-lg absolute rounded-lg top-14 right-12 overflow-y-auto"
            ref={menuRef}
          >
            <div className="bg-green mx-auto my-1  py-1 w-11/12 rounded-lg text-white">
              <p className="text-center">
                {/* <LocalFloristTwoToneIcon /> */}
                <span className="text-black">Forgot watering?</span>
              </p>
            </div>
            <div className="">
              <p className="p-2 m-2 text-lg block rounded-lg hover:bg-lime-100/75 cursor-pointer">
                🥀Ficus bambino
              </p>
              <p className="p-2 m-2 text-lg block rounded-lg hover:bg-lime-100/75 cursor-pointer">
                🌿 Unberata
              </p>
              <p className="p-2 m-2 text-lg block rounded-lg hover:bg-lime-100/75 cursor-pointer">
                🍀七福神
              </p>
              <p className="p-2 m-2 text-lg block rounded-lg hover:bg-lime-100/75 cursor-pointer">
                🌿 Glauca
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
