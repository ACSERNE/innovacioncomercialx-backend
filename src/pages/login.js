import { login } from "../services/auth.js";

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    await login(username, password);
    alert("Login correcto");
    window.location.href = "dashboard.html";
  } catch (err) {
    alert("Error: " + err.message);
  }
});
