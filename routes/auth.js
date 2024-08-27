const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/sequelize');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  User.User.findOne({ where: { email } }).then((user)=>{
    if(!user){
      User.User.create({
        username,
        email,
        password: hashedPassword,
        role:role
      }).then(user => {
        res.status(201).send(user);
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
    }else{
      res.status(500).send({ message: err.message });
    }
  })
 
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  User.User.findOne({ where: { email } }).then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
});

module.exports = router;
