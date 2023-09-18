import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useModal } from './hooks/useModal';

import NaturePeopleIcon from '@mui/icons-material/NaturePeople';

type PlantInfo = {
  id: number;
  name: string;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  leafCount: number;
  waterFrequency: number; // 水やりの頻度(日数)
  previousCondition: string; // 前回の状態(良, ふつう, 微妙)
};

type InfoProps = {
  plantsData: PlantInfo[];
};

export const Info: React.FC<InfoProps> = ({ plantsData }) => {
  const { id } = useParams<{ id: string }>();
  const { Modal, openModal, closeModal } = useModal();

  if (!id) {
    return <p>IDが指定されていません。</p>;
  }

  // // 仮のデータ(実際にはAPIからデータをfetchする)
  // const plantsData: PlantInfo[] = [
  //   // { id: 1, name: 'Rose' },
  // ];

  // idに基づいて選ばれた植物のデータを取得する
  const plant = plantsData.find((plant) => plant.id === parseInt(id, 10));

  return (
    <div>
      {plant ? (
        <>
          <p>{plant.name}</p>
          <div className="m-8">
            <div>
              <button
                onClick={openModal}
                className="border rounded-lg border-emerald-400"
              >
                Open
              </button>
            </div>
            <Modal>
              <div>
                <div className="bg-white max-w-full max-h-full w-full h-full p-4 rounded-3xl">
                  <div className="w-80 flex flex-col border  bg-sky-400 rounded-3xl items-center mx-auto">
                    <p className="font-sans	text-xl font-medium text-white">
                      Login To Account
                    </p>
                    <div className="flex flex-col w-10/12">
                      <input
                        className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base font-medium tracking-wide indent-7"
                        type="text"
                        placeholder="📧 Email"
                      />
                      <input
                        className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base font-medium tracking-wide indent-7"
                        type="password"
                        placeholder="🔑 Password"
                      />
                      <button className="my-2 px-2 py-2 outline-none border-none  rounded-3xl text-base bg-sky-600 hover:bg-sky-700 text-white font-medium uppercase cursor-pointer">
                        Sign In
                      </button>
                    </div>
                    <div className="flex justify-between w-full">
                      <div></div>
                      <div className="cursor-pointer text-xs">
                        <span>Forgot Password?</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="border rounded-lg border-emerald-400"
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
          <Link to="/Plants">前に戻る</Link>
        </>
      ) : (
        <p>植物が見つかりません</p>
      )}
    </div>
  );
};
