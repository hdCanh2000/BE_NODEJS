const { isEmpty, isArray } = require('lodash');

const calcTotalKPIOfWorkTrack = (worktrack) => {
	const { kpiNorm } = worktrack;
	if (isEmpty(kpiNorm)) return 0;
	return (
		(kpiNorm.kpi_value / (kpiNorm.quantity ? kpiNorm.quantity : 1)) * worktrack.quantity
	).toFixed(2);
};

const calcTotalFromWorkTrackLogs = (workTrackLogs) => {
	if (isEmpty(workTrackLogs) || !isArray(workTrackLogs)) return 0;
	let total = 0;
	workTrackLogs.forEach((workTrackLog) => {
		total += workTrackLog.quantity;
	});
	return total;
};

const calcCurrentKPIOfWorkTrack = (worktrack) => {
	if (isEmpty(worktrack)) return 0;
	const { workTrackLogs } = worktrack;
	if (isEmpty(workTrackLogs) || !isArray(workTrackLogs)) return 0;
	const totalQuantity = calcTotalFromWorkTrackLogs(workTrackLogs);
	const total = calcTotalKPIOfWorkTrack(worktrack);
	return ((totalQuantity / worktrack.quantity) * total).toFixed(2);
};

const columns = () => {
	const date = new Date();
	const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const result = [];
	for (let i = 1; i <= days; i += 1) {
		result.push(`${i >= 10 ? i : `0${i}`}-${date.getMonth() + 1}-${date.getFullYear()}`);
		result.push({
			day: i,
			date: `${i >= 10 ? i : `0${i}`}-${date.getMonth() + 1}-${date.getFullYear()}`,
		});
	}
	return result;
};

const days = () => {
	const date = new Date();
	const dayList = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	const result = [];
	for (let i = 1; i <= dayList; i += 1) {
		result.push(`${i >= 10 ? i : `0${i}`}-${date.getMonth() + 1}-${date.getFullYear()}`);
	}
	return result;
};

module.exports = {
	calcTotalKPIOfWorkTrack,
	calcTotalFromWorkTrackLogs,
	calcCurrentKPIOfWorkTrack,
	columns,
	days,
};
