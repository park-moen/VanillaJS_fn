const express = require('express');
const { Product } = require('../models');

const router = express.Router();

router.get('/product', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// router.post('/')

module.exports = router;
