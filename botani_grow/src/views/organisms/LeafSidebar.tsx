import React, { useState } from 'react';
import './LeafSidebar.scss';

import { IoIosClose } from 'react-icons/io';
import { PiLeafDuotone, PiPottedPlantDuotone } from 'react-icons/pi';

import { LeafChart } from '../../pages/LeafChart';
import { PlantInfo } from '../../types/plantInfo';

type LeafSidebarProps = {
  isLeafSidebarOpen: boolean;
  toggleLeafSidebar: () => void;
  plant: PlantInfo;
};

export const LeafSidebar: React.FC<LeafSidebarProps> = ({
  isLeafSidebarOpen,
  toggleLeafSidebar,
  plant,
}) => {
  return (
    <div className={`leafSidebarContainer ${isLeafSidebarOpen ? 'open' : ''}`}>
      <div className="comment-sidebar">
        <button className="close-btn" onClick={toggleLeafSidebar}>
          <IoIosClose className="close-icon" />
        </button>
        <div className="leafChart-browse">
          <label>Leaf</label>
          <div className="mt-4">
            <LeafChart />
          </div>
          <div>
            <span className="flex pt-4">
              This Month
              <PiLeafDuotone className="icon" color="green" />
            </span>
            <p>{plant.leafCount}</p>
          </div>
        </div>
        <div>(ここに葉の枚数をチェンジする機能を付ける)</div>
      </div>
    </div>
  );
};
