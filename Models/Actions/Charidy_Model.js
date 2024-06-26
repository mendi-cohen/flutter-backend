import Charidy from '../CreateTable/Charidy_Create.js';
import { Sequelize, Op } from 'sequelize';

class Charidys {
  async getAllCharidys() {
    try {
        const result = await Charidy.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch sendCharidys');
    }
}

   async sendCharidys(value) {
    try {
      const sendCharidy = await Charidy.create(value);
      return sendCharidy;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
   }

   async getCharidysByUser_id(userid) {
    try {
      const startOfMonth = new Date(new Date().setDate(1));
      const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);
      const today = new Date();
  
      const result = await Charidy.findAll({
        where: {
          user_id: userid,
          [Op.or]: [
            {
              createdAt: {
                [Op.between]: [startOfMonth, endOfMonth]
              }
            },
            {
              type: "חודשי קבוע"
            },
            {
              [Op.and]: [
                {
                  type: {
                    [Op.notIn]: ["חודשי קבוע", "חד פעמי"]
                  }
                },
                Sequelize.where(
                  Sequelize.fn('STR_TO_DATE', Sequelize.col('type'), '%m/%Y'),
                  {
                    [Op.gte]: today
                  }
                )
              ]
            }
          ]
        }
      });
  
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Charidys');
    }
  }
  
  
  

  








async getMaasrotByUser_id(userid) {
  try {
      const result = await Charidy.findAll({
          where: {
              user_id: userid,
              maaser_or_charidy:'מעשר' 
          }
      });
      return result;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Charidy_or_maaser');
  }
}

async getOnlyCharidyByUser_id(userid) {
  try {
      const result = await Charidy.findAll({
          where: {
              user_id: userid,
              maaser_or_charidy:'צדקה' 
          }
      });
      return result;
  } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch Charidy_or_maaser');
  }
}



async remove(charidyId) {
  try {
    const result = await Charidy.destroy({
      where: { id: charidyId }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove Charidy');
  }
}


async getAllCharidysByUser_id(userid) {
  try {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const lastDayOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0); 

    const result = await Charidy.findAll({
      where: {
        user_id: userid,
        createdAt: {
          [Op.between]: [startOfYear, lastDayOfPreviousMonth]
        }
      }
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch Charidys');
  }
}



async  getConstCharidyByUserId(userid) {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear();
    const currentDateString = `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}`;

    const result = await Charidy.findAll({
      where: {
        user_id: userid,
        [Op.or]: [
          { 
            type: "חודשי קבוע" 
          },
          {
            type: {
              [Op.notLike]: '__/__',
            }
          },
          {
            type: { [Op.lt]: currentDateString } 
          }
        ]
      }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch charidy');
  }
}




  }
  
  export default new Charidys();
  