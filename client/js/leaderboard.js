requireLogin();
loadNavbar();

async function load() {
  const users = await apiFetch("/leaderboard");
  document.getElementById("rows").innerHTML = users
    .map((u, i) =>
      `<tr><td>${i + 1}</td><td>${escapeHTML(u.name)}</td><td>${u.totalScore}</td></tr>`)
    .join("");
}

load();