// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import HomeComponent from './components/HomeComponent';
import Daftarproduk from './pages/Daftarproduk';

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/produk" element={<Daftarproduk />} />
      </Routes>
    </Router>
  );
}
export default App;