import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useModal } from '../hooks/useModal';

import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import { VscCloudUpload } from 'react-icons/vsc';

import { TbPlantOff } from 'react-icons/tb';
import { FaRegSadCry } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

import { IoMdNotifications } from 'react-icons/io';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiOutlineSwapLeft } from 'react-icons/ai';
import { PiLeafDuotone, PiPottedPlantDuotone } from 'react-icons/pi';
import { GiWateringCan } from 'react-icons/gi';
import { MdWaterDrop } from 'react-icons/md';
import { FcPlanner } from 'react-icons/fc';
import { TiStopwatch } from 'react-icons/ti';
import './Details.scss';
import { WaterChart } from './WaterChart';
import { LeafChart } from './LeafChart';
// import { WateringHeatmap } from './WateringHeatmap';

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
  const [open, setOpen] = useState(false);
  const actionButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigationRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const targetElement = e.target as HTMLElement;

      if (
        actionButtonRef.current &&
        actionButtonRef.current.contains(targetElement)
      )
        return;
      if (
        navigationRef.current &&
        navigationRef.current.contains(targetElement)
      )
        return;

      setOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!id) {
    return <p>ID Not Specified</p>;
  }

  // idに基づいて選ばれた植物のデータを取得する
  // console.log(plantsData);
  const plant = plantsData.find((plant) => plant.id === id);

  return (
    <div className="pt-14">
      {plant ? (
        <div>
          <div className="flex justify-center gap-12 border-b py-8">
            <div className="condition_container">
              <div className="flex plant__details">
                <div className="lastWateringDay border-r border-gray-200 pr-4">
                  <span className="flex gap-1">
                    Watered
                    <MdWaterDrop
                      className="icon"
                      style={{ color: '#add8e6' }}
                    />
                  </span>
                  <p className="flex">
                    2023/9/28 {/*後で「水やりした日」をいれる*/}
                  </p>
                </div>
                <div className="thisMonth_Watering_times border-r border-gray-200 pr-4">
                  <span className="flex gap-1">
                    This Month
                    <FcPlanner className="icon" />
                  </span>
                  <p className="">
                    4 times {/*後で「今月の水やり回数」をいれる*/}
                  </p>
                </div>
                <div className="next_watering_day">
                  <span className="flex gap-1">
                    Next
                    <TiStopwatch className="icon" color="" />
                  </span>
                  <p className="">
                    2023/10/03 {/*後で「次回の水やり日」をいれる*/}
                  </p>
                </div>
              </div>
              <div className="lastCondition">
                <span className="condition_expression">Condition:😊</span>
                <p className="condition_memo">
                  前回水が少し残ってたから、次回は少なめにして
                  <br />
                  様子を確認してみる
                </p>
              </div>
            </div>
            <div className="img_container">
              <div id="plant__name" className="plant__name_flex">
                <h1>{plant.name}</h1>
                <span>({plant.startDate.toLocaleDateString()} ～ )</span>
                <span className="flex">
                  <PiLeafDuotone className="icon" color="green" />
                  {plant.leafCount}
                </span>
              </div>
              {plant.iconUrl ? (
                <img
                  src={plant.iconUrl}
                  alt={plant.name}
                  className="plant_img"
                />
              ) : null}
            </div>
          </div>

          <div>
            <div className="border-b py-8">
              <WaterChart />
            </div>
            <div className="mt-4">
              <LeafChart />
            </div>
          </div>

          <div className="relative  action__icon flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Plant Care</div>
            <button
              className="action__button"
              onClick={() => setOpen(!open)}
              ref={actionButtonRef}
            >
              <PiPottedPlantDuotone className=" icon fa-solid fa-plus" />
            </button>
            {open && (
              <div
                className="absolute bottom-full right-8 mt-2 shadow-lg action_navbar"
                ref={navigationRef}
              >
                <nav className="Navbar">
                  <ul>
                    <li
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg  rounded-lg hover:bg-lime-100 flex gap-x-2 cursor-pointer"
                    >
                      <PiLeafDuotone className="icon" color="green" />
                      <span className="count-button">Count</span>
                    </li>
                    <li
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg  rounded-lg hover:bg-lime-100 flex gap-x-2 cursor-pointer"
                    >
                      <GiWateringCan className="icon" color="blue" />
                      <span className="watering-button">Watering</span>
                    </li>
                    <li
                      onClick={() => setOpen(!open)}
                      className="p-2 text-lg  rounded-lg hover:bg-lime-100 flex gap-x-2 cursor-pointer"
                    >
                      <FiEdit className="icon" color="" />
                      <span className="delete-button">Edit</span>
                    </li>
                    <li
                      onClick={() => {
                        setOpen(!open);
                        openModal();
                      }}
                      className="p-2 text-lg  rounded-lg hover:bg-lime-100 flex gap-x-2 cursor-pointer"
                    >
                      <TbPlantOff className="icon" color="red" />
                      <span className="delete-button">Delete</span>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>

          <div className="m-8">
            <Modal show={show}>
              <div className="modal">
                <h2>削除しますか？</h2>
                <button onClick={closeModal}>close</button>
              </div>
            </Modal>
          </div>
          <Link to={'/Plants'}>
            <button className="back__btn flex">
              <AiOutlineSwapLeft className="icon" />
              <span>Back</span>
            </button>
          </Link>
        </div>
      ) : (
        <p className="setup__p">Plant Not Found</p>
      )}
    </div>
  );
};
