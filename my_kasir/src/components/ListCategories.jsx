import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constans";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (nama === "Minuman")
    return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (nama === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kategori: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "kategori")
      .then((res) => {
        this.setState({ kategori: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    const { kategori } = this.state;
    const { changeKategori, kategoriyangdipilih } = this.props;
    return (
      <>
        <Col md={2} mt="2">
          <h4>
            <strong>Daftar Kategori</strong>
          </h4>
          <hr />
          <ListGroup>
            {kategori &&
              kategori.map((kategori) => (
                <ListGroup.Item
                  key={kategori.id}
                  onClick={() => changeKategori(kategori.nama)}
                  style={{
                    backgroundColor:
                      kategoriyangdipilih === kategori.nama ? "#ff6f61" : "",
                    color: kategoriyangdipilih === kategori.nama ? "white" : "",
                    fontWeight:
                      kategoriyangdipilih === kategori.nama ? "bold" : "",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <h5>
                    <Icon nama={kategori.nama} /> {kategori.nama}
                  </h5>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
      </>
    );
  }
}

export default ListCategories;
