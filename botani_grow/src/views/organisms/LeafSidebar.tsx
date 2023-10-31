import React, { useState } from 'react';
import './LeafSidebar.scss';

import { IoIosClose } from 'react-icons/io';
import { PiLeafDuotone, PiPottedPlantDuotone } from 'react-icons/pi';

import { LeafChart } from '../../pages/LeafChart';
import { PlantInfo } from '../../types/plantInfo';

type LeafSidebarProps = {
  toggleLeafSidebar: () => void;
  plant: PlantInfo;
};

export const LeafSidebar: React.FC<LeafSidebarProps> = ({
  // isLeafSidebarOpen,
  toggleLeafSidebar,
  plant,
}) => {
  return (
    <div className="leafSidebarContainer">
      <div className="comment-sidebar">
        <button className="close-btn" onClick={toggleLeafSidebar}>
          <IoIosClose className="close-icon" />
        </button>
        <div className="leafChart-browse">
          <div className="flex pb-5 pl-2 gap-2">
            <label className="text-base">Monthly Change</label>
            <span className="current-leaves">
              {/* This Month */}
              <PiLeafDuotone className="icon" color="green" />
            </span>
          </div>
          <div>
            {/* <div>(ここに葉の枚数をチェンジする機能を付ける)</div> */}
            {/* <p>{plant.leafCount}</p> */}
          </div>
          <div className="mx-2 mb-4">
            <LeafChart />
          </div>
        </div>
      </div>
    </div>
  );
};
