const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).send({ msg: 'Cart is empty' });
    }

    const total = cart.items.reduce((sum, item) => sum + (item.quantity * 10), 0); // 🔧 remplace 10 par prix réel si besoin

    const order = new Order({
      user: userId,
      products: cart.items,
      total,
    });

    await order.save();
    await Cart.findOneAndDelete({ user: userId });

    res.status(201).send({ msg: 'Order placed', order });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product');
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
