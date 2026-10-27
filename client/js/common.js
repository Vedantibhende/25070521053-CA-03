const API = "http://localhost:5000/api";

function getToken() { return localStorage.getItem("token"); }
function getUser() { return JSON.parse(localStorage.getItem("user") || "null"); }

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function requireLogin() {
  if (!getToken()) window.location.href = "login.html";
}

async function apiFetch(path, options = {}) {
  const headers = { "Content-Type": "application/json" };
  if (getToken()) headers.Authorization = "Bearer " + getToken();

  const res = await fetch(API + path, { ...options, headers });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

function loadNavbar() {
  const user = getUser();
  document.getElementById("navbar").innerHTML = `
    <nav>
      <h2>🔐 Cyber Awareness Hub</h2>
      <div>
        <a href="index.html">Home</a>
        <a href="quiz.html">Quiz</a>
        <a href="phishing.html">Phishing Sim</a>
        <a href="password.html">Password Check</a>
        <a href="leaderboard.html">Leaderboard</a>
        ${user
          ? `<a href="dashboard.html">Dashboard</a><a href="#" onclick="logout()">Logout (${user.name})</a>`
          : `<a href="login.html">Login</a><a href="register.html">Register</a>`}
      </div>
    </nav>`;
}