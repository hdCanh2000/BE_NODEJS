'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('positionRequirements', [
      {
        position_id: 14,
        requirement_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        position_id: 14,
        requirement_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('positionRequirements', null, {});
  },
};
