const reportService = require('./report.service')

exports.findReport = async (req, res) => {
  try {
    const reports = await reportService.searchReports(req.query)
    return res.status(200).send(reports)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
exports.createReport = async (req, res) => {
  const { file, title, people } = req.body
  if (!file || !title || !people) {
    return res.status(400).send('Missing required fields')
  }
  try {
    const created = await reportService.createReport(req.body)
    return res.status(200).send(created)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
