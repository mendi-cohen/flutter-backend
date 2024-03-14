import express from 'express';
import Pools from '../Controllers/Pool_Controll.js';
const router = express.Router();

router.get("/getpool", Pools.AllPools);
router.post("/sendthepool", Pools.saveValue);

export default router 