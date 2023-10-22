import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useModal } from '../hooks/useModal';

import { db } from '../config/Firebase';
import { doc, deleteDoc } from 'firebase/firestore';

import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import { VscCloudUpload } from 'react-icons/vsc';
import { TbPlantOff, TbPlant } from 'react-icons/tb';
import { FaRegSadCry } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdEditDocument } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa6';

import {
  IoMdNotifications,
  IoIosClose,
  IoIosAddCircleOutline,
} from 'react-icons/io';

import { AiOutlineSwapLeft } from 'react-icons/ai';
import { PiLeafDuotone, PiPottedPlantDuotone } from 'react-icons/pi';
import { GiWateringCan } from 'react-icons/gi';
import { MdWaterDrop } from 'react-icons/md';
import { FcPlanner } from 'react-icons/fc';
import { TiStopwatch, TiLeaf } from 'react-icons/ti';

import { WaterChart } from './WaterChart';
import { CommentSidebar } from '../views/organisms/CommentSidebar';
import { LeafSidebar } from '../views/organisms/LeafSidebar';
import { PlantInfo } from '../types/plantInfo';
import { PlantsLinks } from '../views/organisms/PlantsLinks';

import './Details.scss';
import '../views/organisms/ButtonContainer.scss';
import { EndCareModal } from '../views/organisms/EndCareModal';

type InfoProps = {
  plantsData: PlantInfo[];
  setPlantsData: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
};

export const Details: React.FC<InfoProps> = ({
  plantsData,
  setPlantsData,
  wateringsData,
  setWateringsData,
}) => {
  const { id } = useParams<{ id: string }>();
  const { Modal, openModal, closeModal, show } = useModal();
  const [modalType, setModalType] = useState<
    'COUNT' | 'WATERING' | 'DELETE' | 'EDIT' | 'DELETE' | null
  >(null);
  const [open, setOpen] = useState(false);
  const actionButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigationRef = useRef<HTMLDivElement | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLeafSidebarOpen, setIsLeafSidebarOpen] = useState(false);

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
  const plant = plantsData.find((plant) => plant.id === id);

  const toggleCommentSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isLeafSidebarOpen) setIsLeafSidebarOpen(false);
  };

  const toggleLeafSidebar = () => {
    setIsLeafSidebarOpen(!isLeafSidebarOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  return (
    <div className="pt-14 flex">
      {plant ? (
        <>
          {/* Side-buttons + PlantsLinks　*/}
          <div className="buttonContainer flex-none h-full flex-col">
            {/* Watering-button　*/}
            <div className="relative  watering__icon flex flex-col ">
              <div className="text-xs text-gray-500 mb-1">Watering</div>
              <button
                className="watering__button"
                onClick={() => setOpen(!open)}
                ref={actionButtonRef}
              >
                <MdWaterDrop className=" icon fa-solid fa-plus" />
              </button>
            </div>
            {/* Leaf-button　*/}
            <div className="relative  leafCount__icon flex flex-col ">
              <div className="text-xs text-gray-500 mb-1">Leaf</div>
              <button
                className="leafCount__button"
                onClick={toggleLeafSidebar}
                ref={actionButtonRef}
              >
                <TiLeaf className=" icon fa-solid fa-plus" />
              </button>
            </div>
            {/* Comment-button　*/}
            <div className="relative  comment__icon flex flex-col ">
              <div className="text-xs text-gray-500 mb-1">Memo</div>
              <button
                className="comment__button"
                onClick={() => {
                  setOpen(!open);
                  toggleCommentSidebar();
                }}
                ref={actionButtonRef}
              >
                <FaRegCommentDots className="icon fa-solid fa-plus" />
              </button>
            </div>
            {/* Edit-button　*/}
            <div className="relative  edit__icon flex flex-col ">
              <div className="text-xs text-gray-500 mb-1">Edit</div>
              <button
                className="edit__button"
                onClick={() => setOpen(!open)}
                ref={actionButtonRef}
              >
                <MdEditDocument className=" icon fa-solid fa-plus" />
              </button>
            </div>

            {/* PlantsLinks　*/}
            <PlantsLinks plantsData={plantsData} currentPlantId={id} />
          </div>

          {/* メイン画面 */}
          <div className="flex-grow h-screen overflow-y-auto">
            {/* 植物ステータス　*/}
            <div className="flex justify-center gap-12 border-b py-8">
              {/* 水やりデータ + コンディション + メモ　*/}
              <div className="condition_container">
                <div className="flex plant__details">
                  <div className="lastWateringDay border-r border-gray-200 pr-4">
                    <span className="flex gap-1">
                      Watered
                      <MdWaterDrop
                        className="icon"
                        style={{ color: '#1ab4e7' }}
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
                      {}
                      <TiStopwatch className="icon" color="" />
                    </span>
                    <p className="">
                      2023/10/03 {/*後で「次回の水やり日」をいれる*/}
                    </p>
                  </div>
                </div>
                <div className="lastCondition">
                  <span className="condition_expression">Feature</span>
                  <p className="condition_memo">タグが配置されるところ</p>
                </div>
              </div>

              {/* 植物名 + 画像　*/}
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
            {/* Waterヒートマップ */}

            <div className="border-b py-8">
              <WaterChart />
            </div>

            {/* End Careボタン　*/}
            <div className=" delete__icon ">
              <div className="text-xs text-gray-500 mb-1">End Care</div>
              <button
                className="delete__button"
                onClick={() => {
                  openModal();
                  setOpen(!open);
                }}
                ref={actionButtonRef}
              >
                <TbPlantOff className="icon fa-solid fa-plus" />
              </button>
            </div>
          </div>

          {/* Commentサイドバー　*/}
          {isSidebarOpen && (
            <CommentSidebar
              isSidebarOpen={isSidebarOpen}
              toggleCommentSidebar={toggleCommentSidebar}
            />
          )}

          {/* Leafサイドバー　*/}
          {isLeafSidebarOpen && (
            <LeafSidebar
              isLeafSidebarOpen={isLeafSidebarOpen}
              toggleLeafSidebar={toggleLeafSidebar}
              plant={plant}
            />
          )}

          {/* End Careモーダル　*/}
          <EndCareModal
            show={show}
            closeModal={closeModal}
            plantName={plant.name}
            Modal={Modal}
            plantId={id}
            plantsData={plantsData}
            setPlantsData={setPlantsData}
          />
        </>
      ) : (
        <p className="setup__p">Plant Not Found</p>
      )}
    </div>
  );
};
