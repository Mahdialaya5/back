const Cart = require('../models/Cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.product == productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart) {
      return res.status(404).send({ msg: 'Cart not found' });
    }

    res.status(200).send(cart);
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).send({ msg: 'Cart cleared' });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};
