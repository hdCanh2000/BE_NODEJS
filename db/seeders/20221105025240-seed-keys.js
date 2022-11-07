'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('keys', [
      {
        name: 'Số đơn hàng đã nhận',
        description: 'Số đơn hàng đã nhận',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng từ chối',
        description: 'Số đơn hàng từ chối',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng đổi trả',
        description: 'Số đơn hàng đổi trả',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số TDV hiện có',
        description: 'Số TDV hiện có',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tỉ lệ địa bàn hoàn thành 100% doanh số',
        description: 'Tỉ lệ địa bàn hoàn thành 100% doanh số',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số SKUsactive',
        description: 'Số SKUsactive',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng xuất bán',
        description: 'Số đơn hàng xuát bán',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tỉ lệ đơn đổi trả',
        description: 'Tỉ lệ đơn đổi trả',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '%/tổng số TDV cơ cấu',
        description: '%/tổng số TDV cơ cấu',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tỉ lệ địa bàn hoàn thành dưới 70% doanh số',
        description: 'Tỉ lệ địa bàn hoàn thành dưới 70% doanh số',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '%/tổng số SKUs',
        description: '%/tổng số SKUs',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Doanh số',
        description: 'Doanh số',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng',
        description: 'Số đơn hàng',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số khách hàng mở mới',
        description: 'Số khách hàng mở mới',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số khách hàng active',
        description: 'Số khách hàng active',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số chương trình đã được ban hành',
        description: 'Số chương trình đã được ban hành',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số báo cáo tham mưu, phân tích đã thực hiện',
        description: 'Số báo cáo tham mưu, phân tích đã thực hiện',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '% trưng bày/mở mới',
        description: '% trưng bày/mở mới',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: '%/chỉ tiêu',
        description: '%/chỉ tiêu',
        unit_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số quy định, quy trình đã xây dựng, ban hành',
        description: 'Số quy định, quy trình đã xây dựng, ban hành',
        unit_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('keys', null, {});
  },
};
