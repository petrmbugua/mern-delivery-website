import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AddToCart from './../cart/AddToCart';
import { Card, Col, Row } from 'react-bootstrap';

export default function Products(props) {
  return (
    <>
      {props.products.length > 0 ? (
        <Row className='py-3'>
          {props.products.map((product, i) => (
            <Col xs={6} md={4}>
              <Card key={i} className='mb-3'>
                <Link to={'/product/' + product._id}>
                  <Card.Img
                    variant='top'
                    src={'/api/product/image/' + product._id}
                    alt={product.name}
                    style={{ width: '100%', height: '250px' }}
                  />
                </Link>

                <Card.Body>
                  <Card.Title>
                    <Link to={'/product/' + product._id}>{product.name}</Link>
                  </Card.Title>
                  <Card.Text>
                    Kes. {product.price} <AddToCart item={product} />{' '}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        props.searched && <h3>No products found! :(</h3>
      )}
    </>
  );
}
Products.propTypes = {
  products: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired,
};
