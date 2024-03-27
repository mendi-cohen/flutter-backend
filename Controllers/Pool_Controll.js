import Pool_M from '../Models/Actions/Pool_Model.js';

class incomesControll{
    async AllPools (req, res){
        try {
          const PoolFdb  = await Pool_M.getAllPools() 
          res.json({PoolFdb})
  
        } catch (error) {
          console.log(error.message);
        }
      }
      
      async saveValue(req, res) {
        try {
            await Pool_M.sendPool(req.body);
            res.json({ "add user": req.body });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    async PoolsByUser(req, res) {
      try {
          const PoolFdb = await Pool_M.getPoolByUser_id(req.params.userid);
          res.json({ PoolFdb });
      } catch (error) {
          console.error(error.message);
          res.status(500).json({ "error": "Internal Server Error" });
      }
  }
  async remove(req, res) {
    try {
        const poolsId = req.params.poolsId;
        await Pool_M.remove(poolsId);
        res.json({ "message": "Charidy removed successfully" });
    } catch (error) {
        console.error('Error removing Charidy:', error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}

}

export default new incomesControll();