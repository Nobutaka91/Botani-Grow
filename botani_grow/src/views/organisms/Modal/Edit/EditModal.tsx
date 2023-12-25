import React, { useState, ChangeEvent } from 'react';
import './EditModal.scss';

import { useModal } from '../../../../hooks/useModal';
import { TagsInput } from '../../../molecules/TagsInput';
import { PlantInfo } from '../../../../types/plantInfo';

import { MdEditDocument } from 'react-icons/md';
import { PiLeafDuotone, PiPottedPlantFill } from 'react-icons/pi';
import { BsFillCameraFill } from 'react-icons/bs';
import { FaTags } from 'react-icons/fa';
import { VscEdit } from 'react-icons/vsc';

type EditModalProps = {
  toggleEditModal: () => void;
  plant: PlantInfo;
};

export const EditModal: React.FC<EditModalProps> = ({
  toggleEditModal,
  plant,
}) => {
  const { Modal, openModal, closeModal, show } = useModal();
  const [iconUrl, setIconUrl] = useState(plant.iconUrl);
  const [name, setName] = useState(plant.name);
  const [tags, setTags] = useState(plant.tags);
  const [nameError, setNameError] = useState<string | null>(null);

  // Editモーダルを開く処理
  const handleOpen = () => {
    toggleEditModal();
    openModal(); // show -> true
  };

  const handleClose = () => {
    closeModal(); // show -> false
  };

  const onSubmit = () => {};

  const handleFileSelect = () => {};

  return (
    <>
      {/* Editボタン　*/}
      <div className="relative  edit__icon " onClick={handleOpen}>
        <button className="edit__button relative overflow-visible">
          <MdEditDocument className=" icon fa-solid fa-plus" />
        </button>
        <div className=" text-gray-700 my-1.5">Edit</div>
      </div>

      <Modal show={show}>
        <div className="editModalContainer">
          <div className="">
            <div className="registerForm flex flex-col md:flex-row">
              <div className="registerForm-container">
                <div className="formDiv flex flex-col md:flex-row">
                  <form action="" className="form" onSubmit={onSubmit}>
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
                            <img
                              src={iconUrl}
                              alt="uploaded_img"
                              className="icon"
                            />
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
                      {/* {uploadError && (
                  <label className="text-red-500 text-sm">{uploadError}</label>
                )} */}
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

                    {/* <div className="inputDiv">
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
              </div> */}

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
