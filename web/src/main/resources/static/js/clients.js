$(document).ready(function () {
  loadClients();
});

function loadClients() {
  $.ajax({
    url: "/api/clients",
    method: "GET",
    success: function (data) {
      updateClientsTable(data);
    },
    error: function (error) {
      console.error("Помилка отримання списку клієнтів:", error);
    },
  });
}

function updateClientsTable(clients) {
  var tableBody = $("#clientsTableBody");
  tableBody.empty();

  clients.forEach(function (client) {
    var row =
      "<tr>" +
      "<td>" +
      client.id +
      "</td>" +
      "<td>" +
      client.name +
      "</td>" +
      "<td>" +
      client.email +
      "</td>" +
      "<td>" +
      '<button onclick="editClient(' +
      client.id +
      ')">Редагувати</button>' +
      '<button onclick="deleteClient(' +
      client.id +
      ')">Видалити</button>' +
      "</td>" +
      "</tr>";
    tableBody.append(row);
  });
}

function openCreateForm() {
  $("#createClientForm").show();
}

function closeCreateForm() {
  $("#createClientForm").hide();
}

function createClient() {
  var newClient = {
    name: $("#newClientName").val(),
    email: $("#newClientEmail").val(),
  };

  $.ajax({
    url: "/api/createClient",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newClient),
    success: function (data) {
      loadClients();
      closeCreateForm();
    },
    error: function (error) {
      console.error("Помилка створення клієнта:", error);
    },
  });
}

function deleteClient(clientId) {
  $.ajax({
    url: "/api/clients/" + clientId,
    method: "DELETE",
    success: function (data) {
      loadClients();
    },
    error: function (error) {
      console.error("Помилка видалення клієнта:", error);
    },
  });
}

function openEditForm() {
  $("#editClientForm").show();
}

function editClient(clientId) {
  openEditForm();
  $.ajax({
    url: "/api/clients/" + clientId,
    method: "GET",
    success: function (client) {
      $("#editClientId").val(client.id);
      $("#editClientName").val(client.name);
      $("#editClientEmail").val(client.email);
    },
    error: function (error) {
      console.error("Помилка отримання даних клієнта для редагування:", error);
    },
  });
}

function saveEditedClient() {
  var editedClient = {
    id: $("#editClientId").val(),
    name: $("#editClientName").val(),
    email: $("#editClientEmail").val(),
  };

  $.ajax({
    url: "/api/clients/" + editedClient.id,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(editedClient),
    success: function (data) {
      loadClients();
      closeEditForm();
    },
    error: function (error) {
      console.error("Помилка збереження редагованого клієнта:", error);
    },
  });
}

function closeEditForm() {
  $("#editClientForm").hide();
}
