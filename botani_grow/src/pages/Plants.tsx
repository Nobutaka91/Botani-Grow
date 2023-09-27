import { useModal } from '../hooks/useModal';
import { Link } from 'react-router-dom';
// import '../App.scss';
import './Plants.scss';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { TbPlantOff } from 'react-icons/tb';
import { FaRegSadCry } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';

import { Card } from '../views/organisms/Card';

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

type PlantProps = {
  plantsData: PlantInfo[];
};

export const Plants: React.FC<PlantProps> = ({ plantsData }) => {
  console.log(plantsData);

  const { Modal, openModal, closeModal, show } = useModal();

  return (
    <div>
      <h1 id="title">Plants</h1>
      <div className="flex plants__icons">
        {/* <IoIosAddCircleOutline className="fa-solid fa-plus" /> */}
        <button className="plants">
          <Link to="/AddNewPlant">
            <IoIosAddCircleOutline className="icon fa-solid fa-plus" />
          </Link>
        </button>
      </div>
      <div className="plantCardContainer">
        {plantsData.map((plant) => (
          <Card
            key={plant.id}
            id={plant.id}
            iconUrl={plant.iconUrl}
            name={plant.name}
            wateringCycle={plant.wateringCycle}
          />
        ))}
      </div>

      <div className="m-8">
        {/* <div>
          <button className="">
            <Link to="/AddNewPlant">
              <IoIosAddCircleOutline className="icon" />
            </Link>
          </button>
        </div> */}
        <div>
          <button onClick={openModal} className="">
            <TbPlantOff className="icon" />
          </button>
        </div>
        <Modal show={show}>
          <div className="modal">
            <h2>削除しますか？</h2>
            <button onClick={closeModal}>close</button>
          </div>
        </Modal>
      </div>

      {/* 練習 */}
      {/* <main>
        <h1 id="title">
          Fulfill your dream of <span>World Tour</span>
        </h1>
        <div className="flex icons">
          <FaRegSadCry className="fa-solid fa-sad" />
          <IoIosAddCircleOutline className="fa-solid fa-plus" />
          <TbPlantOff className="fa-solid fa-delete" />
        </div>
        <div className="main-container">
          <div className="containers first">
            <div className="content">
              <h1>TOKYO</h1>
              <span className="flex">
                JP <FaRegSadCry className="fa-solid fa-location-dot" />
              </span>
              <p>
                前回水が少し残ってたから、次回は少なめにして様子を確認してみる
              </p>
              <button className="bookBtn">Book Tour</button>
            </div>
          </div>

          <div className="containers second">
            <div className="content">
              <h1>HOKKAIDO</h1>
              <span className="flex">
                JP <FaRegSadCry className="fa-solid fa-location-dot" />
              </span>
              <p>葉落ちがひどいから水やり無しで、霧吹きのみで。</p>
              <button className="bookBtn">Book Tour</button>
            </div>
          </div>

          <div className="containers third">
            <div className="content">
              <h1>SHIZUOKA</h1>
              <span className="flex">
                USA <FaRegSadCry className="fa-solid fa-location-dot" />
              </span>
              <p>結構水吸うから水多めで</p>
              <button className="bookBtn">Book Tour</button>
            </div>
          </div>
        </div>
      </main> */}
    </div>
  );
};
