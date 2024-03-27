import express from 'express';
import Pools from '../Controllers/Pool_Controll.js';
const router = express.Router();

router.get("/getpool", Pools.AllPools);
router.post("/sendthepool", Pools.saveValue);
router.get("/getpoolByuser_id/:userid", Pools.PoolsByUser);
router.delete("/remove/:poolsId", Pools.remove);



export default router 