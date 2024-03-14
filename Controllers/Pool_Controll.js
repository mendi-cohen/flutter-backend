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

}

export default new incomesControll();