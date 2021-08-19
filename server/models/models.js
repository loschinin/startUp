const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
});

const Person = sequelize.define("person", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
  momId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  dadId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

User.hasMany(Person);
Person.belongsTo(User);

module.exports = {
  User,
  Person,
};
