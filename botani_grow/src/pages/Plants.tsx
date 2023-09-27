import { useModal } from '../hooks/useModal';
import { Link } from 'react-router-dom';
// import '../App.scss';
import './Plants.scss';

import { IoIosAddCircleOutline } from 'react-icons/io';

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

  const { Modal, openModal, closeModal, show } = useModal(); // 後ほど, 新規登録フォームをmodalで表示させる

  return (
    <div>
      <h1 id="title">Plants</h1>
      <div className="flex plants__icons">
        <button className="add_button">
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
    </div>
  );
};
