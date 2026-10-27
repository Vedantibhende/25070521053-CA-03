requireLogin();
loadNavbar();

const result = JSON.parse(sessionStorage.getItem("result"));

if (!result) {
  window.location.href = "quiz.html";
} else {
  document.getElementById("score").textContent =
    `Score: ${result.score} / ${result.total}`;

  document.getElementById("details").innerHTML = result.details
    .map((d, i) => `
      <div class="card ${d.isCorrect ? "right" : "wrong"}">
        <p><b>Q${i + 1}. ${escapeHTML(d.questionText)}</b></p>
        <p>Your answer: ${escapeHTML(d.options[d.selected])}</p>
        ${d.isCorrect ? "" : `<p>Correct answer: ${escapeHTML(d.options[d.correctIndex])}</p>`}
        <p><i>${escapeHTML(d.explanation || "")}</i></p>
      </div>`)
    .join("");
}