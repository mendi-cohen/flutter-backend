import { DataTypes } from 'sequelize';
import sequelize from "../../Config/DB.js";
import User from '../CreateTable/Users_Create.js';

const Charidy = sequelize.define('Charidy', {
    charidy_value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  maaser_or_charidy: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Charidy.belongsTo(User, { foreignKey: 'user_id' });

export default Charidy