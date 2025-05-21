import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Sukses (){
   
  const navigate = useNavigate();
        return (
          <>
            <div className="mt-4 text-center">
              <img
                src="src/assets/Sukses.png"
                alt="Sukses"
                style={{ width: "150px", marginBottom: "20px" }}
              />
              <h2>Sukses Pesan</h2>
              <p>Terimakasih Sudah Memesan</p>
              <Button
                variant="primary"
                onClick={() => navigate("/Daftarproduk")}
              >
                Kembali
              </Button>
            </div>
          </>
        );
    }


export default Sukses;