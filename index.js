function createEmployeeRecord(arr) {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  return arr.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, date) {
  employee.timeInEvents.push({
    type: "TimeIn",
    hour: Number(date.slice(-4)),
    date: date.slice(0, 10)
  })
  return employee
}

function createTimeOutEvent(employee, date) {
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: Number(date.slice(-4)),
    date: date.slice(0, 10)
  })
  return employee
}

function hoursWorkedOnDate(employee, date) {
  const timeOut = employee.timeOutEvents.find(e => e.date === date).hour
  const timeIn = employee.timeInEvents.find(e => e.date === date).hour
  return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
  return employee.timeInEvents.map(event => event.date)
    .reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date)
    }, 0)
}

function calculatePayroll(employees) {
  return employees.reduce((total, employee) => {
    return total + allWagesFor(employee)
  }, 0)
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(employee => employee.firstName === firstName)
}
