import React from 'react';
import { Link } from 'react-router-dom';

export const Plants = () => {
  const plantsData = [
    { id: 1, name: 'Rose' },
    { id: 2, name: 'Tulip' },
    // ... その他の植物データ
  ];
  console.log(plantsData);

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
