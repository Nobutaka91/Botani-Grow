import React from 'react';
import { Link } from 'react-router-dom';

type PlantInfo = {
  id: number;
  name: string;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  leafCount: number;
  waterFrequency: number; // 水やりの頻度(日数)
  previousCondition: string; // 前回の状態(良, ふつう, 微妙)
};

type PlantProps = {
  plantsData: PlantInfo[];
};

export const Plants: React.FC<PlantProps> = ({ plantsData }) => {
  return (
    <div>
      <h1>Plant List</h1>
      <ul>
        {plantsData.map((plant) => (
          <li key={plant.id}>
            <Link to={`/Plants/${plant.id}`}>{plant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
