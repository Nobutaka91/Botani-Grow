export {};

import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import './EditModal.scss';

import { useModal } from '../../../../hooks/useModal';
import { TagsInput } from '../../../molecules/TagsInput';
import { PlantInfo } from '../../../../types/plantInfo';

import { MdEditDocument } from 'react-icons/md';
import { PiLeafDuotone, PiPottedPlantFill } from 'react-icons/pi';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';
import { VscEdit } from 'react-icons/vsc';

import firebase from 'firebase/app';
import { db, app } from '../../../../config/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from 'firebase/storage';

import { useNavigate } from 'react-router';

import NameInput from '../../../molecules/NameInput';
import { Modal } from '../../../../components/organisms/Modal';

type EditModalProps = {
  toggleEditModal: () => void;
  plant: PlantInfo;
  plantId: string;
  // handleIconChange: () => void;
  onClose: () => void;
  isShow: boolean;
  onOpen: () => void;
};

export const EditModal: React.FC<EditModalProps> = ({
  toggleEditModal,
  plant,
  plantId,
  // handleIconChange,
  onClose,
  isShow,
  onOpen,
}) => {
  // const { openModal, closeModal, show } = useModal();
  const [iconUrl, setIconUrl] = useState(plant.iconUrl);
  const [tempIconUrl, setTempIconUrl] = useState(plant.iconUrl);
  const [name, setName] = useState(plant.name);
  const [tempName, setTempName] = useState(plant.name);
  const [tags, setTags] = useState(plant.tags);
  const [tempTags, setTempTags] = useState(plant.tags);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [isEditingTags, setIsEditingTags] = useState(false);

  const [nameError, setNameError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const storage = getStorage(app); // Storageサービスのインスタンスを取得
  const navigate = useNavigate();

  // 選択されたファイルを保存する
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Editモーダルを開く処理
  const handleOpen = () => {
    toggleEditModal();
    onOpen();
  };

  const handleClose = () => {
    onClose();
    // setIconUrl(tempIconUrl); // 編集前のiconUrlに戻す
    // setName(tempName); // 編集前のnameに戻す
    // setTags(tempTags); // 編集前のtagsに戻す
    // setIsEditingImage(false);
    // setIsEditingName(false);
    // setIsEditingTags(false);
  };

  const handleImageUploadClick = () => {
    setTempIconUrl(iconUrl); // 現在の画像urlを一時保存
    setIsEditingImage(true);
  };

  const handleEditNameClick = () => {
    setTempName(name); // 現在のnameを一時保存
    setIsEditingName(true);
  };

  const handleEditingTags = () => {
    setTempTags(tags); // 現在のtagsを一時保存
    setIsEditingTags(true);
  };

  // ファイルアップロードのロジック
  const handleFileUpload = async (file: File) => {
    const storageRef = ref(storage, 'images/' + file.name); // アップロードするパスを指定
    const uploadSnapShot = await uploadBytes(storageRef, file); // ファイルのアップロード開始
    console.log(uploadSnapShot);
    const url = await getDownloadURL(uploadSnapShot.ref);
    return url;
  };

  // ファイル選択時にファイルを状態にセットする
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // handleFileUpload(file);
      // const url = URL.createObjectURL(file);

      // アップロードではなく、ファイルを状態にセット
      setSelectedFile(file);
      // プレビューのためにURLをセット( URL.createObjectURLを使用して、選択されたファイルのための一時的なURLを生成する)
      const tempUrl = URL.createObjectURL(file);
      setIconUrl(tempUrl);
    }
  };

  const updatePlantInfo = async (plantId: string, url: string) => {
    // 送信処理での更新のロジックを運用
    try {
      const docRef = doc(db, 'plants', plantId);

      await updateDoc(docRef, {
        iconUrl: url,
        name,
        // leafCount: Number(leafCount),
        tags,
      });
      onClose();
    } catch (e) {
      console.log('Error updating document:', e);
    }
  };

  // Updateボタンのクリック時の処理
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameError(null);
    // setLeafCountError(null);
    // setWateringCycleError(null);
    setUploadError(null);

    let hasError = false;

    if (!name) {
      setNameError('*植物名を入力してください');
      hasError = true;
    }

    // if (leafCount < 0 || leafCount > 100) {
    //   setLeafCountError('*葉の枚数: 0 ～ 100');
    //   hasError = true;
    // }

    if (!iconUrl) {
      setUploadError('*植物画像をアップロードしてください');
      hasError = true;
    }

    if (hasError) return;
    let url = iconUrl;

    if (selectedFile) {
      // 選択されたファイルがある場合、アップロードする
      url = await handleFileUpload(selectedFile);
    }

    updatePlantInfo(plantId, url || '');
  };

  return (
    <>
      {/* Editボタン　*/}
      <div className="relative  edit__icon " onClick={handleOpen}>
        <button className="edit__button relative overflow-visible">
          <MdEditDocument className=" icon fa-solid fa-plus" />
        </button>
        <div className=" text-gray-700 my-1.5">Edit</div>
      </div>

      <Modal show={isShow} onClose={onClose}>
        <div className="editModalContainer">
          <div className="">
            <div className="registerForm flex flex-col md:flex-row">
              <div className="registerForm-container">
                <div className="formDiv flex flex-col md:flex-row">
                  <form action="" className="form" onSubmit={handleSubmit}>
                    <div className="headerDiv">
                      <h1 className="modalTitle">Edit Plant</h1>
                      <div
                        className="upload-img-container relative group"
                        onClick={() => {
                          document.getElementById('fileInput')?.click();
                        }}
                      >
                        <div className="icon-container">
                          {iconUrl ? (
                            <img src={iconUrl} alt={name} className="icon" />
                          ) : (
                            <PiPottedPlantFill className="plant-picture-icon" />
                          )}
                        </div>
                        <div className="edit-plantPhoto-icon">
                          <VscEdit />
                          <span className="text-xs">Edit</span>
                        </div>
                        <span className="whitespace-nowrap rounded-lg bg-slate-700 px-2 py-1 text-xs text-white absolute -bottom-3 -left-5 opacity-0 group-hover:opacity-100 transition pointer-events-none">
                          Upload plant photo
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
                        <label className="text-red-500 text-sm">
                          {uploadError}
                        </label>
                      )}
                    </div>
                    <div className="inputDiv">
                      <div className="flex space-x-4">
                        <label htmlFor="name">Plant Name</label>
                        {nameError && (
                          <label className="error-message">{nameError}</label>
                        )}
                      </div>
                      <NameInput initialName={name} onNameChange={setName} />
                    </div>

                    <label htmlFor="tag" className="flex gap-1">
                      <FaTags className="icon" />
                      <span className="text-base opacity-75">Tags</span>
                    </label>
                    <div className="tagsInputDiv">
                      <TagsInput tags={tags} setTags={setTags} />
                    </div>
                    <div className="btn-container flex  mt-1">
                      <button className="cancel-btn btn" onClick={handleClose}>
                        <span>Cancel</span>
                      </button>
                      <button type="submit" className="add-plant-btn btn flex">
                        <span>Update</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
