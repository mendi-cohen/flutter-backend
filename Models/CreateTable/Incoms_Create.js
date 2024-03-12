import { DataTypes } from 'sequelize';
import sequelize from "../../Config/DB.js";
import User from '../CreateTable/Users_Create.js';

const Income = sequelize.define('Income', {
  income_value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monstli: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Income.belongsTo(User, { foreignKey: 'user_id' });

export default Income