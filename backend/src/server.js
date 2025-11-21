const express = require('express');
const cors = require('cors');
const cartRoutes = require('./controllers/cartController');
const checkoutRoutes = require('./controllers/checkoutController');
const adminRoutes = require('./controllers/adminController');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: "E-commerce API Running!" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});