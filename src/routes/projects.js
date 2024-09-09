const express = require('express');
const { celebrate } = require('celebrate');
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');
const rbac = require('../middleware/rbac');
const auditLog = require('../middleware/auditLog');
const schemas = require('../validations/schemas');

const router = express.Router();

// Create a new project (Admin only)
router.post('/', auth, rbac(['Admin']), celebrate(schemas.createProject), async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      createdBy: req.user.id,
    });
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Other route handlers...

// Assign manager to project
router.post('/:id/assign-manager', auth, rbac(['Admin']), celebrate(schemas.assignManager), auditLog('Assign Manager'), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).send({ error: 'Project not found' });
    }
    const manager = await User.findOne({ where: { id: req.body.managerId, role: 'Manager' } });
    if (!manager) {
      return res.status(404).send({ error: 'Manager not found' });
    }
    await project.update({ managerId: manager.id });
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Assign employee to project
router.post('/:id/assign-employee', auth, rbac(['Admin', 'Manager']), celebrate(schemas.assignEmployee), auditLog('Assign Employee'), async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).send({ error: 'Project not found' });
    }
    if (req.user.role === 'Manager' && project.managerId !== req.user.id) {
      return res.status(403).send({ error: 'Access denied' });
    }
    const employee = await User.findOne({ where: { id: req.body.employeeId, role: 'Employee' } });
    if (!employee) {
      return res.status(404).send({ error: 'Employee not found' });
    }
    await project.addEmployee(employee);
    res.send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
