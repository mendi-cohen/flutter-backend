import Pool from '../CreateTable/Pool_Create.js';
import { Op } from 'sequelize';

class Pools {
  async getAllPools() {
    try {
        const result = await Pool.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch pools');
    }
}

   async sendPool(value) {
    try {
      const pool = await Pool.create(value);
      return pool;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
   }

   async getPoolByUser_id(userid) {
    try {
      const startOfMonth = new Date(new Date().setDate(1)); 
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); 

      const result = await Pool.findAll({
        where: {
          user_id: userid,
          createdAt: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      });

      return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch pool');
    }
}

async remove(poolId) {
  try {
    const result = await Pool.destroy({
      where: { id: poolId }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove pool');
  }
}

  }
  
  export default new Pools();
  