// Your code here
function createEmployeeRecord(array){
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array){
    return array.map(innerArray => createEmployeeRecord(innerArray))
}

function createTimeInEvent(employee, dateStamp){
    employee.timeInEvents.push({type: "TimeIn", hour: parseInt(dateStamp.split(" ")[1]), date: dateStamp.split(" ")[0]})
    return employee
}

function createTimeOutEvent(employee, dateStamp){
    employee.timeOutEvents.push({type: "TimeOut", hour: parseInt(dateStamp.split(" ")[1]), date: dateStamp.split(" ")[0]})
    return employee
}

function hoursWorkedOnDate(employee, date){
    const timeIns = employee.timeInEvents.filter(timeInEvent => timeInEvent.date === date)
    const timeOuts = employee.timeOutEvents.filter(timeOutEvent => timeOutEvent.date === date)
    let totalHours = 0
    timeOuts.forEach((timeOut, index) => totalHours += timeOut.hour/100 - timeIns[index].hour/100) 
    return totalHours
}

function wagesEarnedOnDate(employee, date){
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(timeIn => timeIn.date)
    let total = 0
    dates.forEach((date) => total += wagesEarnedOnDate(employee, date))
    return total
}

function findEmployeeByFirstName(employees, name){
    return employees.find(employee => employee.firstName === name)
}

function calculatePayroll(employees){
    let total = 0
    employees.forEach(employee => total += allWagesFor(employee))
    return total
}

