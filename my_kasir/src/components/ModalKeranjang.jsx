import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constans';
import swal from 'sweetalert';

class ModalKeranjang extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jumlah: props.keranjangDetail.jumlah,
      keterangan: props.keranjangDetail.keterangan || '',
      total_harga: props.keranjangDetail.total_harga
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const harga = this.props.keranjangDetail.produk.harga;
    let jumlah = this.state.jumlah;

    if (name === "jumlah") {
      jumlah = parseInt(value, 10);
      this.setState({
                jumlah,
        total_harga: jumlah * harga
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleSubmit = () => {
    const { keranjangDetail, handleClose } = this.props;
    const { jumlah, total_harga, keterangan } = this.state;

    const data = {
      jumlah,
      total_harga,
      produk: keranjangDetail.produk,
      keterangan
    };

    axios
      .put(`${API_URL}keranjang/${keranjangDetail.id}`, data)
      .then(() => {
        swal("Berhasil", "Keranjang diperbarui", "success");
        handleClose();
      });
  };

  handleDelete = () => {
    const { keranjangDetail, handleClose } = this.props;

    axios
      .delete(`${API_URL}keranjang/${keranjangDetail.id}`)
      .then(() => {
        swal("Dihapus", "Item dihapus dari keranjang", "error");
        handleClose();
      });
  };

  render() {
    const { show, handleClose, keranjangDetail } = this.props;
    const { jumlah, total_harga, keterangan } = this.state;

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Keranjang</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Produk:</Form.Label>
              <Form.Control
                type="text"
                value={keranjangDetail.produk.nama}
                disabled
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Jumlah:</Form.Label>
              <Form.Control
                type="number"
                name="jumlah"
                value={jumlah}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Keterangan:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="keterangan"
                value={keterangan}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Total Harga:</Form.Label>
              <Form.Control type="text" value={`Rp${total_harga}`} disabled />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleDelete}>
            Hapus
          </Button>
          <Button variant="primary" onClick={this.handleSubmit}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalKeranjang;
