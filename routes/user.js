const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const User = require('../models/sequelize');

const router = express.Router();

router.get('/', [verifyToken, isAdmin], (req, res) => {
  User.User.findAll().then(users => {
    res.status(200).send(users);
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

router.put('/:id', [verifyToken, isAdmin], (req, res) => {
  const { username, email, role } = req.body;

  User.User.update({ username, email, role }, { where: { id: req.params.id } }).then(() => {
    res.status(200).send({ message: "User updated successfully!" });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

router.delete('/:id', [verifyToken, isAdmin], (req, res) => {
  User.User.destroy({ where: { id: req.params.id } }).then(() => {
    res.status(200).send({ message: "User deleted successfully!" });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

module.exports = router;
