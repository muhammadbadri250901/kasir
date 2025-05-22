import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons'; // Icon pembayaran

function KeranjangBayar({ keranjang }) {
  const navigate = useNavigate();

  const handleBayar = async () => {
    if (keranjang.length === 0) {
      alert("Keranjang kosong, tidak bisa bayar");
      return;
    }

    const pesanan = {
      items: keranjang,
      tanggal: new Date().toISOString()
    };

    try {
      await axios.post(`${API_URL}pesanan`, pesanan);
      await Promise.all(
        keranjang.map(item =>
          axios.delete(`${API_URL}keranjang/${item.id}`)
        )
      );
      navigate('/Sukses');
    } catch (error) {
      console.error('Gagal simpan pesanan:', error);
      alert('Gagal menyimpan pesanan, coba lagi.');
    }
  };

  return (
    <button className="btn btn-primary mt-3" onClick={handleBayar}>
      <FontAwesomeIcon icon={faMoneyBillWave} className="me-2" />
      Bayar Sekarang
    </button>
  );
}

export default KeranjangBayar;
