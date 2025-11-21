const express = require('express');
const { createDiscountCode } = require('../services/discountService');
const { getStats } = require('../services/orderService');
const router = express.Router();

router.post('/generate-code', async (req, res) => {
  const code = await createDiscountCode();
  res.json({ code: code.code });
});

router.get('/stats', async (req, res) => {
  const stats = await getStats();
  res.json(stats);
});

module.exports = router;