const express = require('express');
const { createOrder } = require('../services/orderService');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { discountCode } = req.body;
    const order = await createOrder(discountCode || null);
    res.json({ success: true, order });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;