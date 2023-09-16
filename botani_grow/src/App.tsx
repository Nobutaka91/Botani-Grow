import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Plants } from './components/Plants';
import { FeedBack } from './components/FeedBack';
import { NotFound } from './components/NotFound';
import { Login } from './components/Login';
import { Info } from './components/Info';
import { Navbar } from './components/Navbar';

import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';

type PlantInfo = {
  id: number;
  name: string;
  startDate: Date;
  wateringAmount: string; // 水やりの量(多, ふつう, 少)
  leafCount: number;
  waterFrequency: number; // 水やりの頻度(日数)
  previousCondition: string; // 前回の状態(良, ふつう, 微妙)
};

function App() {
  const [plantsData, setPlantsData] = useState<PlantInfo[]>([]);

  // データをフェッチする処理(後でFirebaseと連携)
  useEffect(() => {
    // 仮のデータ
    const fetchedData: PlantInfo[] = [
      {
        id: 1,
        name: 'Ficus Bambino',
        startDate: new Date(),
        wateringAmount: '多',
        leafCount: 11,
        waterFrequency: 14,
        previousCondition: '良',
      },
      // ... Firebaseから取得するデータ形式
    ];
    setPlantsData(fetchedData);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="z-50 ">
        <Navbar plantsData={plantsData} />
      </div>
      <div className="mt-2 mb-28 overflow-y-auto">
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Plants" element={<Plants plantsData={plantsData} />} />
          <Route
            path="/Plants/:id"
            element={<Info plantsData={plantsData} />}
          />
          <Route path="/FeedBack" element={<FeedBack />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="fixed bottom-0 z-50 w-full inset-x-0">
        <div className="max-w-4xl mx-auto px-6">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
