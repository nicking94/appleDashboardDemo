document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("password");
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    const icon = this.querySelector("img");
    if (type === "password") {
      icon.src = "assets/vision_open.png";
      icon.alt = "Mostrar contraseña";
    } else {
      icon.src = "assets/vision_close.png";
      icon.alt = "Ocultar contraseña";
      icon.classList.add("h-6", "w-6");
    }
  });

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    let valid = true;

    if (!validateEmail(emailInput.value)) {
      emailError.classList.remove("hidden");
      valid = false;
    } else {
      emailError.classList.add("hidden");
    }

    if (passwordInput.value.length < 6) {
      passwordError.classList.remove("hidden");
      valid = false;
    } else {
      passwordError.classList.add("hidden");
    }

    if (valid) {
      window.location.href = "inicio.html";
    }
  });

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
