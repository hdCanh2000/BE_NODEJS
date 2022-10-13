'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('missions', [
      {
        id: 1,
        name: 'Pre-Product Development',
        unit_id: null,
        description: '',
        quantity: null,
        kpiValue: null,
        manday: 7,
        startTime: null,
        endTime: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Sale Enablement',
        unit_id: null,
        description: '',
        quantity: null,
        kpiValue: null,
        manday: 20,
        startTime: null,
        endTime: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Chào bán năng lực nhà máy',
        unit_id: null,
        description: '',
        quantity: null,
        kpiValue: null,
        manday: 20,
        startTime: null,
        endTime: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('missions', null, {});
  },
};
