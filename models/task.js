module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending"
    },
    assignedTo: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  });
  return Task;
};
