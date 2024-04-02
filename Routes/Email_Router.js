import express from 'express';
import Email from '../Controllers/SendEmail_Controll.js';
const router = express.Router();

router.get("/getTheDitails/:userid", Email.sendEmail);



export default router 