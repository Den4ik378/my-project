$(document).ready(function () {
  loadEmployees();
});

function loadEmployees() {
  $.ajax({
    url: "/api/employees",
    method: "GET",
    success: function (data) {
      updateEmployeesTable(data);
    },
    error: function (error) {
      console.error("Помилка отримання списку працівників:", error);
    },
  });
}

function updateEmployeesTable(employees) {
  var tableBody = $("#employeesTableBody");
  tableBody.empty();

  employees.forEach(function (employee) {
    var row =
      "<tr>" +
      "<td>" +
      employee.id +
      "</td>" +
      "<td>" +
      employee.name +
      "</td>" +
      "<td>" +
      employee.position +
      "</td>" +
      "<td>" +
      employee.email +
      "</td>" +
      "<td>" +
      '<button onclick="editEmployee(' +
      employee.id +
      ')">Редагувати</button>' +
      '<button onclick="deleteEmployee(' +
      employee.id +
      ')">Видалити</button>' +
      "</td>" +
      "</tr>";
    tableBody.append(row);
  });
}

function openCreateEmployeeForm() {
  $("#createEmployeeForm").show();
}

function closeCreateEmployeeForm() {
  $("#createEmployeeForm").hide();
}

function createEmployee() {
  var newEmployee = {
    name: $("#newEmployeeName").val(),
    position: $("#newEmployeePosition").val(),
    email: $("#newEmployeeEmail").val(),
  };

  $.ajax({
    url: "/api/createEmployee",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newEmployee),
    success: function (data) {
      loadEmployees();
      closeCreateEmployeeForm();
    },
    error: function (error) {
      console.error("Помилка створення працівника:", error);
    },
  });
}

function deleteEmployee(employeeId) {
  $.ajax({
    url: "/api/employees/" + employeeId,
    method: "DELETE",
    success: function (data) {
      loadEmployees();
    },
    error: function (error) {
      console.error("Помилка видалення працівника:", error);
    },
  });
}

function openEditEmployeeForm() {
  $("#editEmployeeForm").show();
}

function editEmployee(employeeId) {
  openEditEmployeeForm();

  $.ajax({
    url: "/api/employees/" + employeeId,
    method: "GET",
    success: function (employee) {
      $("#editEmployeeId").val(employee.id);
      $("#editEmployeeName").val(employee.name);
      $("#editEmployeePosition").val(employee.position);
      $("#editEmployeeEmail").val(employee.email);
    },
    error: function (error) {
      console.error(
        "Помилка отримання даних працівника для редагування:",
        error
      );
    },
  });
}

function saveEditedEmployee() {
  var editedEmployee = {
    id: $("#editEmployeeId").val(),
    name: $("#editEmployeeName").val(),
    position: $("#editEmployeePosition").val(),
    email: $("#editEmployeeEmail").val(),
  };

  $.ajax({
    url: "/api/employees/" + editedEmployee.id,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(editedEmployee),
    success: function (data) {
      loadEmployees();
      closeEditEmployeeForm();
    },
    error: function (error) {
      console.error("Помилка збереження редагованого працівника:", error);
    },
  });
}

function closeEditEmployeeForm() {
  $("#editEmployeeForm").hide();
}
