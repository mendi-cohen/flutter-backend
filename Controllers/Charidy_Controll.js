import Charidy_M from '../Models/Actions/Charidy_Model.js';

class charidysControll{
    async AllCharidys (req, res){
        try {
          const CharidyFdb  = await Charidy_M.getAllCharidys() 
          res.json({CharidyFdb})
  
        } catch (error) {
          console.log(error.message);
        }
      }
      
      async saveValue(req, res) {
        try {
            await Charidy_M.sendCharidys(req.body);
            res.json({ "add user": req.body });
        } catch (error) {
            console.error('Error saving user:', error);
            res.status(500).json({ "error": "Internal Server Error" });
        }
    }

    async CharidysByUser(req, res) {
      try {
          const CharidyFdb = await Charidy_M.getCharidysByUser_id(req.params.userid);
          res.json({ CharidyFdb });
      } catch (error) {
          console.error(error.message);
          res.status(500).json({ "error": "Internal Server Error" });
      }
  }


    async MaaserByUser(req, res) {
      try {
          const MaaserFdb = await Charidy_M.getMaasrotByUser_id(req.params.userid);
          res.json({ MaaserFdb });
      } catch (error) {
          console.error(error.message);
          res.status(500).json({ "error": "Internal Server Error" });
      }
  }

    async OnlyCharidysByUser(req, res) {
      try {
          const OnlyCharidy = await Charidy_M.getOnlyCharidyByUser_id(req.params.userid);
          res.json({ OnlyCharidy });
      } catch (error) {
          console.error(error.message);
          res.status(500).json({ "error": "Internal Server Error" });
      }
  }

  async remove(req, res) {
    try {
        const charidyId = req.params.charidyId;
        await Charidy_M.remove(charidyId);
        res.json({ "message": "Charidy removed successfully" });
    } catch (error) {
        console.error('Error removing Charidy:', error);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}

async AllCharidysByUser_id(req, res) {
    try {
        const AllCharidy = await Charidy_M.getAllCharidysByUser_id(req.params.userid);
        res.json({ AllCharidy });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}





async AllConstCharidysByUser_id(req, res) {
    try {
        const AllConstCharidy = await Charidy_M.getConstCharidyByUserId(req.params.userid);
        res.json({ AllConstCharidy });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "error": "Internal Server Error" });
    }
}

}

export default new charidysControll();