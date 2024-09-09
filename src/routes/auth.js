const express = require('express');
const jwt = require('jsonwebtoken');
const { celebrate } = require('celebrate');
const User = require('../models/User');
const auth = require('../middleware/auth');
const schemas = require('../validations/schemas');

const router = express.Router();

router.post('/signup', celebrate(schemas.signup), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password, role: 'Admin' });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', celebrate(schemas.login), async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.validatePassword(password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/logout', auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;