$(document).ready(function () {
  loadSales();
});

function loadSales() {
  $.ajax({
    url: "/api/sales",
    method: "GET",
    success: function (data) {
      updateSalesTable(data);
    },
    error: function (error) {
      console.error("Помилка отримання списку продажів:", error);
    },
  });
}

function updateSalesTable(sales) {
  var tableBody = $("#salesTableBody");
  tableBody.empty();

  sales.forEach(function (sale) {
    var row =
      "<tr>" +
      "<td>" +
      sale.id +
      "</td>" +
      "<td>" +
      sale.productName +
      "</td>" +
      "<td>" +
      sale.quantity +
      "</td>" +
      "<td>" +
      sale.sum +
      "</td>" +
      "<td>" +
      '<button onclick="editSale(' +
      sale.id +
      ')">Редагувати</button>' +
      '<button onclick="deleteSale(' +
      sale.id +
      ')">Видалити</button>' +
      "</td>" +
      "</tr>";
    tableBody.append(row);
  });
}

function openCreateForm() {
  $("#createSaleForm").show();
}

function closeCreateForm() {
  $("#createSaleForm").hide();
}

function createSale() {
  var newSale = {
    productName: $("#newProductName").val(),
    quantity: $("#newQuantity").val(),
    sum: $("#newSum").val(),
  };

  $.ajax({
    url: "/api/createSale",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newSale),
    success: function (data) {
      loadSales();
      closeCreateForm();
    },
    error: function (error) {
      console.error("Помилка створення продажу:", error);
    },
  });
}

function deleteSale(saleId) {
  $.ajax({
    url: "/api/sales/" + saleId,
    method: "DELETE",
    success: function (data) {
      loadSales();
    },
    error: function (error) {
      console.error("Помилка видалення продажу:", error);
    },
  });
}

function openEditForm() {
  $("#editSaleForm").show();
}

function editSale(saleId) {
  openEditForm();
  $.ajax({
    url: "/api/sales/" + saleId,
    method: "GET",
    success: function (sale) {
      $("#editSaleId").val(sale.id);
      $("#editProductName").val(sale.productName);
      $("#editQuantity").val(sale.quantity);
      $("#editSum").val(sale.sum);
    },
    error: function (error) {
      console.error("Помилка отримання даних продажу для редагування:", error);
    },
  });
}

function saveEditedSale() {
  var editedSale = {
    id: $("#editSaleId").val(),
    productName: $("#editProductName").val(),
    quantity: $("#editQuantity").val(),
    sum: $("#editSum").val(),
  };

  $.ajax({
    url: "/api/sales/" + editedSale.id,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(editedSale),
    success: function (data) {
      loadSales();
      closeEditForm();
    },
    error: function (error) {
      console.error("Помилка збереження редагованого продажу:", error);
    },
  });
}

function closeEditForm() {
  $("#editSaleForm").hide();
}
