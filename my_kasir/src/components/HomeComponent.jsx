import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function HomeComponent() {
  const navigate = useNavigate(); // Hook untuk navigasi ke halaman lain

  return (
    <div
      style={{
        margin: 0,
        fontFamily: 'Poppins, sans-serif',
        background: 'linear-gradient(135deg, #ff6f61, #ffa07a)',
        color: '#fff',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '1rem',
      }}
    >
      <Container className="d-flex justify-content-center">
        <Card
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '2rem 3rem',
            borderRadius: '15px',
            boxShadow: '0 8px 32px 0 rgba(255, 111, 97, 0.4)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            maxWidth: '500px',
            width: '100%',
            color: '#fff',
          }}
        >
          <Card.Body>
            <Card.Title as="h1" style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '2px' }}>
              Selamat Datang di Kasir Makan & Minuman
            </Card.Title>
            <Card.Text style={{ fontSize: '1.2rem', fontWeight: '500', lineHeight: '1.6', margin: '1.5rem 0' }}>
              Aplikasi kasir yang mudah digunakan untuk restoran, warung makan, dan kedai minuman Anda.
              Mudah kelola pesanan dan pembayaran dengan cepat dan efisien.
            </Card.Text>

            <Button
              variant="light"
              style={{
                color: '#ff6f61',
                fontWeight: '700',
                borderRadius: '50px',
                padding: '0.8rem 2.5rem',
                fontSize: '1.1rem',
                textTransform: 'uppercase',
                boxShadow: '0 4px 8px rgba(255, 111, 97, 0.5)',
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#ff6f61';
                e.target.style.color = '#fff';
                e.target.style.boxShadow = '0 6px 12px rgba(255, 111, 97, 0.8)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '';
                e.target.style.color = '#ff6f61';
                e.target.style.boxShadow = '0 4px 8px rgba(255, 111, 97, 0.5)';
              }}
              onClick={() => navigate('/produk')} // Navigasi ke halaman daftar produk
            >
              Mulai Sekarang
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
