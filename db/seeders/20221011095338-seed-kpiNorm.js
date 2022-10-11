'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('kpiNorms', [
      {
        name: 'Find potential international suppliers',
        description: '',
        manday: 2,
        unit_id: 1,
        department_id: 9,
        parent_id: null,
        position_id: 10,
        taskType: 'công việc hàng ngày',
        kpi_value: null,
        descriptionKpiValue: null,
        quantity: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Determine main suppliers - Evaluate, compare, determine and provide a list of potential suppliers',
        description: '',
        manday: 2,
        unit_id: 1,
        department_id: 9,
        parent_id: null,
        position_id: 10,
        taskType: 'Thường xuyên',
        kpi_value: null,
        descriptionKpiValue: null,
        quantity: 25,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Contact and negotiate favored suppliers',
        description: '',
        manday: 4,
        unit_id: 1,
        department_id: 9,
        parent_id: null,
        position_id: 10,
        taskType: 'Thường xuyên',
        kpi_value: null,
        descriptionKpiValue: null,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Contact and negotiate favored suppliers',
        description: '',
        manday: 4,
        unit_id: 1,
        department_id: 9,
        parent_id: null,
        position_id: 10,
        taskType: 'Thường xuyên',
        kpi_value: null,
        descriptionKpiValue: null,
        quantity: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('kpiNorms', null, {});
  },
};
