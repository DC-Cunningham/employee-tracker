const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rootroot",
  database: "employee_trackerDB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  init();
});

function init() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add an employee to the database",
        "Remove an employee from the database",
        "Update an employee's role",
        "Update an employee's manager",
        "Remove a department from the database",
        "View the total utilised budget of a department",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;

        case "View all employees by department":
          viewEmployeesDept();
          break;

        case "View all employees by manager":
          viewEmployeesManager();
          break;

        case "Add an employee to the database":
          addEmployee();
          break;

        case "Remove an employee from the database":
          deleteEmployee();
          break;

        case "Update an employee's role":
          employeeRole();
          break;

        case "Update an employee's manager":
          employeeManager();
          break;

        case "Remove a department from the database":
          deleteDepartment();
          break;

        case "View the total utilised budget of a department":
          budgetSearch();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  connection.query(
    "select first_name, last_name, title, salary from employee RIGHT JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.log(res);
      connection.end();
    }
  );
}
