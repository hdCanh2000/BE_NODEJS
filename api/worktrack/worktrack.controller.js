const ExcelJs = require('exceljs');
const { isEmpty } = require('lodash');
const worktrackService = require('./worktrack.service');
const userService = require('../user/user.service');
const ApiError = require('../../utils/ApiError');
const { calcCurrentKPIOfWorkTrack, calcProgressTask, calcTotalKPIOfWorkTrack } = require('../../utils/function');
const kpiNormService = require("../kpiNorm/kpiNorm.service");

const getAll = async (req, res) => {
  const { startDate, endDate, name } = req.query;
  try {
    if (req.user.role === 'admin') {
      const searchQuery = name || ""
      const workTracks = await worktrackService.getWorkTrackByAdmin(startDate, endDate, searchQuery);
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

const exportAllWorkTracks = async (req, res) => {
  const { startDate, endDate, userId } = req.query;
  /* THIS LIST FOR CHECK THE VALUE OF CELL IN EXCEL CORRESPONDING TO THE DAY OF THE MONTH
  * START AT o is the first day of the month
  * END AT 30 is the last day of the month
  */
  const LIST_DAYS = [
    'O', // 1st
    'P', // 2nd
    'Q', // 3rd
    'R', // 4th
    'S', // 5th
    'T', // 6th
    'U', // 7th
    'V', // 8th
    'W', // 9th
    'X', // 10th
    'Y', // 11th
    'Z', // 12th
    'AA', // 13th
    'AB', // 14th
    'AC', // 15th
    'AD', // 16th
    'AE', // 17th
    'AF', // 18th
    'AG', // 19th
    'AH', // 20th
    'AI', // 21st
    'AJ', // 22nd
    'AK', // 23rd
    'AL', // 24th
    'AM', // 25th
    'AN', // 26th
    'AO', // 27th
    'AP', // 28th
    'AQ', // 29th
    'AR', // 30th
    'AS', // 31st
  ]
  try {
    let workTracks = [];
    let listKPINorm = await kpiNormService.allKpiNorm({ userId, query: { page: 1, limit: 9999, text: '' } });
    //output file name
    let fileName = ""
    if (userId) {
      const user = await userService.findUser(userId);
      fileName = `${user.name.replace(" ", "_")}_dwt_${startDate || ""}_${endDate || ""}.xlsx`;
      const data = await worktrackService.getWorkTrackByManager(userId, startDate, endDate);
      workTracks = data.workTracks;
      const userKPINorm = [];
      workTracks.forEach(workTrack => {
        const kpiNorm = listKPINorm.find(kpi => kpi.id === workTrack.kpiNorm_id);
        if (kpiNorm && !userKPINorm.find(kpi => kpi.id === kpiNorm.id)) {
          userKPINorm.push(kpiNorm);
        }
      });
      listKPINorm = userKPINorm;
    } else {
      workTracks = await worktrackService.getWorkTrackByAdmin(startDate, endDate);
      fileName = `all_dwt_${startDate || ""}_${endDate || ""}.xlsx`;
    }
    const workbook = new ExcelJs.Workbook();
    const sample = await workbook.xlsx.readFile('./resources/static/files/sample.xlsx')
    const sheet = sample.getWorksheet('Mẫu xuất báo cáo');

    let count = 1;
    let currentRow = 9;

    for (let i = 0; i < listKPINorm.length; i++) {
      const kpi = listKPINorm[i];
      const name = kpi.name;
      const description = kpi.description || "";
      const manDay = `${kpi.manday || 1} MD`;
      const kpiValue = kpi.kpi_value;
      const qty = kpi.quantity || 1
      const unit = kpi?.unit?.name || '';
      let processNumber = 0;
      // calculate process
      const thisKpiWorkTracks = workTracks.filter(wt => wt.kpiNorm_id === kpi.id);
      for (let j = 0; j < thisKpiWorkTracks.length; j++) {
        const workTrack = thisKpiWorkTracks[j];
        const totalQty = workTrack.quantity || 1;
        let workDone = 0;
        const workTrackLogs = workTrack.workTrackLogs;
        workTrackLogs.forEach(wtl => {
          if (wtl.status === "completed") {
            workDone += wtl.quantity || 1;
          }
        })
        const currentProcess = workDone / totalQty * 100;
        processNumber += currentProcess;
      }
      //end calculate process
      const process = `${processNumber.toFixed(2)} %`;
      const totalKPI = `${(kpi.kpi_value || 1) * qty}`;
      const rowValues = [
        '',
        count,
        name,
        "",
        description,
        manDay,
        kpiValue,
        qty,
        unit,
        process,
        totalKPI
      ];
      // need to keep the first row because these other rows will inherit the style of the first row
      if (i === 0) {
        const row = sheet.getRow(8);
        const counterCell = row.getCell('B');
        counterCell.value = count;
        const nameCell = row.getCell('C');
        nameCell.value = name;
        const descriptionCell = row.getCell('E');
        descriptionCell.value = description;
        const manDayCell = row.getCell('F');
        manDayCell.value = manDay;
        const kpiValueCell = row.getCell('G');
        kpiValueCell.value = kpiValue;
        const qtyCell = row.getCell('H');
        qtyCell.value = qty;
        const unitCell = row.getCell('I');
        unitCell.value = unit;
        const processCell = row.getCell('J');
        processCell.value = process;
        const totalKPICell = row.getCell('K');
        totalKPICell.value = totalKPI;
        count++;
        continue;
      }
      const row = sheet.insertRow(currentRow, rowValues, 'i+');
      // row.getCell(LIST_DAYS[6]).value = 'x';
      const upperRow = sheet.getRow(currentRow - 1);
      row.getCell(1).merge(upperRow.getCell(1))

      count++;
      currentRow++;
    }


    //insert work track
    const ROW_GAP_TO_NEXT_TABLE = 6;
    let workTrackCounter = 1;
    let startInsertWorkTrackRow = currentRow + ROW_GAP_TO_NEXT_TABLE;


    const listWorkTrack = workTracks;
    for (let i = 0; i < listWorkTrack.length; i++) {
      const workTrack = listWorkTrack[i];
      const name = workTrack.kpiNorm.name;
      const description = workTrack.kpiNorm.description || "";
      const workLogs = workTrack.workTrackLogs;
      const totalQuantity = workTrack.quantity || 1;
      //first row just content to make these other row inherit the style of the first row
      if (i === 0) {
        const row = sheet.getRow(startInsertWorkTrackRow - 1);
        const counterCell = row.getCell('B');
        counterCell.value = workTrackCounter;
        const nameCell = row.getCell('C');
        nameCell.value = name;
        const descriptionCell = row.getCell('E');
        descriptionCell.value = description;
        if (!workLogs || workLogs.length === 0) {
          workTrackCounter++;
          continue;
        }
        let currentQuantity = 0;
        for (let j = 0; j < workLogs.length; j++) {
          const workLog = workLogs[j];
          const date = workLog.date;
          const dayOfTheMonth = +date.split('-')[0];
          if (workLog.status === "completed") {
            currentQuantity += workLog.quantity || 1;
          }
          const status = `${currentQuantity}/${totalQuantity}`;
          let fileNames = "";
          if (workLog.files && workLog.files.length > 0) {
            const filesArr = JSON.parse(workLog.files)
            filesArr.forEach((filename) => {
              //IMPORTANT: IF DOMAIN NAME CHANGED => CHANGE THIS
              const host = req.get('host') || "https://dwtapi.doppelherz.vn";
              const staticPath = "uploads";
              fileNames += `https://${host}/${staticPath}/${filename}, `;
            });
          }

          const note = workLog.note;
          if (j === 0) {
            //first work logs insert to current row
            const noteCell = row.getCell('G');
            noteCell.value = note;
            const statusCell = row.getCell('I');
            statusCell.value = status;
            const filesCell = row.getCell('L');
            filesCell.value = fileNames;
            row.getCell(LIST_DAYS[dayOfTheMonth - 1]).value = 'x';
            continue;
          }
          //insert other work logs to new row
          const newRow = sheet.insertRow(startInsertWorkTrackRow, [], 'i+');
          //merge cells
          // merge E and F
          sheet.mergeCells(`E${startInsertWorkTrackRow}:F${startInsertWorkTrackRow}`);
          //merge G and H column
          sheet.mergeCells(`G${startInsertWorkTrackRow}:H${startInsertWorkTrackRow}`);
          //merge I, J adn K column
          sheet.mergeCells(`I${startInsertWorkTrackRow}:K${startInsertWorkTrackRow}`);
          //insert value to new row
          newRow.getCell('G').value = note;
          newRow.getCell('I').value = status;
          newRow.getCell('L').value = fileNames;
          if (workLog.status === "completed") {
            newRow.getCell(LIST_DAYS[dayOfTheMonth - 1]).value = 'x';
          }
          //merge first cell with upper row
          newRow.getCell(1).merge(sheet.getRow(startInsertWorkTrackRow - 1).getCell(1));
          startInsertWorkTrackRow++;
        }
        workTrackCounter++;
        continue;
      }
      // insert to new row
      const newRow = sheet.insertRow(startInsertWorkTrackRow, [], 'i+');
      // // merge E and F column

      sheet.mergeCells(`E${startInsertWorkTrackRow}:F${startInsertWorkTrackRow}`);
      // //merge G and H column
      sheet.mergeCells(`G${startInsertWorkTrackRow}:H${startInsertWorkTrackRow}`);
      // //merge I, J adn K column
      sheet.mergeCells(`I${startInsertWorkTrackRow}:K${startInsertWorkTrackRow}`);


      //insert value to new row
      newRow.getCell('B').value = workTrackCounter;
      newRow.getCell('C').value = name;
      newRow.getCell('E').value = description;

      if (!workLogs || workLogs.length === 0) {
        workTrackCounter++;
        startInsertWorkTrackRow++;
        continue;
      }
      let currentQuantity = 0;
      for (let j = 0; j < workLogs.length; j++) {
        const workLog = workLogs[j];
        const date = workLog.date;
        const dayOfTheMonth = +date.split('-')[0];
        if (workLog.status === "completed") {
          currentQuantity += workLog.quantity || 1;
        }
        const status = `${currentQuantity}/${totalQuantity}`;
        let fileNames = "";
        if (workLog.files && workLog.files.length > 0) {
          const filesArr = JSON.parse(workLog.files)
          filesArr.forEach((filename) => {
            //IMPORTANT: IF DOMAIN NAME CHANGED => CHANGE THIS
            const host = req.get('host') || "https://dwtapi.doppelherz.vn";
            const staticPath = "uploads";
            fileNames += `https://${host}/${staticPath}/${filename}, `;
          });
        }
        const note = workLog.note;
        if (j === 0) {
          //first work logs insert to current row
          const noteCell = newRow.getCell('G');
          noteCell.value = note;
          const statusCell = newRow.getCell('I');
          statusCell.value = status;
          const filesCell = newRow.getCell('L');
          filesCell.value = fileNames;
          if (workLog.status === "completed") {
            newRow.getCell(LIST_DAYS[dayOfTheMonth - 1]).value = 'x';
          }

          startInsertWorkTrackRow++;
          continue;
        }
        //insert other work logs to new row
        const logRow = sheet.insertRow(startInsertWorkTrackRow, [], 'i+');
        //merge cells
        // merge E and F
        sheet.mergeCells(`E${startInsertWorkTrackRow}:F${startInsertWorkTrackRow}`);
        //merge G and H column
        sheet.mergeCells(`G${startInsertWorkTrackRow}:H${startInsertWorkTrackRow}`);
        //merge I, J adn K column
        sheet.mergeCells(`I${startInsertWorkTrackRow}:K${startInsertWorkTrackRow}`);
        //insert value to new row
        logRow.getCell('G').value = note;
        logRow.getCell('I').value = status;
        logRow.getCell('L').value = fileNames;

        //merge first cell with upper row
        logRow.getCell(1).merge(sheet.getRow(startInsertWorkTrackRow - 1).getCell(1));
        logRow.getCell(LIST_DAYS[dayOfTheMonth - 1]).value = 'x';

        startInsertWorkTrackRow++;
      }
      // startInsertWorkTrackRow++;
      workTrackCounter++;
    }

    workbook.clearThemes()
    // sheet.removeConditionalFormatting();
    await workbook.xlsx.writeFile('./resources/static/files/' + fileName)
    return res.json({
      message: 'Success!', data: {
        fileName
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Error!', error: err.message });
  }
}

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
    let findUser;
    if (req.body.users && Array.isArray(req.body.data.users)) {
      findUser = req.body.users[0].id;
    }
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
  exportAllWorkTracks
};
