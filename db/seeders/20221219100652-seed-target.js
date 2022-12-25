'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      'Targets',
      [
        {
          name: 'Sửa màn giao việc',
          description: 'Sửa màn giao việc theo UI mới',
          deadline: '2022-12-20',
          executionPlan: 'Đem bảng work track vào màn giao việc và thêm nút thêm dòng',
          managerId: 1,
          quantity: 1,
          unitId: 2,
          manDay: 1,
          recentManDay: 0,
          managerComment: '',
          status: 'inProgress',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 35,
          positionId: 1,
        },
      ],
      {},
    )
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
}
