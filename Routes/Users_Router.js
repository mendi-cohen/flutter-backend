import express from 'express';
import SaveUser from '../Controllers/Users_Controll.js';
const router = express.Router();

router.post("/saveUser", SaveUser.saveUser);

export default router;