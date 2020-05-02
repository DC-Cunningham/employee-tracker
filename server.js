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
    'SELECT e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS ROLE, department.name AS DEPARTMENT, r.salary AS SALARY, CONCAT(f.first_name, " ", f.last_name) AS MANAGER from employee e LEFT JOIN employee f ON e.manager_id = f.id JOIN role r ON e.role_id = r.id JOIN department ON r.department_id = department.id;',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init()
    }
  );
}

function viewEmployeesDept() {
  connection.query(
    'SELECT e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS ROLE, department.name AS DEPARTMENT, r.salary AS SALARY, CONCAT(f.first_name, " ", f.last_name) AS MANAGER from employee e LEFT JOIN employee f ON e.manager_id = f.id JOIN role r ON e.role_id = r.id JOIN department ON r.department_id = department.id ORDER BY department.name;',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init()
    }
  );
}

function viewEmployeesManager() {
  connection.query(
    'SELECT e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS ROLE, department.name AS DEPARTMENT, r.salary AS SALARY, CONCAT(f.first_name, " ", f.last_name) AS MANAGER from employee e LEFT JOIN employee f ON e.manager_id = f.id JOIN role r ON e.role_id = r.id JOIN department ON r.department_id = department.id ORDER BY f.last_name DESC;',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      init()
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
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,(select id from role where title=?))",
        [answer.firstName, answer.lastName, answer.role],
        function (err, res) {
          if (err) throw err;
          console.log("----------------------------");
          console.log(answer.firstName + " has been added to the database.");
          viewEmployees();
          console.log("----------------------------");
          init();
        }
      );
    });
}

function deleteEmployee() {
  inquirer
    .prompt([
      {
        name: "deleteEmployee",
        type: "input",
        message: "What is the last name of the employees you would like to delete?",
      },
    ])
  .then(function (answer) {
    connection.query(
    "DELETE FROM employee WHERE last_name = ?",
        {
         id : answer.deleteEmployee
        },
        function(err, res) {
          if (err) throw err;
          console.log("----------------------------")
          console.log(res.affectedRows + " has been deleted from the database.");
          console.log("----------------------------")
          init()
    }
  );
})
}

function employeeRole() {
  connection.query(
    "select first_name, last_name, title, salary from employee RIGHT JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;

      // Log all results of the SELECT statement
      console.log(res);
      init()
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
      init()
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
      init()
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
      init()
    }
  );
}

function employeeSearch() {
  inquirer
    .prompt( [{
      name: "firstName",
      type: "input",
      message: "What is the employees' first name?",
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employees' last name?",
    }])
    .then(function(answer) {
      connection.query(
        'SELECT e.id, e.first_name AS FIRST_NAME, e.last_name AS LAST_NAME, r.title AS ROLE from employee e LEFT JOIN employee f ON e.manager_id = f.id JOIN role r ON e.role_id = r.id WHERE e.first_name = ? AND e.last_name = ?;',
         [answer.firstName, answer.lastName],
         function(err, res) {
           if (err) 
           throw err;
           const selectedEmployee = res;
        } 
      )

    });
}

