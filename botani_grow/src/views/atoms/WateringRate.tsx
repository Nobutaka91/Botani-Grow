import React, { useState } from 'react';
// import {FaStar} from "react-icons/fa"
import { IoMdWater } from 'react-icons/io';

import './WateringRate.scss';

export const WateringRate = () => {
  const [rating, setRating] = useState<number>(1);

  const ratingLevels: { [key: number]: string } = {
    1: 'low',
    2: 'medium',
    3: 'high',
  };

  // rating値に応じて表示するテキストを定義するオブジェクト
  const ratingMessages: { [key: string]: string } = {
    low: 'ひとしずく',
    medium: 'ペットボトルのキャップ1杯くらい',
    high: 'コップ半分くらい',
  };

  return (
    <>
      <div className="flex justify-center">
        {[...Array(3)] // 3つのnullを持つ配列を生成
          .map((liquid, index) => {
            const currentRate = index + 1;
            return (
              <>
                <label className="radio-label">
                  <input
                    className="radio-input"
                    type="radio"
                    value={currentRate}
                    onClick={() => setRating(currentRate)}
                  />
                  <IoMdWater
                    className="liquid"
                    color={currentRate <= rating ? 'var(--waterColor)' : 'gray'}
                  />
                </label>
              </>
            );
          })}
      </div>
      <p className="ratingMessage">{ratingMessages[ratingLevels[rating]]}</p>
    </>
  );
};
