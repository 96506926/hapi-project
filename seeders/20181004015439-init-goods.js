'use strict';

const timestamps={
  created_at:new Date(),
  updated_at:new Date()
}


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('goods',[
    {
      id:1,
      shop_id:1,
      name:'西瓜',
      thumb_url:'watermelon.png',
      ...timestamps
    },
    {
      id:2,
      shop_id:1,
      name:'番茄',
      thumb_url:'tomato.png',
      ...timestamps
    },
    {
      id:3,
      shop_id:1,
      name:'鸡蛋',
      thumb_url:'egg.png',
      ...timestamps
    },
    {
      id:4,
      shop_id:2,
      name:'猪肉',
      thumb_url:'meat.png',
      ...timestamps
    },
    {
      id:5,
      shop_id:2,
      name:'牛肉',
      thumb_url:'beef.png',
      ...timestamps
    },
    {
      id:6,
      shop_id:2,
      name:'鸡肉',
      thumb_url:'chickent.png',
      ...timestamps
    }
   ],{})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    const {Op}=Sequelize;
    return queryInterface.bulkDelete('goods',{
      id:[{[Op.in]:[1,2,3,4,5,6]}]
    },{})
  }
};
