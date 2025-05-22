// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomeComponent from './pages/HomeComponent';
import Daftarproduk from './pages/Daftarproduk';
import Sukses from './pages/Sukses';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/Daftarproduk" element={<Daftarproduk />} />
        <Route path="/Sukses" element={<Sukses />} />
      </Routes>
    </Router>
  );
}
export default App;