import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import OurGifts from './pages/OurGifts';

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/our-gifts" element={<OurGifts />} />
      </Routes>
    </>
  );
}

export default App;