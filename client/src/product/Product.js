import React, { useState, useEffect } from 'react';
import { read } from './api-product.js';
import AddToCart from './../cart/AddToCart';
import { Container, Media } from 'react-bootstrap';

export default function Product({ match }) {
  const [product, setProduct] = useState({ shop: {} });
  const [error, setError] = useState('');
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    read({ productId: match.params.productId }, signal).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, [match.params.productId]);

  const imageUrl = product._id
    ? `/api/product/image/${product._id}?${new Date().getTime()}`
    : '/api/product/defaultphoto';
  return (
    <Container className='py-5'>
      <Media>
        <img
          width={100}
          height={64}
          className='mr-3'
          src={imageUrl}
          alt={product.name}
        />
        <Media.Body>
          <h5>{product.name}</h5>
          <p className='lead'>{product.description}</p>
          <p className='lead'>Delivery Price Ksh. {product.price}</p>
          <p>
            <AddToCart item={product} />
          </p>
        </Media.Body>
      </Media>
    </Container>
  );
}
