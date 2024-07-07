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

   async getMontsliCharidyByUser_id(userid) {
    try {
      const today = new Date();
      const currentMonthYear = `${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  
      const result = await Charidy.findAll({
        where: {
          user_id: userid,
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%m/%Y'),
              currentMonthYear
            ),
            { type: "חודשי קבוע" },
            {
              [Op.and]: [
                { type: { [Op.regexp]: '^[0-9]{2}/[0-9]{4}$' } },
                Sequelize.where(
                  Sequelize.col('type'),
                  { [Op.gte]: currentMonthYear }
                )
              ]
            }
          ]
        }
      });
      
      console.log('Query result:', result);
      return result;
    } catch (error) {
      console.error('Error fetching records:', error);
      throw new Error('Failed to fetch records');
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
  