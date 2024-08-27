require('dotenv').config();
const express = require("express")
const cors = require('cors');
let db = require("./models/sequelize")
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

db.Sequelize.sync().then(() => {
  app.listen(process.env.SERVER_PORT, () => {
    console.log('Server is running on port.' + process.env.SERVER_PORT);
  });
});
