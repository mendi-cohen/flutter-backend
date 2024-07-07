import express from 'express';
import Charidy from '../Controllers/Charidy_Controll.js';
const router = express.Router();

router.get("/getcharidy", Charidy.AllCharidys);
router.post("/sendthecharidy", Charidy.saveValue);
router.get("/getcharidyByuser_id/:userid", Charidy.MontsliCharidyByUser_id);
router.get("/getMaaserByuser_id/:userid", Charidy.MaaserByUser);
router.get("/getOnlyCharidyByuser_id/:userid", Charidy.OnlyCharidysByUser);
router.get("/getAllCharidyByuserid/:userid", Charidy.AllCharidysByUser_id);
router.get("/getAllConstCharidyByuserid/:userid", Charidy.AllConstCharidysByUser_id);
router.delete("/remove/:charidyId", Charidy.remove);


export default router 