import React, { useState, FormEvent } from 'react';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/Firebase';

export const WateringForm: React.FC = () => {
  const [waterAmount, setWaterAmount] = useState<string>('');
  const [condition, setCondition] = useState<string>('');
  const [leafCount, setLeafCount] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 後ほどバリデーションとエラーハンドリングをおこなう
    try {
      const plantId = '取得したplantId';
      const plantDocRef = doc(db, 'plants', plantId);
      const plantDocSnap = await getDoc(plantDocRef);

      // 植物データが存在する場合のみ水やりデータを保持
      if (plantDocSnap.exists()) {
        const wateredDate = new Date();
        const nextWateringDate = new Date(wateredDate);
        nextWateringDate.setDate(
          wateredDate.getDate() + plantDocSnap.data().wateringCycle
        );

        await addDoc(collection(db, 'waterings'), {
          plantId: plantDocRef.id,
          wateredDate,
          waterAmount, // ユーザーから入力された値
          condition,
          leafCount,
          comment,
          nextWateringDate,
        });
        console.log('Watering Document written for Plant ID:', plantDocRef.id);
      }
    } catch (e) {
      console.log('Error adding document: ', e);
    }
  };

  return <form onSubmit={onSubmit}>{/* 後ほど処理を追加 */}</form>;
};
