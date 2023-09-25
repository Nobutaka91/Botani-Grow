import { useModal } from '../hooks/useModal';
import { Link } from 'react-router-dom';
import '../App.scss';

import { IoIosAddCircleOutline } from 'react-icons/io';
import { TbPlantOff } from 'react-icons/tb';

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
      <h1>Plants</h1>
      <ul>
        {plantsData.map((plant) => (
          <Link to={`/Plants/${plant.id}`} key={plant.id}>
            <div className="plant-card">
              {plant.iconUrl ? (
                <img src={plant.iconUrl} alt={plant.name} />
              ) : null}
              <p>Name: {plant.name}</p>
              <p>{plant.wateringCycle} days left</p>
            </div>
          </Link>
        ))}
      </ul>

      <div className="m-8">
        <div>
          <button className="">
            <Link to="/AddNewPlant">
              <IoIosAddCircleOutline className="icon" />
            </Link>
          </button>
        </div>
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
    </div>
  );
};
