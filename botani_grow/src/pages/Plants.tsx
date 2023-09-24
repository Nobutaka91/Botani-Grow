import React, { ChangeEvent, FormEvent, useState } from 'react';
// import { useModal } from '../hooks/useModal';
import { Link } from 'react-router-dom';
import '../App.scss';

import logo from '../LoginAssets/leaf-logo.png';

import { AiOutlineSwapRight } from 'react-icons/ai';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { PiPottedPlantDuotone, PiLeafDuotone } from 'react-icons/pi';
// import { FirebaseError } from 'firebase/app';
// import { signInAnonymously } from 'firebase/auth';

type PlantInfo = {
  id: number;
  name: string;
  startDate: Date;
  leafCount: number;
  wateringCycle: number; // 水やりの頻度(日数)
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  condition: string; // 前回の状態(良, ふつう, 微妙)
};

type PlantProps = {
  plantsData: PlantInfo[];
};

export const Plants: React.FC<PlantProps> = React.memo(({ plantsData }) => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('S');
  const [leafCount, setLeafCount] = useState(0);
  const [wateringCycle, setWateringCycle] = useState(0);

  // const { Modal, openModal, closeModal, show } = useModal();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 新規データを登録する処理
  };

  return (
    <div>
      <h1>Plant List</h1>
      <ul>
        {plantsData.map((plant) => (
          <li key={plant.id}>
            <Link to={`/Plants/${plant.id}`}>{plant.name}</Link>
          </li>
        ))}
      </ul>
      <div className="m-8">
        <div>
          <button
            // onClick={openModal}
            className="border rounded-lg border-emerald-400"
          >
            <Link to="/create-plant">
              <IoIosAddCircleOutline className="icon" />
            </Link>
          </button>
        </div>
        {/* <Modal show={show}></Modal> */}
      </div>
    </div>
  );
});
