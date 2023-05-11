window.addEventListener("load", () => {
  const emailInput = document.querySelector("#email-input");
  const passwordInput = document.querySelector("#password-input");
  const form = document.querySelector("#form");
  const sendBoton = document.querySelector("#send-botom");
  const emailWarn = document.querySelector("#email-warning");
  const passWarn = document.querySelector("#password-warning");

  sendBoton.addEventListener("click", (e) => {
    e.preventDefault();
    let errors = {};

    if (emailInput.value.length < 1) {
      errors.email = "Debes ingresar un email";
    } else if (emailInput.value.includes("@" && "." && "com") == false) {
      errors.email = "Debes ingresar un email valido";
    }
    if (passwordInput.value.length < 1) {
      errors.password = "Debes ingresar una contraseña";
    }
    if (Object.keys(errors).length >= 1) {
      passWarn.innerText = (errors.password) ? errors.password : " "
      emailWarn.innerText = (errors.email) ? errors.email : " "
    } else {
      form.submit();
    }
  });
});
