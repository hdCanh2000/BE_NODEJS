/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('keys', [
      {
        name: 'Số đơn hàng đã nhận',
        description: 'Số đơn hàng đã nhận',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng từ chối',
        description: 'Số đơn hàng từ chối',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng đổi trả',
        description: 'Số đơn hàng đổi trả',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số TDV hiện có',
        description: 'Số TDV hiện có',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tỉ lệ địa bàn hoàn thành 100% doanh số',
        description: 'Tỉ lệ địa bàn hoàn thành 100% doanh số',
        unit_id: 10,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số SKUsactive',
        description: 'Số SKUsactive',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Doanh số',
        description: 'Doanh số',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số đơn hàng',
        description: 'Số đơn hàng',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số khách hàng mở mới',
        description: 'Số khách hàng mở mới',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số khách hàng active',
        description: 'Số khách hàng active',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số chương trình đã được ban hành',
        description: 'Số chương trình đã được ban hành',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số báo cáo tham mưu, phân tích đã thực hiện',
        description: 'Số báo cáo tham mưu, phân tích đã thực hiện',
        unit_id: 9,
        position_id: 21,
        department_id: 23,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số biển bảng thi công mới',
        description: 'Số biển bảng thi công mới',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số điểm trưng bày mới',
        description: 'Số điểm trưng bày mới',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số buổi Activation',
        description: 'Số buổi Activation',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số lượt cấp phát vật tư trong ngày',
        description: 'Số lượt cấp phát vật tư trong ngày',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số vật tư mới được duyệt sản xuất',
        description: 'Số vật tư mới được duyệt sản xuất',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Số lượt khách hàng được chăm sóc',
        description: 'Số lượt khách hàng được chăm sóc',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chi phí Trade MKT OTC',
        description: 'Chi phí Trade MKT OTC',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chi phí Trade MKT ETC',
        description: 'Chi phí Trade MKT ETC',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chi phí Trade MKT MT',
        description: 'Chi phí Trade MKT MT',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chi phí Trade MKT Online',
        description: 'Chi phí Trade MKT Online',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Doanh thu từ các buổi Activation',
        description: 'Doanh thu từ các buổi Activation',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Tổng chi phí Activation',
        description: 'Tổng chi phí Activation',
        unit_id: 9,
        position_id: 22,
        department_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('keys', null, {});
  },
};
