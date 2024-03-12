import Income from '../CreateTable/Incoms_Create.js';

class Incomes {
    async getIncoms() {
      const result = await Income.findAll();
      return result;
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
  