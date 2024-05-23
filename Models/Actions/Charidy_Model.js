import Charidy from '../CreateTable/Charidy_Create.js';
import { Op } from 'sequelize';

class Charidys {
  async getAllCharidys() {
    try {
        const result = await Charidy.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch pools');
    }
}

   async sendCharidys(value) {
    try {
      const pool = await Charidy.create(value);
      return pool;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
   }

   async getCharidysByUser_id(userid) {
    try {
      const startOfMonth = new Date(new Date().setDate(1)); 
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); 

      const result = await Charidy.findAll({
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
        throw new Error('Failed to fetch Charidys');
    }
}


async getMaasrotByUser_id(userid) {
  try {
      const result = await Charidy.findAll({
          where: {
              user_id: userid,
              maaser_or_charidy:'מעשר' 
          }
      });
      return result;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Charidy_or_maaser');
  }
}

async getOnlyCharidyByUser_id(userid) {
  try {
      const result = await Charidy.findAll({
          where: {
              user_id: userid,
              maaser_or_charidy:'צדקה' 
          }
      });
      return result;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Charidy_or_maaser');
  }
}



async remove(charidyId) {
  try {
    const result = await Charidy.destroy({
      where: { id: charidyId }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove Charidy');
  }
}




  }
  
  export default new Charidys();
  