document.addEventListener("DOMContentLoaded", function () {
  const loginButton = document.querySelector('button[name="button_login"]');
  const emailInput = document.querySelector('input[name="email_login"]');
  const passwordInput = document.querySelector('input[name="pass_login"]');

  if (!loginButton || !emailInput || !passwordInput) {
    console.error("One or more elements not found on the page.");
    return;
  }

  loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    loginUser();
  });

  function loginUser() {
    const email = emailInput.value;
    const password = passwordInput.value;

    const data = {
      email: email,
      password: password,
    };

    $.ajax({
      url: "/api/login",
      method: "post",
      data: data,
      success: function (data) {
        if (data.success) {
          window.location.href = "/";
        } else {
          alert(data.message);
        }
      },
      error: function (error) {
        alert(error.responseJSON.message);
      },
    });
  }
});
