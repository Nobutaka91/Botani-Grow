import React from 'react';
import { Link, useParams } from 'react-router-dom';

type PlantsData = {
  id: number;
  name: string;
  // 後で「生育開始日」等も追加する
};

export const Info: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>IDが指定されていません。</p>;
  }

  // 仮のデータ(実際にはAPIからデータをfetchする)
  const plantsData: PlantsData[] = [
    { id: 1, name: 'Rose' },
    { id: 2, name: 'Tulip' },
  ];

  // idに基づいて選ばれた植物のデータを取得する
  const plant = plantsData.find((plant) => plant.id === parseInt(id, 10));

  return (
    <div>
      {plant ? (
        <>
          <p>{plant.name}</p>
          <Link to="/Plants">前に戻る</Link>
        </>
      ) : (
        <p>植物が見つかりません</p>
      )}
    </div>
  );
};
