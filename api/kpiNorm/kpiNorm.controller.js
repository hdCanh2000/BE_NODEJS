const ExcelJs = require('exceljs');
const kpiNormService = require('./kpiNorm.service');
const model = require('../../models/index');

exports.addKpiNorm = async (req, res) => {
    try {
        const kpiNorm = await kpiNormService.createKpiNorm(req.body);
        return res.status(200).json({ message: 'Create KpiNorm Success!', data: kpiNorm });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.updateKpiNorm = async (req, res) => {
    const { id } = req.params;
    try {
        const updateItem = await kpiNormService.updateKpiNormById(id, req.body);
        if (updateItem) {
            const result = await kpiNormService.detailKpiNorm(id);
            return res.status(200).json({ message: 'Update KpiNorm Success!', data: result });
        }
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getAllKpiNorm = async (req, res) => {
    try {
        if (req.user.role === 'admin') {
            const result = await kpiNormService.allKpiNorm({ userId: req.user.id, query: req.query });
            return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
        }
        if (req.user.role === 'manager' || req.user.role === 'user') {
            const result = await kpiNormService.getKpiNormByDepartment(req.user.department_id);
            return res.status(200).json({ message: 'Get All KpiNorm Success!', data: result });
        }
        return res.status(401).json({ message: 'Không có quyền truy cập!' });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.getKpiNormDetail = async (req, res) => {
    const { id } = req.params;
    try {
        const kpiNormDetail = await kpiNormService.detailKpiNorm(id);
        return res.status(200).json({ message: 'Get Detail KpiNorm Success!!', data: kpiNormDetail });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};

exports.deleteKpiNorm = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteKpi = await kpiNormService.deleteById(id);
        return res.status(200).json({ message: 'Success!', data: deleteKpi });
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
exports.exportExcel = async (req, res) => {
    try {
        const kpiNorms = await model.kpiNorms.findAll();
        const position = await model.positions.findAll();
        const showPosition = (id) => {
            const newData = position.filter((item) => item.id === id);
            return newData[0]?.name;
        };
        const showParent = (id) => {
            const newData = position.filter((item) => item.id === id);
            return newData[0]?.name;
        };
        const kpiNorm = kpiNorms.filter((items) => items.dataValues.role !== 'admin').map((item) => (
            {
                name: item.dataValues.name,
                quantity: item.dataValues.quantity,
                taskType: item.dataValues.taskType,
                position: showPosition(item.dataValues.position_id),
                parent: showParent(item.dataValues.parent_id),
                description: item.dataValues.description,
                kpi_value: item.dataValues.kpi_value,
                descriptionKpiValue: item.dataValues.descriptionKpiValue,
            }));
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('kpiNorm');
        worksheet.columns = [
            { header: 'STT', key: 'stt', width: 7 },
            { header: 'Tên nhiệm vụ', key: 'name', width: 70 },
            { header: 'Số lượng', key: 'quantity', width: 10 },
            { header: 'Loại nhiệm vụ', key: 'taskType', width: 25 },
            { header: 'Vị trí đảm nhiệm', key: 'position', width: 25 },
            { header: 'Thuộc nhiệm vụ cha', key: 'parent', width: 25 },
            { header: 'Thang điểm', key: 'kpi_value', width: 15 },
            { header: 'Tương đương với kết quả', key: 'descriptionKpiValue', width: 30 },
            { header: 'Mô tả /Diễn giải', key: 'description', width: 25 },
        ];
        let count = 1;
        kpiNorm.forEach((e) => {
            e.stt = count;
            worksheet.addRow(e);
            count += 1;
        });
        worksheet.getRow(1).eachCell((cell) => {
            // eslint-disable-next-line no-param-reassign
            cell.font = { bold: true, size: 12 };
        });
        await workbook.xlsx.writeFile('Danh sách nhiệm vụ.xlsx');
        res.download('Danh sách nhiệm vụ.xlsx');
    } catch (error) {
        return res.status(404).json({ message: 'Error!', error: error.message });
    }
};
