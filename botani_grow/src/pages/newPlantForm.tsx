import React, { ChangeEvent, FormEvent, useState } from 'react';

import './newPlantForm.scss';

import { AiOutlineSwapLeft } from 'react-icons/ai';
import { TbRotateClockwise } from 'react-icons/tb';
import { VscCloudUpload } from 'react-icons/vsc';
import { PiPottedPlantDuotone, PiLeafDuotone } from 'react-icons/pi';

import { db, app } from '../config/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { dividerClasses } from '@mui/material';
import { MdWaterDrop } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { TbPlant } from 'react-icons/tb';
import { PlantInfo } from '../types/plantInfo';

type PlantProps = {
  plantsData?: PlantInfo[];
};

export const NewPlantForm: React.FC<PlantProps> = () => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('S');
  const [leafCount, setLeafCount] = useState(0);
  // const [doNotCount, setDoNotCount] = useState(false);
  const [wateringCycle, setWateringCycle] = useState(0);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [leafCountError, setLeafCountError] = useState<string | null>(null);
  const [wateringCycleError, setWateringCycleError] = useState<string | null>(
    null
  );
  const [uploadError, setUploadError] = useState<string | null>(null);

  const storage = getStorage(app); // getStorageでStorageのインスタンスを取得
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    const storageRef = ref(storage, 'images/' + file.name); // アップロードするパスを指定
    const uploadTask = uploadBytesResumable(storageRef, file); // ファイルのアップロード開始

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // 進捗の管理がここでできる
      },
      (error) => {
        // エラーハンドリング
      },
      () => {
        // アップロード開始
        setUploadError(null);
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setIconUrl(downloadURL); // Firebase StorageのURLを設定
        });
      }
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      handleFileUpload(file);
      const url = URL.createObjectURL(file);
      setIconUrl(url);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError(null);
    setLeafCountError(null);
    setWateringCycleError(null);
    setUploadError(null);

    let hasError = false;

    if (!name) {
      setNameError('*Name is required');
      hasError = true;
    }

    if (leafCount < 0 || leafCount > 100) {
      setLeafCountError('*Leaf count: 0 - 100');
      hasError = true;
    }

    if (wateringCycle < 1 || wateringCycle > 30) {
      setWateringCycleError('Watering cycle: 1 - 30');
      hasError = true;
    }

    if (!iconUrl) {
      setUploadError('*Upload failed. Please Retry.');
      hasError = true;
    }

    if (hasError) return;

    // TODO: 新規データを登録する処理
    try {
      const plantDocRef = await addDoc(collection(db, 'plants'), {
        iconUrl,
        startDate: new Date(),
        name,
        size,
        leafCount: Number(leafCount),
        wateringCycle,
        isArchived: false,
      });

      // plantDocRef.idでドキュメントid(植物id)を取得できる
      console.log('Plant Document written with ID: ', plantDocRef.id);

      const wateredDate = new Date(); // 現在の日時
      const nextWateringDate = new Date(wateredDate);
      nextWateringDate.setDate(wateredDate.getDate() + wateringCycle);
      await addDoc(collection(db, 'waterings'), {
        plantId: plantDocRef.id, // 植物IDをplantIdとして保存
        nextWateringDate,
      });
      console.log('Watering Document written for Plant ID:', plantDocRef.id);

      navigate('/Plants');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  return (
    <div>
      <div className="registerForm flex">
        <div className="registerForm-container flex">
          <div className="formDiv flex">
            <form action="" className="form grid" onSubmit={onSubmit}>
              <div className="headerDiv">
                {/* <h3>Register New Plant</h3> */}
                <div
                  className="icon-container"
                  onClick={() => {
                    document.getElementById('fileInput')?.click();
                  }}
                >
                  {iconUrl ? (
                    <img src={iconUrl} alt="uploaded_img" className="icon" />
                  ) : (
                    // <VscCloudUpload className="icon" />
                    <TbPlant className="plant-picture-icon" color="green" />
                  )}
                </div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileSelect}
                />
                {uploadError && (
                  <label className="text-red-500 text-sm">{uploadError}</label>
                )}
              </div>
              {/* <form action="" className="form grid" onSubmit={onSubmit}> */}
              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="name">Name</label>
                  {nameError && (
                    <label className="error-message">{nameError}</label>
                  )}
                </div>
                <div className="name-input flex">
                  <PiPottedPlantDuotone className="icon" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="plant name"
                    value={name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setName(e.target.value);
                    }}
                    // required
                  />
                </div>
              </div>

              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="size">Size</label>
                </div>
                <div className="size-input flex">
                  <select
                    id="size"
                    name="size"
                    value={size}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                      setSize(e.target.value);
                    }}
                    // required
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                  </select>
                </div>
              </div>
              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="leaf" className="flex gap-1">
                    <span>Count</span>
                    <PiLeafDuotone className="icon" color="green" />
                  </label>
                  {leafCountError && (
                    <label className="error-message">{leafCountError}</label>
                  )}
                </div>
                <div className="flex">
                  <div className="leaf-input flex">
                    <input
                      className="number-input"
                      id="leaf"
                      type="number"
                      name="leafCount"
                      step="1"
                      // value={leafCount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setLeafCount(Number(e.target.value));
                      }}
                      placeholder="0"
                      // required
                    />
                  </div>
                </div>
              </div>
              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="wateringCycle" className="pl-2 flex gap-1">
                    Watering Cycle
                    <MdWaterDrop
                      className="icon"
                      style={{ color: '#2253db' }}
                    />
                    <TbRotateClockwise className="icon" color="blue" />
                  </label>
                  {wateringCycleError && (
                    <label className="error-message">
                      {wateringCycleError}
                    </label>
                  )}
                </div>
                <div className="wateringCycle-input flex">
                  <input
                    type="range"
                    name="wateringCycle"
                    id="wateringCycle"
                    min="1"
                    max="30"
                    step="1"
                    value={wateringCycle}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setWateringCycle(Number(e.target.value));
                    }}
                    // required
                  />
                  <div className="text-xs">{wateringCycle} days</div>
                </div>
              </div>

              <div className="flex gap-4 mt-1">
                <button type="submit" className="add-plant-btn btn flex">
                  <span>Submit</span>
                </button>
                <button
                  className="cancel-btn btn flex"
                  onClick={() => navigate('/Plants')}
                >
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
