const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const sequelize = require('sequelize');
const { Sequelize } = require('../../models/index');
const model = require('../../models/index');
const ApiError = require('../../utils/ApiError');

exports.findUser = async (id) => {
    let data;
    const findUser = await model.users.findOne({
        data,
        where: { id },
        include: [model.departments, model.positions],
    });
    return findUser;
};

exports.updateUserById = async (id, data) => {
    const updateUser = await model.users.update(data, { where: { id } });
    return updateUser;
};

exports.changePassword = async (oldPassword, newPassword, newPassword2, id) => {
    const salt = await bcrypt.genSalt();
    const hashNewPassword = await bcrypt.hash(newPassword, salt);
    const findUser = await model.users.findOne({ where: { id } });
    if (findUser) {
        const changePassword = await bcrypt.compare(oldPassword, findUser.password);
        if (changePassword === true) {
            if (findUser.password === newPassword) {
                return ('Same old password');
            } if (newPassword.length < 4) {
                return ('Password must be at least 4 characters !!!');
            } if (newPassword !== newPassword2) {
                return ('Confirm password wrong !');
            }
            await model.users.update({ password: hashNewPassword }, { where: { id } });
            return ('Change Password Success !', changePassword);
        }
        if (changePassword === false) {
            return ('Wrong Current Password !');
        }
    }
};

exports.createUser = async (data) => {
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(data.password, salt);
    const newUser = await model.users.create({
        ...data,
        password: hashPassword,
    });
    return newUser;
};

exports.deleteById = async (id) => {
    const resource = await model.users.findOne({
        where: { id },
    });
    if (!resource) {
        throw new ApiError(404, 'Not Found!');
    }
    await resource.destroy();
    return resource;
};

exports.findAll = async ({ userId, query }) => {
    const { page, limit, text, departmentId, positionId, role } = query;
    let searchValue = '';
    if (text) searchValue = text.toLowerCase();
    const getUserById = await model.users.findOne({ where: { id: userId, isDelete: false } });
    if (getUserById.role === 'admin') {
        const conditions = [{
            [Op.or]: [
                sequelize.where(sequelize.fn('LOWER', sequelize.col('users.name')), 'LIKE', `%${searchValue}%`),
                sequelize.where(sequelize.fn('LOWER', sequelize.col('users.code')), 'LIKE', `%${searchValue}%`),
            ],
        }];
        if (departmentId) { conditions.push({ department_id: departmentId }); }
        if (positionId) { conditions.push({ position_id: positionId }); }
        if (role) { conditions.push({ role }); }
        const total = await model.users.count({
            where: {
                isDelete: false,
                [Op.and]: conditions,
            },
        });
        const data = await model.users.findAll({
            offset: (page - 1) * limit || 0,
            limit,
            order: [
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.positions,
                },
                {
                    model: model.workTracks,
                    include: [
                        {
                            model: model.workTrackLogs,
                        },
                    ],
                },
            ],
            where: {
                isDelete: false,
                [Op.and]: conditions,
            },
        });
        return { data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
    }
    if (getUserById.role === 'manager') {
        const total = await model.users.count({
            where: {
                department_id: getUserById.department_id,
                isDelete: false,
                [Op.or]: [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('users.name')), 'LIKE', `%${searchValue}%`),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('users.code')), 'LIKE', `%${searchValue}%`),
                ],
            },
        });
        const data = await model.users.findAll({
            include: [
                {
                    model: model.departments,
                },
                {
                    model: model.positions,
                },
                {
                    model: model.workTracks,
                    include: [
                        {
                            model: model.workTrackLogs,
                        },
                    ],
                },
            ],
            where: {
                department_id: getUserById.department_id,
                isDelete: false,
                [Op.or]: [
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('users.name')), 'LIKE', `%${searchValue}%`),
                    sequelize.where(sequelize.fn('LOWER', sequelize.col('users.code')), 'LIKE', `%${searchValue}%`),
                ],
            },
        });
        return { data, pagination: { page: parseInt(page), limit: parseInt(limit), totalRows: data.length, total } };
    }
    return null;
};

const sequelize1 = new Sequelize('dwtapp', 'appuser', 'mtDH.2018TH', {
    host: '159.223.93.249',
    dialect: 'postgres',
}) 

exports.getUserByDepartmentId = async (departmentId) => {
    const result = await sequelize1.query(
        `WITH RECURSIVE cte (
            ID,
            parent_id,
            department_id,
            user_id,
            user_name,
            department_name,
            positions_name
        ) AS (
            SELECT
                departments. ID,
                departments.parent_id,
                departments. ID AS department_id,
                users. ID,
                users."name" AS user_name,
                departments."name" AS department_name,
                positions."name" AS position_name
            FROM
                departments
            LEFT JOIN users ON departments. ID = users.department_id
            LEFT JOIN positions ON positions. ID = users.position_id
            WHERE
                departments.parent_id IS NOT NULL
            OR departments.parent_id IS NULL
            UNION ALL
                SELECT
                    departments. ID,
                    departments.parent_id,
                    cte.department_id,
                    users. ID,
                    users."name" AS user_name,
                    departments."name" AS department_name,
                    positions."name" AS position_name
                FROM
                    departments
                JOIN cte ON departments.parent_id = cte. ID
                LEFT JOIN users ON departments. ID = users.department_id
                LEFT JOIN positions ON positions. ID = users.position_id
        ) SELECT DISTINCT
            cte.user_id,
            cte.user_name,
            cte.department_name,
            cte.positions_name,
            users."role"
        FROM
            cte
        JOIN users ON cte.user_id = users. ID
        WHERE
            cte.department_id = :departmentId
        AND user_id IS NOT NULL
        ORDER BY
            user_name ASC`,
        {
            replacements: { departmentId },
            type: sequelize1.QueryTypes.SELECT,
        }
    )
    return { result };
}
