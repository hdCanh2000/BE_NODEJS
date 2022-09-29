const moment = require('moment');

module.exports.checkExpiredDate = (date) => {
    const today = moment().add(0, 'days').format('YYYY-MM-DD');
    return new Date(date).getTime() - new Date(today).getTime() > 0;
}