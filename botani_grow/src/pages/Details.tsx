import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { db } from '../config/Firebase';
import { doc, getDoc } from 'firebase/firestore';

import { FaCommentDots } from 'react-icons/fa6';

import { PiLeafDuotone, PiLeafFill } from 'react-icons/pi';

import { WaterChart } from './WaterChart';
import { CommentSidebar } from '../views/organisms/CommentSidebar';
import { LeafSidebar } from '../views/organisms/LeafSidebar';
import { PlantInfo } from '../types/plantInfo';
import { PlantMemo } from '../types/plantMemo';
import { WateringInfo } from '../types/wateringInfo';
import { PlantsLinks } from '../views/organisms/PlantsLinks';
import { EditModal } from '../views/organisms/Modal/Edit/EditModal';

import { WateringModal } from '../views/organisms/Modal/Watering/WateringModal';
import { QuitModal } from '../views/organisms/Modal/Quit/QuitModal';
import './Details.scss';
import '../views/organisms/ButtonContainer.scss';

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
  const [open, setOpen] = useState(false);
  const actionButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigationRef = useRef<HTMLDivElement | null>(null);
  const [isCommentSidebarOpen, setIsCommentSidebarOpen] = useState(false);
  const [isLeafSidebarOpen, setIsLeafSidebarOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isQuitModalOpen, setIsQuitModalOpen] = useState(false);
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
    setIsCommentSidebarOpen(!isCommentSidebarOpen);
    if (isLeafSidebarOpen) setIsLeafSidebarOpen(false);
    if (isEditModalOpen) setIsEditModalOpen(false);
    if (isQuitModalOpen) setIsQuitModalOpen(false);
  };

  const toggleLeafSidebar = () => {
    setIsLeafSidebarOpen(!isLeafSidebarOpen);
    if (isCommentSidebarOpen) setIsCommentSidebarOpen(false);
    if (isEditModalOpen) setIsEditModalOpen(false);
    if (isQuitModalOpen) setIsQuitModalOpen(false);
  };

  const toggleEditModal = () => {
    setIsEditModalOpen(!isEditModalOpen);
    if (isLeafSidebarOpen) setIsLeafSidebarOpen(false);
    if (isCommentSidebarOpen) setIsCommentSidebarOpen(false);
    if (isQuitModalOpen) setIsQuitModalOpen(false);
  };
  const toggleQuitModal = () => {
    if (isLeafSidebarOpen) setIsLeafSidebarOpen(false);
    if (isCommentSidebarOpen) setIsCommentSidebarOpen(false);
    if (isEditModalOpen) setIsEditModalOpen(false);
  };

  const toggleWateringModal = () => {
    if (isLeafSidebarOpen) setIsLeafSidebarOpen(false);
    if (isCommentSidebarOpen) setIsCommentSidebarOpen(false);
    if (isEditModalOpen) setIsEditModalOpen(false);
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
            <WateringModal
              plantId={id}
              plant={plant}
              toggleWateringModal={toggleWateringModal}
            />
            {/* Leaf-button　*/}
            <div
              className="relative  leafCount__icon "
              onClick={() => {
                setOpen(!open);
                toggleLeafSidebar();
              }}
            >
              <button
                className="leafCount__button relative overflow-visible"
                ref={actionButtonRef}
              >
                <PiLeafFill className=" icon fa-solid fa-plus" />
                <div className="absolute bottom-0 right-1 bg-green-200/75 w-4 h-4 rounded-full flex justify-center items-center text-gray text-xs ">
                  {plant.leafCount}
                </div>
              </button>
              <div className=" text-gray-700 my-1.5">Leaves Data</div>
              {/* Leafサイドバー　*/}
              {isLeafSidebarOpen && (
                <LeafSidebar
                  toggleLeafSidebar={toggleLeafSidebar}
                  plant={plant}
                />
              )}
            </div>
            {/* Comment-button　*/}
            <div
              className="relative  comment__icon "
              onClick={() => {
                setOpen(!open);
                toggleCommentSidebar();
              }}
            >
              <button
                className="comment__button relative"
                ref={actionButtonRef}
              >
                <FaCommentDots className="icon fa-solid fa-plus" />
                {plant.memos && (
                  <div className="absolute bottom-0 right-1 bg-green-200/75 w-4 h-4 rounded-full flex justify-center items-center text-gray text-xs ">
                    {plant.memos.length}
                  </div>
                )}
              </button>
              <div className=" text-gray-700 my-1.5">Memo</div>
            </div>

            {/* Commentサイドバー　*/}
            {isCommentSidebarOpen && (
              <CommentSidebar
                isCommentSidebarOpen={isCommentSidebarOpen}
                toggleCommentSidebar={toggleCommentSidebar}
                plant={plant}
                memos={memos}
                setMemos={setMemos}
                onCommentAdded={onCommentAdded}
              />
            )}

            {/* Edit モーダル　*/}
            <EditModal
              plantId={id}
              toggleEditModal={toggleEditModal}
              plant={plant}
            />

            {/* Quit モーダル　*/}
            <QuitModal
              plantId={id}
              plantsData={plantsData}
              setPlantsData={setPlantsData}
              plant={plant}
              toggleQuitModal={toggleQuitModal}
            />

            {/* PlantsLinks　*/}
            <PlantsLinks plantsData={plantsData} currentPlantId={id} />
          </div>

          {/* メイン画面 */}
          <div className="plant-detail-main flex-grow h-screen overflow-y-auto z-0">
            {/* 植物ステータス　*/}
            <div className="flex justify-center gap-12 border-b pt-12 pb-8">
              {/* 水やりデータ + コンディション + メモ　*/}
              <div className="condition_container">
                {/* 植物名 + タグ */}
                <div className="tagsContainer">
                  <div id="plant__name" className="plant__name_flex">
                    <h1>{plant.name}</h1>
                    <span>
                      <PiLeafDuotone
                        className="icon pointer-events-none"
                        color="green"
                      />
                    </span>
                  </div>
                  <div className="tags">
                    {plant.tags?.map((tag) => (
                      <span className="tag-text text-sm shadow-xl">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex plant__details">
                  <div className="lastWateringDay border-r border-gray-200 pr-4">
                    <span className="flex gap-1">
                      <span className="text-black opacity-80 text-xs">
                        さいごに水やりした日
                      </span>
                    </span>
                    <p className=" shadow-md rounded-lg px-4 py-3 mt-0.5 text-center opacity-80 w-28">
                      11/22{/*後で「水やりした日」をいれる*/}
                    </p>
                  </div>
                  <div className="thisMonth_Watering_times border-r border-gray-200 pr-4">
                    <span className="flex gap-1">
                      <span className="text-black opacity-80 text-xs">
                        {/* This Month */}
                        今月の水やり回数
                      </span>
                    </span>
                    <p className="shadow-md rounded-lg  px-4 py-3 mt-0.5 text-center opacity-80 w-28">
                      2 {/*後で「今月の水やり回数」をいれる*/}
                    </p>
                  </div>
                  <div className="next_watering_day">
                    <span className="flex gap-1 items-center">
                      <span className="text-black opacity-80 text-xs">
                        水やり予定日
                      </span>
                    </span>
                    <p className="shadow-md rounded-lg px-4 py-3 mt-0.5 text-center opacity-80 w-28">
                      {watering
                        ? watering.nextWateringDate.toLocaleDateString()
                        : '-'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 植物の画像 + 生育開始日　*/}
              <div className="img_container">
                {plant.iconUrl ? (
                  <img
                    src={plant.iconUrl}
                    alt={plant.name}
                    className="plant_img pointer-events-none"
                  />
                ) : null}
                <div className="plant_birth">
                  {plant.startDate.toLocaleDateString()} ～
                </div>
              </div>
            </div>
            {/* Waterヒートマップ */}
            <div className="border-b pb-6">
              <WaterChart />
            </div>
          </div>
        </>
      ) : (
        <p className="setup__p">Plant Not Found</p>
      )}
    </div>
  );
};
