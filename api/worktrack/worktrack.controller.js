const ExcelJs = require('exceljs');
const { isEmpty } = require('lodash');
const worktrackService = require('./worktrack.service');
const userService = require('../user/user.service');
const ApiError = require('../../utils/ApiError');
const { calcCurrentKPIOfWorkTrack } = require('../../utils/function');

const getAll = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        if (req.user.role === 'admin') {
            const workTracks = await worktrackService.getWorkTrackByAdmin(startDate, endDate);
            return res.status(200).json({ message: 'Success!', data: isEmpty(workTracks) ? [] : workTracks });
        }
        if (req.user.role === 'manager') {
            const workTracks = await worktrackService.getWorkTrackByManager(req.user.id, startDate, endDate);
            return res.status(200).json({ message: 'Success!', data: workTracks });
        }
        if (req.user.role === 'user') {
            const workTracks = await worktrackService.getAllResourceByUserId(req.user.id, startDate, endDate);
            if (!workTracks) {
                throw new ApiError(404, 'Not Found');
            }
            const check = workTracks.dataValues?.workTracks;
            for (let i = 0; i < check.length; i++) {
                const checkCreated = check[i].dataValues?.workTrackUsers?.dataValues?.isCreated;
                if (!(checkCreated === true)) {
                    check.splice(i, 1);
                }
            }
            return res.status(200).json({ message: 'Success!', data: workTracks });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.getResourceById(id);
        if (!worktrack) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error });
    }
};

const getWorkTrackOfMe = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const getWorkTrackMe = await worktrackService.getAllResourceByUserId(req.user.id, startDate, endDate);
        // const check = getWorkTrackMe.dataValues?.workTracks;
        // for (let i = 0; i < check.length; i++) {
        //     const checkResponsible = check[i].dataValues?.workTrackUsers?.dataValues?.isResponsible;
        //     if (!(checkResponsible === true)) {
        //         check.splice(i, 1);
        //     }
        // }
        return res.status(200).json({ message: 'Success!', data: getWorkTrackMe });
    } catch (error) {
        return error;
    }
};

const getAllByUserId = async (req, res) => {
    const { user_id } = req.params;
    const { startDate, endDate } = req.query;
    try {
        const worktracks = await worktrackService.getAllResourceByUserId(user_id, startDate, endDate);
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error: error.message });
    }
};

const getByKpiNornAndUserId = async (req, res) => {
    const { kpiNorm_id, user_id } = req.params;
    try {
        const worktracks = await worktrackService.findWorkTrackByKpiNormAndUser(kpiNorm_id, user_id);
        if (!worktracks) {
            throw new ApiError(404, 'Not Found');
        }
        return res.status(200).json({ message: 'Success!', data: worktracks });
    } catch (error) {
        return res.status(404).json({ message: 'Not Found!', error: error.message });
    }
};

const addWorkTrack = async (req, res) => {
    try {
        const { user_id } = req.body;
        const findUser = await userService.findUser(user_id);
        const workTrack = await worktrackService.createResource(req.body);
        const userCreate = await worktrackService.findUser(req.user.id);
        if (findUser) {
            const addUser = await workTrack.addUser(findUser, { through: { isResponsible: true } });
            const addUserCreate = await workTrack.addUser(userCreate, { through: { isCreated: true } });
            if (!addUser || !addUserCreate) {
                throw new ApiError(400, 'Bad Request');
            }
        }
        // keys
        // if (req.body.keys && !isEmpty(req.body.keys)) {
        //     const { keys } = req.body;
        //     keys.forEach(async (key) => {
        //         const addKey = await workTrack.addKey(key.id, { through: { quantity: key.quantity } });
        //         if (!addKey) {
        //             throw new ApiError(400, 'Bad Request');
        //         }
        //     });
        // }
        return res.status(200).json({ message: 'Create Success!', data: workTrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const updateWorkTrackById = async (req, res) => {
    const { id } = req.params;
    try {
        const getWorkTrackById = await worktrackService.getResourceById(id);
        await worktrackService.updateResourceById(id, req.body);
        const findUser = await worktrackService.findUser(req.body.user_id);
        if (findUser) {
            await worktrackService.deleteWorkTrackUser(getWorkTrackById.users[0]?.id, id);
            await getWorkTrackById.addUser(findUser, { through: { isResponsible: true } });
        }
        const newWorkTrack = await worktrackService.getResourceById(id);
        return res.status(200).json({ message: 'Update Success!', data: newWorkTrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const updateStatusWorkTrackById = async (req, res) => {
    const { id } = req.params;
    try {
        await worktrackService.updateStatusWorktrack(id, req.body.status);
        const newWorkTrack = await worktrackService.getResourceById(id);
        return res.status(200).json({ message: 'Update Success!', data: newWorkTrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        const worktrack = await worktrackService.deleteResourceById(id);
        return res.status(200).json({ message: 'Delete Success!', data: worktrack });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

const getWorkTrackByStatus = async (req, res) => {
    const { status } = req.query;
    try {
        if (req.user.role === 'admin') {
            const workTrack = await worktrackService.getWorkTrackByStatus(status);
            return res.status(200).json({ message: 'Success!', data: workTrack });
        }

        if (req.user.role === 'manager') {
            const workTrack = await worktrackService.getWorkTrackByDepartment(status, req.user.department_id);
            return res.status(200).json({ message: 'Success!', data: workTrack });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const reportWorktrack = async (req, res) => {
    const { startDate, endDate, workTrackId } = req.query;
    try {
        // if (req.user.role === 'admin') {
        //     const workTrack = await worktrackService.getWorkTrackByStatus(status);
        //     return res.status(200).json({ message: 'Success!', data: workTrack });
        // }

        // if (req.user.role === 'manager') {
        //     const workTrack = await worktrackService.getWorkTrackByDepartment(status, req.user.department_id);
        //     return res.status(200).json({ message: 'Success!', data: workTrack });
        // }

        if (req.user.role === 'user') {
            const workTrack = await worktrackService.reportWorktrackUser(workTrackId, startDate, endDate);
            return res.status(200).json({ message: 'Success!', data: workTrack });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const reportWorktrackAll = async (req, res) => {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;
    try {
        // if (req.user.role === 'admin') {
        //     const workTrack = await worktrackService.getWorkTrackByStatus(status);
        //     return res.status(200).json({ message: 'Success!', data: workTrack });
        // }

        // if (req.user.role === 'manager') {
        //     const workTrack = await worktrackService.getWorkTrackByDepartment(status, req.user.department_id);
        //     return res.status(200).json({ message: 'Success!', data: workTrack });
        // }

        if (req.user.role === 'user') {
            const workTrack = await worktrackService.reportAllWorktrackUser(userId, startDate, endDate);
            return res.status(200).json({ message: 'Success!', data: workTrack });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error!', error: error.message });
    }
};

const exportExcel = async (req, res) => {
    const { startDate, endDate, user_id } = req.query;
    const userId = user_id || req.user.id;
    // const dayList = days();
    try {
        const worktracks = await worktrackService.getAllResourceByUserId(userId, startDate, endDate);
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('Thông tin công việc');
        const worksheetLog = workbook.addWorksheet('Báo cáo công việc');
        // const monthsArray = dayList.map((str) => (
        //     { header: str, key: str, width: 5 }
        // ));

        // worksheet thông tin
        worksheet.columns = [
            { header: 'STT', key: 'stt', width: 5 },
            { header: 'Tên nhiệm vụ', key: 'name', width: 50 },
            { header: 'Số lượng', key: 'quantity', width: 10 },
            { header: 'Tổng điểm KPI', key: 'kpi_value', width: 15 },
        ];

        const workLogs = [];
        worktracks.workTracks.forEach((item) => {
            workLogs.push(...item.workTrackLogs);
        });

        const workTrackList = worktracks.workTracks?.sort((a, b) => a.id - b.id)?.filter((item) => item?.workTrackUsers?.isResponsible === true)?.map((item) => ({
            ...item,
            name: item.name ? item.name : item.kpiNorm.name,
            quantity: item.quantity,
            kpi_value: calcCurrentKPIOfWorkTrack(item),
        }));

        let count = 1;
        workTrackList.forEach((e) => {
            e.stt = count;
            worksheet.addRow(e);
            count += 1;
        });

        // worksheet log

        worksheetLog.columns = [
            { header: 'STT', key: 'stt', width: 5 },
            { header: 'Tên nhiệm vụ', key: 'name', width: 50 },
            { header: 'Số lượng', key: 'quantity', width: 10 },
            { header: 'Gi chú', key: 'note', width: 15 },
        ];

        workLogs?.sort((a, b) => a.workTrack_id - b.workTrack_id)?.map((item) => ({
            name: item.workTrack.name,
            quantity: item.quantity,
            note: item.note,
        })).forEach((e, index) => {
            e.stt = index + 1;
            worksheetLog.addRow(e);
        });

        await workbook.xlsx.writeFile('Báo cáo nhiệm vụ tháng.xlsx');
        res.download('Báo cáo nhiệm vụ tháng.xlsx');
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

module.exports = {
    getWorkTrackByStatus,
    getAll,
    getById,
    getAllByUserId,
    addWorkTrack,
    updateWorkTrackById,
    updateStatusWorkTrackById,
    deleteById,
    getWorkTrackOfMe,
    getByKpiNornAndUserId,
    reportWorktrack,
    reportWorktrackAll,
    exportExcel,
};
