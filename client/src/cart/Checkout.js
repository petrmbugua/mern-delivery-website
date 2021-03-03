import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import auth from './../auth/auth-helper';
import cart from './cart-helper.js';
import PlaceOrder from './PlaceOrder';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: '24px 0px',
    padding: '16px 40px 90px 40px',
    backgroundColor: '#80808017',
  },
  title: {
    margin: '24px 16px 8px 0px',
    color: theme.palette.openTitle,
  },
  subheading: {
    color: 'rgba(88, 114, 128, 0.87)',
    marginTop: '20px',
  },
  addressField: {
    marginTop: '4px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '45%',
  },
  streetField: {
    marginTop: '4px',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '93%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '90%',
  },
}));

export default function Checkout() {
  const classes = useStyles();
  const user = auth.isAuthenticated().user;
  const [values, setValues] = useState({
    checkoutDetails: {
      products: cart.getCart(),
      customer_name: user.name,
      customer_email: user.email,
      pickup_address: {
        pickup_name: '',
        pickup_phone: '',
        location: '',
        city: '',
      },
      delivery_address: {
        customer_phone: '',
        location: '',
        city: '',
      },
    },
    error: '',
  });

  const handleCustomerChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };

  const handleAddressChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails.delivery_address[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };

  const handlePickupChange = (name) => (event) => {
    let checkoutDetails = values.checkoutDetails;
    checkoutDetails.pickup_address[name] = event.target.value || undefined;
    setValues({ ...values, checkoutDetails: checkoutDetails });
  };

  return (
    <Card className={classes.card}>
      <Typography type='title' className={classes.title}>
        Checkout
      </Typography>
      <TextField
        id='name'
        label='Your Name'
        className={classes.textField}
        value={values.checkoutDetails.customer_name}
        onChange={handleCustomerChange('customer_name')}
        margin='normal'
      />
      <br />
      <TextField
        id='email'
        type='email'
        label='Your Email'
        className={classes.textField}
        value={values.checkoutDetails.customer_email}
        onChange={handleCustomerChange('customer_email')}
        margin='normal'
      />
      <br />
      <TextField
        id='phone'
        label='Your Phone Number'
        className={classes.textField}
        value={values.checkoutDetails.delivery_address.customer_phone}
        onChange={handleAddressChange('customer_phone')}
        margin='normal'
      />
      <br />
      <br />
      <Typography
        type='subheading'
        component='h3'
        className={classes.subheading}
      >
        Pickup Address
      </Typography>

      <TextField
        id='pickup_name'
        label='Pickup Contact Name'
        className={classes.streetField}
        value={values.checkoutDetails.pickup_address.pickup_name}
        onChange={handlePickupChange('pickup_name')}
        margin='normal'
      />
      <br />

      <TextField
        id='pickup_phone'
        label='Pickup Contact Phone Number'
        className={classes.streetField}
        value={values.checkoutDetails.pickup_address.pickup_phone}
        onChange={handlePickupChange('pickup_phone')}
        margin='normal'
      />
      <br />

      <TextField
        id='location'
        label='Pickup Location'
        className={classes.streetField}
        value={values.checkoutDetails.pickup_address.location}
        onChange={handlePickupChange('location')}
        margin='normal'
      />
      <br />

      <TextField
        id='city'
        label='City'
        className={classes.streetField}
        value={values.checkoutDetails.pickup_address.city}
        onChange={handlePickupChange('city')}
        margin='normal'
      />
      <br />

      <Typography
        type='subheading' 
        component='h3'
        className={classes.subheading}
      >
        Delivery Address
      </Typography>
      <TextField
        id='location'
        label='Your Location'
        className={classes.streetField}
        value={values.checkoutDetails.delivery_address.location}
        onChange={handleAddressChange('location')}
        margin='normal'
      />
      <br />
      <TextField
        id='city'
        label='City'
        className={classes.streetField}
        value={values.checkoutDetails.delivery_address.city}
        onChange={handleAddressChange('city')}
        margin='normal'
      />
      <br />

      {values.error && (
        <Typography component='p' color='error'>
          <Icon color='error' className={classes.error}>
            error
          </Icon>
          {values.error}
        </Typography>
      )}
      <div>
        <>
          <PlaceOrder checkoutDetails={values.checkoutDetails} />
        </>
      </div>
    </Card>
  );
}
