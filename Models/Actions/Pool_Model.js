import Pool from '../CreateTable/Pool_Create.js';

class Pools {
  async getAllPools() {
    try {
        const result = await Pool.findAll();
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch pools');
    }
}

   async sendPool(value) {
    try {
      const pool = await Pool.create(value);
      return pool;
    } catch (error) {
      console.error(error.stack);
      return error;
    }
   }

   async getPoolByUser_id(userid) {
    try {
        const result = await Pool.findAll(({ where: { user_id: userid } }));
        return result;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch pool');
    }
}

async remove(poolId) {
  try {
    const result = await Pool.destroy({
      where: { id: poolId }
    });
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to remove pool');
  }
}

  }
  
  export default new Pools();
  