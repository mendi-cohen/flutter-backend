import { DataTypes } from 'sequelize';
import sequelize from "../Config/DB.js";

const User = sequelize.define('User', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

class Users{
  async getUsers(){
    const result = await User.findAll();
    return result
  }


  async save(data) {
    try {
      const result = await User.create(data);
      return result;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
  }

  async findByEmail(email) {
    return await User.findOne({
      where: {
        email: email
      }
    });
  }
}

export default new Users();