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
    this.getKeranjang();
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
  };

  getKeranjang = () => {
    axios
      .get(`${API_URL}keranjang`)
      .then((res) => {
        this.setState({ keranjang: res.data });
      })
      .catch((error) => {
        console.log("Gagal ambil keranjang:", error);
      });
  };

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
          const keranjangBaru = {
            jumlah: 1,
            total_harga: value.harga,
            produk: value
          };

          axios
            .post(`${API_URL}keranjang`, keranjangBaru)
            .then(() => {
              this.getKeranjang();
              swal("Sukses!", `${value.nama} ditambahkan ke keranjang`, "success");
            });
        } else {
          const keranjangLama = res.data[0];
          const keranjangUpdate = {
            jumlah: keranjangLama.jumlah + 1,
            total_harga: keranjangLama.total_harga + value.harga,
            produk: value
          };

          axios
            .put(`${API_URL}keranjang/${keranjangLama.id}`, keranjangUpdate)
            .then(() => {
              this.getKeranjang();
              swal("Diperbarui!", `Jumlah ${value.nama} ditambah`, "success");
            });
        }
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
                {menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={this.masukKeranjang}
                  />
                ))}
              </Row>
            </Col>
            <Hasil keranjang={keranjang} getListKeranjang={this.getKeranjang} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Daftarproduk;
