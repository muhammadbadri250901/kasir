// pages/DaftarProduk.jsx
import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ListCategories from '../components/ListCategories';
import Hasil from '../components/Hasil';
import Menus from '../components/Menus';
import { API_URL } from '../utils/constans';
import axios from 'axios';

class Daftarproduk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: [],
      kategoriyangdipilih: 'Makanan'
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "produk?kategori.nama=" + this.state.kategoriyangdipilih)
      .then((res) => {
        this.setState({ menus: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeKategori = (value) => {
    this.setState({
        kategoriyangdipilih: value,
        menus:[]
    })
    axios
      .get(API_URL + "produk?kategori.nama=" + value)
      .then((res) => {
        this.setState({ menus: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  render() {
    const { menus, kategoriyangdipilih} = this.state;
    return (
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories  changeKategori={this.changeKategori} kategoriyangdipilih={kategoriyangdipilih}/>
            <Col>
              <h4>Daftar Produk</h4>
              <hr />
              <Row>
                {menus &&
                  menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} />
                  ))}
              </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Daftarproduk;
