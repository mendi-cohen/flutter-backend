import Incom_M from '../Models/Actions/Incomes_Model.js';

class incomesControll{
    async AllIncomes (req, res){
        try {
          const [incomsFdb ,_] = await Incom_M.getIncoms() 
          res.json({incomsFdb})
  
        } catch (error) {
          console.log(error.message);
        }
      }
      
      async saveValue(req, res) {
        try {
            await Incom_M.sendIncome(req.body);
            res.json({ "add user": req.body });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

}

export default new incomesControll();