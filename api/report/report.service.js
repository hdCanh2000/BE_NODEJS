const model = require('../../models/index')

const searchReports = async query => {
  const { userId } = query
  const res = await model.Report.findAll()
  if (userId) {
    return res.filter(item => {
      const peopleString = item.people
      const people = JSON.parse(peopleString)
      return people.includes(Number(userId))
    })
  }
  return res
}

const createReport = async data => {
  const { people, title, file } = data
  const peopleString = JSON.stringify(people)
  const res = await model.Report.create({
    people: peopleString,
    title,
    file,
  })
  return res
}
module.exports = {
  searchReports,
  createReport,
}
