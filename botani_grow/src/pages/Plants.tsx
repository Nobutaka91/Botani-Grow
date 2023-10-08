import { useModal } from '../hooks/useModal';
import { Link } from 'react-router-dom';
import { IoIosAdd } from 'react-icons/io';
// import '../App.scss';

import './Plants.scss';
import { Card } from '../views/organisms/Card';
import { PlantInfo } from '../types/plantInfo';

type PlantProps = {
  plantsData: PlantInfo[];
};

export const Plants: React.FC<PlantProps> = ({ plantsData }) => {
  console.log(plantsData);

  const { Modal, openModal, closeModal, show } = useModal(); // 後ほど, 新規登録フォームをmodalで表示させる

  return (
    <div className="pt-14">
      <div className="plants__icons h-full flex flex-col ">
        <span className="text-xs text-gray-500 mb-1">New</span>
        <button className="add_button">
          <Link to="/AddNewPlant">
            <IoIosAdd className="icon fa-solid fa-plus" />
          </Link>
        </button>
      </div>
      <div className="h-screen overflow-y-auto">
        <h1 id="title">Plants</h1>
        <div className="plantCardContainer">
          {plantsData.map((plant) => (
            <Card plant={plant} />
          ))}
        </div>
      </div>
    </div>
  );
};
