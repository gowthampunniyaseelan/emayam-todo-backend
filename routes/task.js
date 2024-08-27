const express = require('express');
const { verifyToken, isManager, isAdmin , isManagerOrAdmin} = require('../middleware/auth');
const Task = require('../models/sequelize');

const router = express.Router();


// You can restrict all the task api access based on this middleware  {isManager, isAdmin , isManagerOrAdmin} 
// Who can create?
// Who can delete?
// Who can update?

router.get('/', [verifyToken], (req, res) => {
  Task.Task.findAll().then(tasks => {
    res.status(200).send(tasks);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

router.post('/', [verifyToken, isManagerOrAdmin], (req, res) => {
  const { title, description, assignedTo } = req.body;

  Task.Task.create({
    title,
    description,
    assignedTo
  }).then(task => {
    res.status(201).send(task);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

router.put('/:id', [verifyToken, isManagerOrAdmin], (req, res) => {
  const { title, description, status, assignedTo } = req.body;

  Task.Task.update({ title, description, status, assignedTo }, { where: { id: req.params.id } }).then(() => {
    res.status(200).send({ message: "Task updated successfully!" });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

router.delete('/:id', [verifyToken, isAdmin], (req, res) => {
  Task.Task.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).send({ message: "Task deleted successfully!" });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

module.exports = router;
