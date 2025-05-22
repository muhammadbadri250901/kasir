import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import ModalKeranjang from './ModalKeranjang';
import KeranjangBayar from './KeranjangBayar';

class Hasil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keranjangDetail: null,
    };
  }

  handleShow = (item) => {
    this.setState({
      showModal: true,
      keranjangDetail: item,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
      keranjangDetail: null,
    });
    this.props.getListKeranjang();
  };

  render() {
    const { keranjang } = this.props;
    const { showModal, keranjangDetail } = this.state;

    return (
      <Col md={3} className="mt-4">
        <h4>Keranjang</h4>
        <hr />
        {keranjang.length !== 0 ? (
          <>
            <ListGroup>
              {keranjang.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  onClick={() => this.handleShow(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <h5>{item.produk.nama}</h5>
                  <p>
                    Harga: <strong>Rp{item.produk.harga}</strong>
                  </p>
                  <p>
                    Jumlah: <strong>{item.jumlah}</strong>
                  </p>
                  <p>
                    Total: <strong>Rp{item.total_harga}</strong>
                  </p>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <KeranjangBayar keranjang={keranjang} />
          </>
        ) : (
          <p>Keranjang kosong</p>
        )}

        {showModal && keranjangDetail && (
          <ModalKeranjang
            show={showModal}
            handleClose={this.handleClose}
            keranjangDetail={keranjangDetail}
          />
        )}
      </Col>
    );
  }
}

export default Hasil;
