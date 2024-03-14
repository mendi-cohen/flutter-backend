import Income from '../CreateTable/Incoms_Create.js';

class Incomes {
     async getIncoms() {
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
  }
  
  export default new Incomes();
  