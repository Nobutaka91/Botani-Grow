import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Top } from './pages/Top';
import { Plants } from './pages/Plants';
import { History } from './pages/History';
import { NotFound } from './pages/NotFound';
// import { Login } from './components/Login';
import { Setup } from './pages/Setup';
import { Navbar } from './views/organisms/Navbar';

import { useEffect, useState } from 'react';
import { Footer } from './views/organisms/Footer';
import { Login } from './pages/Login';
import { Reset } from './pages/Reset';

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
  const location = useLocation(); // 現在のページのパスを取得
  const isTopPage = location.pathname === '/';

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
      {!isTopPage && (
        <div className="z-50 ">
          <Navbar plantsData={plantsData} />
        </div>
      )}
      <div className="mt-2 mb-80 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/login" element={<Login />} />
          <Route path="/plants" element={<Plants plantsData={plantsData} />} />
          <Route
            path="/plants/:id"
            element={<Setup plantsData={plantsData} />}
          />
          <Route path="/History" element={<History />} />
          <Route path="/Reset" element={<Reset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isTopPage && (
        <div className="bottom-0 z-50 w-full inset-x-0">
          <div className="max-w-4xl mx-auto px-6 bottom-0">
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
