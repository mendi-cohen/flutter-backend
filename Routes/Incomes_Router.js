import express from 'express';
import Incomes from '../Controllers/Incomes_Controll.js';
const router = express.Router();

router.get("/getincome", Incomes.AllIncomes);
router.post("/sendincome", Incomes.saveValue);

export default router 