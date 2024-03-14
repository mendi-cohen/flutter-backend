import { DataTypes } from 'sequelize';
import sequelize from "../../Config/DB.js";
import User from './Users_Create.js';

const Pool = sequelize.define('Pool', {
  pool_value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monstli: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

Pool.belongsTo(User, { foreignKey: 'user_id' });

export default Pool