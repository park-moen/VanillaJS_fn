const express = require('express');
const { Product, UserItem } = require('../models');

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

router.get('/userItem', async (req, res, next) => {
  try {
    const items = await UserItem.findAll();
    res.json(items);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/userItem', async (req, res, next) => {
  try {
    await UserItem.create({
      id: req.body.id,
      content: req.body.content,
      img: req.body.img,
      price: req.body.price,
      count: req.body.count,
      checked: req.body.checked,
    });

    res.json({ message: '성공적' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/userItem/:id', async (req, res, next) => {
  console.log(req.params.id);
  try {
    await UserItem.destroy({
      where: { id: req.params.id },
    });

    res.json({
      message: 'Tutorial was deleted successfully!',
    });

    res.json({ message: '성공적' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
