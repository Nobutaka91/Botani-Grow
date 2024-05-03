import React, { useEffect, useState, useRef } from 'react';
import LocalFloristTwoToneIcon from '@mui/icons-material/LocalFloristTwoTone';
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
    <span className="relative group">
      <div>
        <div className="notification-btn-container m-0 p-0 box-border   w-10 h-10   flex justify-center items-center relative">
          <div
            className="notification-btn"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            <TbDropletQuestion
              type="checkbox"
              className="cursor-pointer w-full h-full font-medium text-blue-600"
            />
          </div>

          <div className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full flex justify-center items-center text-white ">
            1
          </div>
          {open && (
            <div
              className="w-48 h-120 bg-white shadow-lg absolute rounded-lg top-14 right-5 overflow-y-auto"
              ref={menuRef}
            >
              <div className="bg-green mx-auto my-1  py-1 w-11/12 rounded-lg text-white">
                <p className="text-center">
                  {/* <LocalFloristTwoToneIcon /> */}
                  <span className="text-gray-800 text-sm pt-2">
                    水やり忘れてませんか?
                  </span>
                </p>
              </div>
              <div className="hover:bg-lime-100/75 cursor-pointer flex rounded-lg p-2 m-2">
                <img
                  src="/thumbnail_image3.jpg"
                  className="w-9 h-9 object-cover rounded-lg mr-1"
                />
                <p className=" text-gray-700 text-sm">Pachypodium</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-sm text-white absolute top-12 -left-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
        Notice
      </span>
    </span>
  );
};
