const express = require('express');
const { addToCart, getCart } = require('../services/cartService');
const router = express.Router();

router.post('/add', async (req, res) => {
  try {
    await addToCart(req.body);
    const cart = await getCart();
    res.json({ cart });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  const cart = await getCart();
  res.json({ cart });
});

module.exports = router;