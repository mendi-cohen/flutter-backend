import Income from '../CreateTable/Incoms_Create.js';
import { Op } from 'sequelize';

class Incomes {
     async getAllIncoms() {
        try {
            const result = await Income.findAll();
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch incomes');
        }
    }
   async sendIncome(value) {
    try {
      const income = await Income.create(value);
      return income;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
   }

   async getIncomsByUser_id(userid) {
    try {
      const startOfMonth = new Date(new Date().setDate(1)); 
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0); 

      const result = await Income.findAll({
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
      throw new Error('Failed to fetch incomes');
    }
  }

async remove(IncomeId) {
  try {
    const result = await Income.destroy({
      where: { id: IncomeId }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove Income');
  }
}




  }
  
  export default new Incomes();
  