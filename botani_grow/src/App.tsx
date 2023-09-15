import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Plants } from './components/Plants';
import { FeedBack } from './components/FeedBack';
import { NotFound } from './components/NotFound';
import { Login } from './components/Login';
import { Info } from './components/Info';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <div className="max-w-4xl mx-auto px-6">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Plants" element={<Plants />} />
        <Route path="/Plants/:id" element={<Info />} />
        <Route path="/FeedBack" element={<FeedBack />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
