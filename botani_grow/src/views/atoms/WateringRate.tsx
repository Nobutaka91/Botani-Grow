import React, { useState } from 'react';
// import {FaStar} from "react-icons/fa"
import { IoMdWater } from 'react-icons/io';

import './WateringRate.scss';

export const WateringRate = () => {
  const [rating, setRating] = useState<number>(0);
  return (
    <div className="flex justify-center">
      {Array(3) // 3つの要素を持つ配列を生成
        .fill(null) // 各要素をundefinedで埋める
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
  );
};
