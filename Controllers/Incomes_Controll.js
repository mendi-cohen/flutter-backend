import Incom_M from '../Models/Actions/Incomes_Model.js';

class incomesControll{

    async AllIncomes(req, res) {
        try {
            const incomsFdb = await Incom_M.getAllIncoms();
            res.json({ incomsFdb });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ "error": "Internal Server Error" });
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

    async IncomesByUser(req, res) {
        try {
            const incomsFdb = await Incom_M.getIncomsByUser_id(req.params.userid);
            res.json({ incomsFdb });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    async remove(req, res) {
        try {
            const incomeId = req.params.incomeId;
            await Incom_M.remove(incomeId);
            res.json({ "message": "Charidy removed successfully" });
        } catch (error) {
            console.error('Error removing Charidy:', error);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

}

export default new incomesControll();