import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useModal } from '../hooks/useModal';

import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import { VscCloudUpload } from 'react-icons/vsc';

import { TbPlantOff } from 'react-icons/tb';
import { FaRegSadCry } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineSwapLeft } from 'react-icons/ai';
import { PiLeafDuotone } from 'react-icons/pi';
import { GiWateringCan } from 'react-icons/gi';
import './Details.scss';

type PlantInfo = {
  id: string;
  iconUrl: string | null;
  name: string;
  size: string;
  leafCount: number;
  wateringCycle: number; // 水やりの頻度(日数)
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  condition: string; // 前回の状態(良, ふつう, 微妙)
};

type InfoProps = {
  plantsData: PlantInfo[];
};

export const Details: React.FC<InfoProps> = ({ plantsData }) => {
  const { id } = useParams<{ id: string }>();
  const { Modal, openModal, closeModal, show } = useModal();

  if (!id) {
    return <p>ID Not Specified</p>;
  }

  // idに基づいて選ばれた植物のデータを取得する
  console.log(plantsData);
  const plant = plantsData.find((plant) => plant.id === id);

  return (
    <div>
      {plant ? (
        <div>
          {plant.iconUrl ? (
            <img src={plant.iconUrl} alt={plant.name} className="plant_img" />
          ) : null}
          <h1 id="plant__title">{plant.name}</h1>
          <div className="flex plant__details">
            <div className="startDate">
              <span className="">Start Date</span>
              <p>{plant.startDate.toLocaleDateString()}</p>
            </div>
            <div className="lastWatering">
              <span className="flex">Last Watering</span>
              <p className="flex">
                2023/9/28
                <GiWateringCan
                  className="fa-solid fa-location-dot"
                  color="skyblue"
                />
              </p>
            </div>
            <div className="leafCount">
              <span className="">Leaf Count</span>
              <p className="flex">
                {plant.leafCount}
                <PiLeafDuotone className="icon" color="green" />
              </p>
            </div>
          </div>
          <div className="lastCondition">
            <span className="condition_expression">😊</span>
            <p className="condition_memo">
              前回水が少し残ってたから、次回は少なめにして様子を確認してみる
            </p>
          </div>
          <Link to={'/Plants'}>
            <button className="back__btn flex">
              <span>Back</span>
              <AiOutlineSwapLeft className="icon" />
            </button>
          </Link>
          <div className="flex delete__icon">
            <button className="delete__button" onClick={openModal}>
              <TbPlantOff className="icon fa-solid fa-plus" />
            </button>
          </div>
          <div className="m-8">
            <Modal show={show}>
              <div className="modal">
                <h2>削除しますか？</h2>
                <button onClick={closeModal}>close</button>
              </div>
            </Modal>
          </div>
        </div>
      ) : (
        <p className="setup__p">Plant Not Found</p>
      )}
    </div>
  );
};
