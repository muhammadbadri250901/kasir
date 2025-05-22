import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constans';

function Sukses() {
  const navigate = useNavigate();
  const [pesananTerbaru, setPesananTerbaru] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}pesanan`)
      .then(res => {
        const all = res.data;
        const latest = all[all.length - 1]; // Ambil data terakhir (terbaru)
        setPesananTerbaru(latest);
      })
      .catch(err => console.error('Gagal mengambil pesanan:', err));
  }, []);

  const handlePrint = () => {
    if (!pesananTerbaru) return;

    const tanggal = new Date(pesananTerbaru.tanggal).toLocaleString();

    const content = `
      <html>
        <head>
          <title>Struk Pembelian</title>
          <style>
            body {
              font-family: monospace;
              padding: 20px;
            }
            .center {
              text-align: center;
              margin-bottom: 10px;
            }
            .line {
              border-top: 1px dashed #000;
              margin: 10px 0;
            }
            .item {
              margin-bottom: 5px;
            }
            .total {
              margin-top: 10px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="center">
            <h3>Struk Pembelian</h3>
            <p>${tanggal}</p>
          </div>
          <div class="line"></div>
          ${pesananTerbaru.items.map(item => `
            <div class="item">
              ${item.produk.nama} (${item.produk.kategori.nama})<br/>
              ${item.jumlah} x Rp${item.produk.harga.toLocaleString()} = Rp${item.total_harga.toLocaleString()}
            </div>
          `).join('')}
          <div class="line"></div>
          <div class="total">
            Total: Rp${pesananTerbaru.items.reduce((acc, item) => acc + item.total_harga, 0).toLocaleString()}
          </div>
          <div class="center">
            <p>Terima kasih!</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="mt-4 text-center">
      <img
        src="src/assets/Sukses.png"
        alt="Sukses"
        style={{ width: "150px", marginBottom: "20px" }}
      />
      <h2>Sukses Pesan</h2>
      <p>Terima kasih sudah memesan</p>
      <div className="d-flex justify-content-center gap-3 mt-3">
        <Button variant="primary" onClick={() => navigate("/Daftarproduk")}>
          Kembali
        </Button>
        {pesananTerbaru && (
          <Button variant="success" onClick={handlePrint}>
            Cetak Struk
          </Button>
        )}
      </div>
    </div>
  );
}

export default Sukses;
