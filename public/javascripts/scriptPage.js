document
  .getElementById("showRegisterForm")
  .addEventListener("click", function () {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.add("active");
  });

document.getElementById("showLoginForm").addEventListener("click", function () {
  document.getElementById("registerForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
});
