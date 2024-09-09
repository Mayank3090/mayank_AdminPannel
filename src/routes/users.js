const express = require('express');
const { celebrate } = require('celebrate');
const User = require('../models/User');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');
const auditLog = require('../middleware/auditLog');
const schemas = require('../validations/schemas');

const router = express.Router();

// Create a new user (Admin only)
router.post('/', auth, rbac(['Admin']), celebrate(schemas.createUser), auditLog('Create User'), async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all users (Admin only)
router.get('/', auth, rbac(['Admin']), auditLog('Get All Users'), async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a user (Admin only)
router.put('/:id', auth, rbac(['Admin']), celebrate(schemas.updateUser), auditLog('Update User'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Soft delete a user (Admin only)
router.delete('/:id', auth, rbac(['Admin']), auditLog('Delete User'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    await user.update({ deletedAt: new Date() });
    res.send({ message: 'User soft deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/:id/restore', auth, rbac(['Admin']), auditLog('Restore User'), async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id, deletedAt: { [Op.not]: null } } });
    if (!user) {
      return res.status(404).send({ error: 'Deleted user not found' });
    }
    await user.update({ deletedAt: null });
    res.send({ message: 'User restored successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;