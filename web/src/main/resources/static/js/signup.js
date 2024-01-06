jQuery(function ($) {
  $("#phone").mask("+38(099) 999-9999");
});

const regButton = document.getElementById("reg-submit");
const deleteButton = document.getElementById("delete-selected");
const duplicateButton = document.getElementById("duplicate-selected");

regButton.addEventListener("click", (event) => {
  event.preventDefault();
  registerUser();
});

function registerUser() {
  clearErrorMessages();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const lastName = document.getElementById("last_name").value;
  const firstName = document.getElementById("first_name").value;
  const middleName = document.getElementById("middle_name").value;
  const birthdate = document.getElementById("birthdate").value;
  const group = document.getElementById("group").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phone = document.getElementById("phone").value;

  if (
    !validateForm(
      email,
      password,
      lastName,
      firstName,
      middleName,
      birthdate,
      group,
      gender,
      phone
    )
  ) {
    return;
  }
  const userData = {
    email: email,
    password: password,
    lastName: lastName,
    firstName: firstName,
    middleName: middleName,
    birthdate: birthdate,
    group: group,
    gender: gender,
    phone: phone,
  };

  $.ajax({
    url: "/api/register",
    method: "post",
    data: JSON.stringify(userData),
    processData: false,
    contentType: "application/json",
    success: function (data) {
      if (data && data.id) {
        window.location.href = "/";
      } else {
        alert("Помилка при реєстрації");
      }
    },
    error: function (error) {
      alert(error.responseJSON.message);
    },
  });

  clearForm();
}

function validateForm(
  email,
  password,
  lastName,
  firstName,
  middleName,
  birthdate,
  group,
  gender,
  phone
) {
  const checkingFields = [
    { value: email, name: "email" },
    { value: password, name: "password" },
    { value: lastName, name: "last-name" },
    { value: firstName, name: "first-name" },
    { value: middleName, name: "middle-name" },
    { value: birthdate, name: "birthdate" },
    { value: group, name: "group" },
    { value: gender, name: "gender" },
    { value: phone, name: "phone" },
  ];
  for (let field of checkingFields) {
    if (!field.value.trim()) {
      displayErrorMessage(`${field.name}`, `${field.name} is required`);
      return false;
    }
  }
  return true;
}
function displayErrorMessage(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.style.color = "red";
  errorElement.textContent = message;
}
function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

function clearForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("first_name").value = "";
  document.getElementById("middle_name").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("group").value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.getElementById("phone").value = "";
}
