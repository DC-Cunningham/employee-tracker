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
  password: "/TF.c2{H)dUgbxv}",
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
        "Exit"
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

        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewEmployees() {
  connection.query(
    'SELECT e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS ROLE, r.salary AS SALARY, CONCAT(f.first_name, " ", f.last_name) AS MANAGER from employee e JOIN employee f ON e.manager_id = f.id JOIN role r ON e.role_id = r.id;',
    function (err, res) {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.table(res);
      init()
    }
  );
}

function viewEmployeesDept() {
  connection.query(
    "select first_name, last_name, title, salary from employee RIGHT JOIN role ON employee.role_id = role.id as ORDER BY department;",
    function (err, res) {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.table(res);
      connection.end();
    }
  );
}

function viewEmployeesManager() {
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

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employees' first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employees' last name?",
      },
      {
        name: "role",
        type: "input",
        message: "What is the employees' role?",
      },
      {
        name: "manager",
        type: "rawlist",
        message: "Who is the employees' manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "SELECT * FROM employee WHERE ?",
        { employee: answer.song },
        function (err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        }
      );
    });
}

function deleteEmployee() {
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

function employeeRole() {
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

function employeeManager() {
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

function deleteDepartment() {
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

function budgetSearch() {
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
