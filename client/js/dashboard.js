requireLogin();
loadNavbar();

async function load() {
  const user = getUser();
  document.getElementById("welcome").textContent = "Hello, " + user.name;
  try {
    const attempts = await apiFetch("/attempts/my");
    const total = attempts.reduce((sum, a) => sum + a.score, 0);
    document.getElementById("stats").textContent =
      `Quizzes taken: ${attempts.length} | Total points: ${total}`;

    document.getElementById("rows").innerHTML = attempts
      .map(a => `<tr>
        <td>${escapeHTML(a.topic)}</td>
        <td>${escapeHTML(a.level)}</td>
        <td>${a.score}/${a.totalQuestions}</td>
        <td>${new Date(a.createdAt).toLocaleDateString()}</td>
      </tr>`).join("");
  } catch (err) {
    document.getElementById("stats").textContent = err.message;
  }
}

load();