$(document).ready(function () {
  loadProducts();
});

function loadProducts() {
  $.ajax({
    url: "/api/products",
    method: "GET",
    success: function (data) {
      updateProductsTable(data);
    },
    error: function (error) {
      console.error("Помилка отримання списку продуктів:", error);
    },
  });
}

function updateProductsTable(products) {
  var tableBody = $("#productsTableBody");
  tableBody.empty();

  products.forEach(function (product) {
    var row =
      "<tr>" +
      "<td>" +
      product.id +
      "</td>" +
      "<td>" +
      product.name +
      "</td>" +
      "<td>" +
      product.description +
      "</td>" +
      "<td>" +
      product.price +
      "</td>" +
      "<td>" +
      '<button onclick="editProduct(' +
      product.id +
      ')">Редагувати</button>' +
      '<button onclick="deleteProduct(' +
      product.id +
      ')">Видалити</button>' +
      "</td>" +
      "</tr>";
    tableBody.append(row);
  });
}

function openCreateProductForm() {
  $("#createProductForm").show();
}

function closeCreateProductForm() {
  $("#createProductForm").hide();
}

function createProduct() {
  var newProduct = {
    name: $("#newProductName").val(),
    description: $("#newProductDescription").val(),
    price: $("#newProductPrice").val(),
  };

  $.ajax({
    url: "/api/createProduct",
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(newProduct),
    success: function (data) {
      loadProducts();
      closeCreateProductForm();
    },
    error: function (error) {
      console.error("Помилка створення продукту:", error);
    },
  });
}

function deleteProduct(productId) {
  $.ajax({
    url: "/api/products/" + productId,
    method: "DELETE",
    success: function (data) {
      loadProducts();
    },
    error: function (error) {
      console.error("Помилка видалення продукту:", error);
    },
  });
}

function openEditProductForm() {
  $("#editProductForm").show();
}

function editProduct(productId) {
  openEditProductForm();
  $.ajax({
    url: "/api/products/" + productId,
    method: "GET",
    success: function (product) {
      $("#editProductId").val(product.id);
      $("#editProductName").val(product.name);
      $("#editProductDescription").val(product.description);
      $("#editProductPrice").val(product.price);
    },
    error: function (error) {
      console.error("Помилка отримання даних продукту для редагування:", error);
    },
  });
}

function saveEditedProduct() {
  var editedProduct = {
    id: $("#editProductId").val(),
    name: $("#editProductName").val(),
    description: $("#editProductDescription").val(),
    price: $("#editProductPrice").val(),
  };

  $.ajax({
    url: "/api/products/" + editedProduct.id,
    method: "PUT",
    contentType: "application/json",
    data: JSON.stringify(editedProduct),
    success: function (data) {
      loadProducts();
      closeEditProductForm();
    },
    error: function (error) {
      console.error("Помилка збереження редагованого продукту:", error);
    },
  });
}

function closeEditProductForm() {
  $("#editProductForm").hide();
}
