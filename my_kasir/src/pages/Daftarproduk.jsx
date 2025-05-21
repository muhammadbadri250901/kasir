import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ListCategories from '../components/ListCategories';
import Hasil from '../components/Hasil';
import Menus from '../components/Menus';
import { API_URL } from '../utils/constans';
import axios from 'axios';
import swal from 'sweetalert';

class Daftarproduk extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      kategoriyangdipilih: 'Makanan',
      keranjang: []
    };
  }

  componentDidMount() {
    this.getProdukByKategori(this.state.kategoriyangdipilih);
  }

  getProdukByKategori = (kategori) => {
    axios
      .get(`${API_URL}produk?kategori.nama=${kategori}`)
      .then((res) => {
        this.setState({ menus: res.data });
      })
      .catch((error) => {
        console.log("Gagal memilih produk:", error);
      });

    axios
      .get(`${API_URL}keranjang`)
      .then((res) => {
        this.setState({ keranjang: res.data });
      })
      .catch((error) => {
        console.log("error ya!!", error);
      }); 
  };

  componentDidUpdate(prevState){
    if(this.state.keranjang !== prevState.keranjang){
      axios
      .get(`${API_URL}keranjang`)
      .then((res) => {
        this.setState({ keranjang: res.data });
      })
      .catch((error) => {
        console.log("error ya!!", error);
      }); 
    }
  }

  changeKategori = (value) => {
    this.setState({
      kategoriyangdipilih: value,
      menus: []
    });

    this.getProdukByKategori(value);
  };

  masukKeranjang = (value) => {
    axios
      .get(`${API_URL}keranjang?produk.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          // Produk belum ada di keranjang, tambahkan baru
          const keranjangsementara = {
            jumlah: 1,
            total_harga: value.harga,
            produk: value
          };

          axios
            .post(`${API_URL}keranjang`, keranjangsementara)
            .then(() => {
              swal({
                title: "Sukses Masuk Keranjang",
                text: "Produk " + keranjangsementara.produk.nama + " berhasil ditambahkan.",
                icon: "success",
                button: false,
                timer: 1500
              });
            })
            .catch((error) => {
              console.log("Gagal tambah keranjang:", error);
            });

        } else {
          // Produk sudah ada di keranjang, update jumlah dan total_harga
          const keranjangLama = res.data[0];

          const keranjangUpdate = {
            jumlah: keranjangLama.jumlah + 1,
            total_harga: keranjangLama.total_harga + value.harga,
            produk: value
          };

          axios
            .put(`${API_URL}keranjang/${keranjangLama.id}`, keranjangUpdate)
            .then(() => {
              swal({
                title: "Keranjang Diperbarui",
                text: "Jumlah " + keranjangUpdate.produk.nama + " ditambah.",
                icon: "success",
                button: false,
                timer: 1500
              });
            })
            .catch((error) => {
              console.log("Gagal update keranjang:", error);
            });
        }
      })
      .catch((error) => {
        console.log("Gagal cek keranjang:", error);
      });
  };

  render() {
    const { menus, kategoriyangdipilih, keranjang } = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories
              changeKategori={this.changeKategori}
              kategoriyangdipilih={kategoriyangdipilih}
            />
            <Col>
              <h4>Daftar Produk</h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
              </Row>
            </Col>
            <Hasil keranjang={keranjang}/>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Daftarproduk;
