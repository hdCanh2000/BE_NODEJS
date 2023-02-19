'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // drop targets_users table
    await queryInterface.dropTable('TargetsUsers');
    // drop targets_positions table
    await queryInterface.dropTable('TargetsPositions');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // create targets_users table
    await queryInterface.createTable('TargetsUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TargetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Targets',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
    // create targets_positions table
    await queryInterface.createTable('TargetsPositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      TargetId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Targets',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      positionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'positions',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  }
};
