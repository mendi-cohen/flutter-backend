import express from 'express';
import Incomes from '../Controllers/Incomes_Controll.js';
const router = express.Router();

router.get("/getincome", Incomes.AllIncomes);
router.post("/sendincome", Incomes.saveValue);
router.get("/getincomeByuser_id/:userid", Incomes.IncomesByUser);
router.delete("/remove/:incomeId", Incomes.remove);


export default router 