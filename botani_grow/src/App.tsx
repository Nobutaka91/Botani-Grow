import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Top } from './pages/Top';
import { Plants } from './pages/Plants';
import { History } from './pages/History';
import { NotFound } from './pages/NotFound';
import { NewPlantForm } from './pages/newPlantForm';
import { Details } from './pages/Details';
import { Navbar } from './views/organisms/Navbar';

import { useEffect, useState } from 'react';
import { Footer } from './views/organisms/Footer';
import { Login } from './pages/Login';
import { Reset } from './pages/Reset';
import ResetSuccess from './pages/ResetSuccess';

import { db } from './config/Firebase';
import { collection, getDocs } from 'firebase/firestore';

import { PlantInfo } from './types/plantInfo';

type wateringsInfo = {
  plantId: string;
  nextWateringDate: Date;
  wateringCycle: number;
  wateringAmount: number;
};

function App() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [plantsData, setPlantsData] = useState<PlantInfo[]>([]);
  const [wateringsData, setWateringsData] = useState<wateringsInfo[]>([]);
  const location = useLocation(); // 現在のページのパスを取得
  console.log('Current path:', location.pathname);
  const isNavbarHiddenPage =
    location.pathname === '/' ||
    location.pathname === '/Login' ||
    location.pathname === '/Reset' ||
    location.pathname === '/Reset-Success' ||
    location.pathname === '/create-plant';

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'plants'));
        const plants: PlantInfo[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          plants.push({
            id: doc.id,
            iconUrl: data.iconUrl,
            name: data.name,
            size: data.size,
            leafCount: data.leafCount,
            // wateringCycle: data.wateringCycle,
            tags: data.tags,
            startDate: data.startDate?.toDate(),
            wateringAmount: data.wateringAmount,
            isArchived: data.isArchived || false,
          });
        });
        console.log(plants);
        setPlantsData(plants);
      } catch (error) {
        console.log('Error fetching plants data:', error);
      }
    };
    fetchPlantData();

    const fetchWateringsData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'waterings'));
        const waterings: wateringsInfo[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          waterings.push({
            plantId: doc.id,
            wateringCycle: data.wateringCycle,
            nextWateringDate: data.nextWateringDate.toDate(),
            wateringAmount: data.wateringAmount,
          });
        });
        console.log(waterings);
        setWateringsData(waterings);
      } catch (error) {
        console.log('Error fetching plants data:', error);
      }
    };
    fetchWateringsData();
  }, []);

  const activePlants = plantsData.filter((plant) => !plant.isArchived);

  return (
    <div className="max-w-6xl mx-auto px-6 ">
      {!isNavbarHiddenPage && (
        <div className="z-50 ">
          <Navbar
            plantsData={plantsData}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
          />
        </div>
      )}
      <div className=" mb-80 overflow-y-auto">
        <Routes>
          <Route
            path="/"
            element={
              <Login
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                numberOfActivePlants={activePlants.length}
              />
            }
          />
          <Route path="/Plants" element={<Plants plantsData={plantsData} />} />
          <Route
            path="/Plants/:id"
            element={
              <Details
                plantsData={plantsData}
                setPlantsData={setPlantsData}
                wateringsData={wateringsData}
                setWateringsData={setWateringsData}
              />
            }
          />
          <Route path="/History" element={<History />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="/Reset-Success" element={<ResetSuccess />} />
          <Route path="/AddNewPlant" element={<NewPlantForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* {!isTopPageOrLoginPage && (
        <div className="bottom-0 z-50 w-full inset-x-0">
          <div className="max-w-4xl mx-auto px-6 bottom-0">
            <Footer />
          </div>
        </div>
      )} */}
    </div>
  );
}

export default App;
