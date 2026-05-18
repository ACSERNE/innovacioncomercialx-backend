import Navbar from "./components/Navbar.js";
import HomePage from "./pages/HomePage.js";

document.getElementById("app").innerHTML = `
  ${Navbar()}
  <main class="container">
    ${HomePage()}
  </main>
`;
