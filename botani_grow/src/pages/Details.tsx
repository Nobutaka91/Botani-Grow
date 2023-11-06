import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useModal } from '../hooks/useModal';

import { db } from '../config/Firebase';
import {
  doc,
  deleteDoc,
  getDocs,
  collection,
  getDoc,
} from 'firebase/firestore';

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
import { PlantMemo } from '../types/plantMemo';
import { WateringInfo } from '../types/wateringInfo';
import { PlantsLinks } from '../views/organisms/PlantsLinks';
import { Edit } from '../views/organisms/Edit';

import './Details.scss';
import '../views/organisms/ButtonContainer.scss';
import { EndCareModal } from '../views/organisms/EndCareModal';
import { Console } from 'console';

type InfoProps = {
  plantsData: PlantInfo[];
  setPlantsData: React.Dispatch<React.SetStateAction<PlantInfo[]>>;
  wateringsData: WateringInfo[];
  setWateringsData: React.Dispatch<React.SetStateAction<WateringInfo[]>>;
};

export const Details: React.FC<InfoProps> = ({
  plantsData,
  setPlantsData,
  wateringsData,
  setWateringsData,
}) => {
  console.log(wateringsData);
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [memos, setMemos] = useState<PlantMemo[]>([]);

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
  const watering = wateringsData.find((watering) => watering.plantId === id);

  console.log(plant);

  const toggleCommentSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isLeafSidebarOpen) setIsLeafSidebarOpen(false);
  };

  const toggleLeafSidebar = () => {
    setIsLeafSidebarOpen(!isLeafSidebarOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleEditClick = () => {
    setIsEditModalOpen((prevState) => !prevState);
  };

  const fetchPlantDataById = async (plantId: string) => {
    const docRef = doc(db, 'plants', plantId); // plantsコレクション内の特定のIDを持つドキュメントへの参照を取得
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      if (data?.memos) {
        setMemos(data.memos);
      }
    }
  };

  const onCommentAdded = (newComment: PlantMemo) => {
    setMemos((prevMemos) => {
      const updateMemos = [...prevMemos, newComment]; // 新しいメモを既存のメモ配列に追加
      updateMemos.sort((a, b) => b.date.seconds - a.date.seconds); // 新しい配列を日付で降順にソート
      return updateMemos; // ソートされた配列をセット
    });
  };

  return (
    <div className="plant-detail pt-14 flex z-10">
      {plant ? (
        <>
          {/* Side-buttons + PlantsLinks　*/}
          <div className="buttonContainer flex-none flex-col">
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
                className="leafCount__button relative overflow-visible"
                onClick={toggleLeafSidebar}
                ref={actionButtonRef}
              >
                <TiLeaf className=" icon fa-solid fa-plus" />
                <div className="absolute bottom-0.5 -right-1.5 bg-green-200 w-5 h-5 rounded-full flex justify-center items-center text-gray ">
                  {plant.leafCount}
                </div>
              </button>
              {/* Leafサイドバー　*/}
              {isLeafSidebarOpen && (
                <LeafSidebar
                  // isLeafSidebarOpen={isLeafSidebarOpen}
                  toggleLeafSidebar={toggleLeafSidebar}
                  plant={plant}
                />
              )}
            </div>
            {/* Comment-button　*/}
            <div className="relative  comment__icon flex flex-col ">
              <div className="text-xs text-gray-500 mb-1">Memo</div>
              <button
                className="comment__button relative"
                onClick={() => {
                  setOpen(!open);
                  toggleCommentSidebar();
                }}
                ref={actionButtonRef}
              >
                <FaRegCommentDots className="icon fa-solid fa-plus" />
                {plant.memos && (
                  <div className="absolute bottom-0.5 -right-1.5 bg-green-200 w-5 h-5 rounded-full flex justify-center items-center text-gray ">
                    {plant.memos.length}
                  </div>
                )}
              </button>
            </div>

            {/* Commentサイドバー　*/}
            {isSidebarOpen && (
              <CommentSidebar
                isSidebarOpen={isSidebarOpen}
                toggleCommentSidebar={toggleCommentSidebar}
                plant={plant}
                memos={memos}
                setMemos={setMemos}
                onCommentAdded={onCommentAdded}
              />
            )}

            {/* Edit-button　*/}
            <div className="relative  edit__icon flex flex-col ">
              <div className="text-xs text-gray-500 mb-1">Edit</div>
              <button
                className="edit__button"
                onClick={handleEditClick}
                ref={actionButtonRef}
              >
                <MdEditDocument className=" icon fa-solid fa-plus" />
              </button>
            </div>

            {isEditModalOpen && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded shadow-lg w-1/2">
                  <Edit />
                  <button onClick={closeModal}>Close</button>
                </div>
              </div>
            )}

            {/* PlantsLinks　*/}
            <PlantsLinks plantsData={plantsData} currentPlantId={id} />
          </div>

          {/* メイン画面 */}
          <div className="plant-detail-main flex-grow h-screen overflow-y-auto z-0">
            {/* 植物ステータス　*/}
            <div className="flex justify-center gap-12 border-b py-8">
              {/* 水やりデータ + コンディション + メモ　*/}
              <div className="condition_container">
                <div className="flex plant__details">
                  <div className="lastWateringDay border-r border-gray-200 pr-4">
                    <span className="flex gap-1">
                      <span className="text-black opacity-80">Watered</span>

                      <MdWaterDrop
                        className="icon"
                        style={{ color: '#1a6fe7' }}
                      />
                    </span>
                    <p className="flex shadow-md rounded-lg px-4 py-2 mt-0.5">
                      2023/9/7{/*後で「水やりした日」をいれる*/}
                    </p>
                  </div>
                  <div className="thisMonth_Watering_times border-r border-gray-200 pr-4">
                    <span className="flex gap-1">
                      <span className="text-black opacity-80">This Month</span>

                      <FcPlanner className="icon" />
                    </span>
                    <p className="shadow-md rounded-lg  px-4 py-2 mt-0.5 ">
                      4 times {/*後で「今月の水やり回数」をいれる*/}
                    </p>
                  </div>
                  <div className="next_watering_day">
                    <span className="flex gap-1 items-center">
                      <span className="text-black opacity-80">Next</span>
                      <TiStopwatch className="icon" color="black" />
                    </span>
                    <p className="shadow-md rounded-lg px-4 py-2 mt-0.5 ">
                      {watering
                        ? watering.nextWateringDate.toLocaleDateString()
                        : '-'}
                    </p>
                  </div>
                </div>
                <div className="lastCondition">
                  <span className="condition_expression">Feature</span>
                  <div className="condition_memo ">
                    {plant.tags?.map((tag) => (
                      <span className="tag-text text-sm shadow-xl">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* 植物名 + 画像　*/}
              <div className="img_container">
                <div id="plant__name" className="plant__name_flex items-center">
                  <h1>{plant.name}</h1>
                  <span>({plant.startDate.toLocaleDateString()} ～ )</span>
                  <span className="plant-size">{plant.size}</span>
                  <span className="flex">
                    <PiLeafDuotone className="icon" color="green" />
                    <span className="text-black opacity-80">
                      {plant.leafCount}
                    </span>
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
