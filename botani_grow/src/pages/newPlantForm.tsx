import React, { ChangeEvent, FormEvent, useState } from 'react';

import './newPlantForm.scss';

import { PiLeafDuotone, PiPottedPlantFill } from 'react-icons/pi';
import { BsFillCameraFill } from 'react-icons/bs';

import { db, app } from '../config/Firebase';
import { addDoc, collection } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { useNavigate } from 'react-router';
import { FaTags } from 'react-icons/fa';
import { PlantInfo } from '../types/plantInfo';
import { TagsInput } from '../views/molecules/TagsInput';

type PlantProps = {
  plantsData?: PlantInfo[];
};

export const NewPlantForm: React.FC<PlantProps> = () => {
  const [name, setName] = useState('');
  const [leafCount, setLeafCount] = useState(0);
  const wateringCycle = 14;
  const [tags, setTags] = useState<string[] | null>(null);
  const [iconUrl, setIconUrl] = useState<string | null>(null);

  const [nameError, setNameError] = useState<string | null>(null);
  const [leafCountError, setLeafCountError] = useState<string | null>(null);
  // const [wateringCycleError, setWateringCycleError] = useState<string | null>(
  //   null
  // );
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
    // setWateringCycleError(null);
    setUploadError(null);

    let hasError = false;

    if (!name) {
      setNameError('*植物名を入力してください');
      hasError = true;
    }

    if (leafCount < 0 || leafCount > 100) {
      setLeafCountError('*葉の枚数: 0 ～ 100');
      hasError = true;
    }

    // if (wateringCycle < 1 || wateringCycle > 30) {
    //   setWateringCycleError('Watering cycle: 1 - 30');
    //   hasError = true;
    // }

    if (!iconUrl) {
      setUploadError('*植物画像をアップロードしてください');
      hasError = true;
    }

    if (hasError) return;

    // TODO: 新規データを登録する処理
    try {
      const plantDocRef = await addDoc(collection(db, 'plants'), {
        iconUrl,
        startDate: new Date(),
        name,
        leafCount: Number(leafCount),
        tags,
        isArchived: false,
      });

      // plantDocRef.idでドキュメントid(植物id)を取得できる
      console.log('Plant Document written with ID: ', plantDocRef.id);

      const currentDate = new Date(); // 現在の日時
      const nextWateringDate = new Date(currentDate);
      nextWateringDate.setDate(currentDate.getDate() + 14); // 現在日時に14日(2週間)を足す
      await addDoc(collection(db, 'waterings'), {
        plantId: plantDocRef.id, // 植物IDをplantIdとして保存
        wateringCycle: 14,
        nextWateringDate,
      });
      console.log('Watering Document written for Plant ID:', plantDocRef.id);

      navigate('/Plants');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const handleCancel = () => {
    // ユーザーを前のページに戻す
    navigate(-1);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16  overflow-y-auto">
      <div className="registerForm flex flex-col md:flex-row">
        <div className="registerForm-container">
          <div className="formDiv flex flex-col md:flex-row">
            <form action="" className="form" onSubmit={onSubmit}>
              <div className="headerDiv">
                <h1 className="modalTitle">Register New Plant</h1>
                <div
                  className="upload-img-container relative group"
                  onClick={() => {
                    document.getElementById('fileInput')?.click();
                  }}
                >
                  <div className="icon-container">
                    {iconUrl ? (
                      <img src={iconUrl} alt="uploaded_img" className="icon" />
                    ) : (
                      <PiPottedPlantFill className="plant-picture-icon" />
                    )}
                  </div>
                  <BsFillCameraFill className="camera-icon" />
                  <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-xs text-white absolute -bottom-3 -left-5 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                    Add plant img
                  </span>
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
              <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="name">Plant Name</label>
                  {nameError && (
                    <label className="error-message">{nameError}</label>
                  )}
                </div>
                <div className="name-input flex">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="フィカス・ウンベラータ"
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
                  <label htmlFor="leaf" className="flex gap-x-0.5">
                    <PiLeafDuotone className="icon" color="green" />
                    <span>Count</span>
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
                      placeholder="6"
                      // required
                    />
                  </div>
                </div>
              </div>
              {/* <div className="inputDiv">
                <div className="flex space-x-4">
                  <label htmlFor="wateringCycle" className=" flex gap-1">
                    <MdWaterDrop
                      className="icon"
                      style={{ color: '#2253db' }}
                    />
                    Watering Cycle
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
              </div> */}

              <label htmlFor="tag" className="flex gap-1">
                <FaTags className="icon" />
                <span className="text-base opacity-75">Tags</span>
              </label>
              <div className="tagsInputDiv w-10/12 md:w-1/2 mt-4 md:mt-0 flex">
                <TagsInput tags={tags} setTags={setTags} />
              </div>
              <div className="btn-container flex  mt-1">
                <button className="cancel-btn btn" onClick={handleCancel}>
                  <span>Cancel</span>
                </button>
                <button type="submit" className="add-plant-btn btn flex">
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
