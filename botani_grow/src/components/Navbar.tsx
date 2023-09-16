import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notification } from './Notification';

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

export const Navbar: React.FC<PlantProps> = ({ plantsData }) => {
  const [open, setOpen] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

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
              src="/img/plant.png"
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
                      className="p-2 text-lg block rounded-lg hover:bg-blue-100"
                    >
                      Home
                    </Link>
                    <Link
                      to="/Plants"
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg block rounded-lg hover:bg-blue-100"
                    >
                      Plants
                    </Link>
                    <Link
                      to="/FeedBack"
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg block rounded-lg hover:bg-blue-100"
                    >
                      FeedBack
                    </Link>
                    <Link
                      to="/Login"
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg block rounded-lg hover:bg-blue-100"
                    >
                      Login
                    </Link>
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
