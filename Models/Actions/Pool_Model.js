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
          [Op.or]: [
            {
              createdAt: {
                [Op.between]: [startOfMonth, endOfMonth]
              }
            },
            {
              monstli: "קבועה"
            }
          ]
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

async getAllPoolByUser_id(userid) {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0); 

    const result = await Pool.findAll({
      where: {
        user_id: userid,
        createdAt: {
          [Op.between]: [startOfYear, lastDayOfPreviousMonth]
        }
      }
    });

    return result;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch pool');
  }
}


async  getConstPoolsByUserId(userid) {
  try {
    const result = await Pool.findAll({
      where: {
        user_id: userid,
        monstli: "קבועה"
      }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch pools');
  }
}


  }
  
  export default new Pools();
  