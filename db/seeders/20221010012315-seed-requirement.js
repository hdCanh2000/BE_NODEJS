'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('requirements', [
      {
        id: 1,
        name: 'Thông thạo Excel',
        description: 'Thông thạo Excel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Thông thạo Word',
        description: 'Thông thạo Word',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('requirements', null, {});
  },
};
