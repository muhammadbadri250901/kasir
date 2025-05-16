import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import NavbarComponent from './components/NavbarComponent';
import { Col, Container, Row } from 'react-bootstrap';
import ListCategories from './components/ListCategories';
import Hasil from './components/Hasil';
import { API_URL } from "./utils/constans";
import axios from 'axios';
import Menus from './components/Menus';
 
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
    }
  }
  
  componentDidMount() {
    axios
    .get(API_URL+"produk")
    .then(res => {
      const menus = res.data;
      this.setState({menus});
    })
    .catch(error => {
      console.log(error);
    })
    
  }

  render() {
    const {menus} = this.state
    return (
    <div className='App'>
      <NavbarComponent />
      <div className="mt-3">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
            <h4>Daftar Produk</h4>
            <hr/>
            <Row>
              {menus && menus.map((menu) => (
                <Menus 
                key={menu.id}
                menu={menu}
                />
              ))}
            </Row>
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
      </div>
    );
  }
}

export default App;