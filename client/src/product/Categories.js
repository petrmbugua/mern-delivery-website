import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Icon from '@material-ui/core/Icon';
import { list } from './api-product.js';
import Products from './Products';
import { Jumbotron, Container, Nav } from 'react-bootstrap';

export default function Categories(props) {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(props.categories[0]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list({
      category: props.categories[0],
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const listbyCategory = (category) => (event) => {
    setSelected(category);
    list({
      category: category,
    }).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  return (
    <Container className='py-5'>
      <Jumbotron>
        <h1 className='text-center display-4'>Welcome To Delivery App</h1>
        <p className='lead text-center'>
          Create Order By Selecting the below Categories
        </p>
      </Jumbotron>

      <h2 className='display-5'>Select Category</h2>

      <Nav>
        {props.categories.map((tile, i) => (
          <Nav.Item
            key={i}
            style={{
              backgroundColor:
                selected == tile
                  ? 'rgba(95, 139, 137, 0.56)'
                  : 'rgba(95, 124, 139, 0.32)',
            }}
          >
            <Nav.Link onClick={listbyCategory(tile)}>
              {tile} <Icon>{selected == tile && 'arrow_drop_down'}</Icon>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Products products={products} searched={false} />
    </Container>
  );
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
};
