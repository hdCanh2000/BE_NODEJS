'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('missionDepartments', [
      {
        mission_id: 1,
        department_id: 9,
        isResponsible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mission_id: 1,
        department_id: 12,
        isResponsible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mission_id: 2,
        department_id: 9,
        isResponsible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mission_id: 2,
        department_id: 12,
        isResponsible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mission_id: 3,
        department_id: 9,
        isResponsible: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        mission_id: 3,
        department_id: 13,
        isResponsible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('missionDepartments', null, {});
  },
};
