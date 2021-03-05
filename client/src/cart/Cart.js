import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CartItems from './CartItems';
import Checkout from './Checkout';
import { Col, Container, Row } from 'react-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
}));

export default function Cart() {
  const classes = useStyles();
  const [checkout, setCheckout] = useState(false);

  const showCheckout = (val) => {
    setCheckout(val);
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={6}>
          <CartItems checkout={checkout} setCheckout={showCheckout} />
        </Col>
        {checkout && (
          <Col xs={12} md={6}>
            <Checkout />
          </Col>
        )}
      </Row>
    </Container>
  );
}
