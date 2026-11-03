const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

router.post('/', protect, async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items specified.' });
    }

    for (const item of orderItems) {
      const dbProduct = await Product.findById(item.product);
      if (!dbProduct || dbProduct.stock < item.qty) {
        return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
      }
      dbProduct.stock -= item.qty;
      await dbProduct.save();
    }

    const order = new Order({
      user: req.user.id,
      orderItems,
      shippingAddress,
      totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: { id: `MOCK_TXN_${Date.now()}`, status: 'COMPLETED' }
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    next(err);
  }
});

router.get('/myorders', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found.' });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
