import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home/Home';
import Harta from './pages/Harta/Harta';
import Cauta from './pages/Cauta/Cauta';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route path="/acasa" element={<Home />} />
          <Route path="/harta" element={<Harta />} />
          <Route path="/cauta" element={<Cauta />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
