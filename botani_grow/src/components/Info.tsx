import React from 'react';
import { Link, useParams } from 'react-router-dom';

// type PlantsData = {
//   id: number;
//   name: string;
//   // 後で「生育開始日」等も追加する
// };

type PlantInfo = {
  id: number;
  name: string;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  leafCount: number;
  waterFrequency: number; // 水やりの頻度(日数)
  previousCondition: string; // 前回の状態(良, ふつう, 微妙)
};

type InfoProps = {
  plantsData: PlantInfo[];
};

export const Info: React.FC<InfoProps> = ({ plantsData }) => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>IDが指定されていません。</p>;
  }

  // // 仮のデータ(実際にはAPIからデータをfetchする)
  // const plantsData: PlantInfo[] = [
  //   // { id: 1, name: 'Rose' },
  // ];

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
