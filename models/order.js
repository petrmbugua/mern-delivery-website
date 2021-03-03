const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
  quantity: Number,
  shop: { type: mongoose.Schema.ObjectId, ref: 'Shop' },
  status: {
    type: String,
    default: 'Not processed',
    enum: ['Not processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
  },
});

const CartItem = mongoose.model('CartItem', CartItemSchema);
const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  customer_name: {
    type: String,
    trim: true,
    required: 'Name is required',
  },
  customer_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required',
  },

  pickup_address: {
    pickup_name: { type: String, trim: true, required: 'Name is required' },
    pickup_phone: { type: Number, required: 'Phone is required' },
    location: { type: String, required: 'Location is required' },
    city: { type: String, required: 'City is required' },
  },
  delivery_address: {
    customer_phone: { type: Number, required: 'Phone is required' },
    location: { type: String, required: 'Location is required' },
    city: { type: String, required: 'City is required' },
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = { Order, CartItem };
