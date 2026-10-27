requireLogin();
loadNavbar();

let questions = [];
let current = 0;
let answers = [];
let selected = null;

async function startQuiz() {
  const topic = document.getElementById("topic").value;
  const level = document.getElementById("level").value;
  try {
    questions = await apiFetch(`/questions?topic=${topic}&level=${level}`);
    if (questions.length === 0) {
      document.getElementById("msg").textContent = "No questions found for this choice.";
      return;
    }
    sessionStorage.setItem("quizInfo", JSON.stringify({ topic, level }));
    document.getElementById("setup").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    showQuestion();
  } catch (err) {
    document.getElementById("msg").textContent = err.message;
  }
}

function selectOption(i) {
  selected = i;
}

function showQuestion() {
  const q = questions[current];
  selected = null;
  document.getElementById("counter").textContent =
    `Question ${current + 1} of ${questions.length}`;
  document.getElementById("questionText").textContent = q.questionText;
  document.getElementById("options").innerHTML = q.options
    .map((opt, i) =>
      `<label class="option"><input type="radio" name="opt" onclick="selectOption(${i})">${escapeHTML(opt)}</label>`)
    .join("");
}

async function nextQuestion() {
  if (selected === null) return alert("Please select an answer");
  answers.push({ question: questions[current]._id, selected });
  current++;
  if (current < questions.length) return showQuestion();

  const info = JSON.parse(sessionStorage.getItem("quizInfo"));
  try {
    const result = await apiFetch("/attempts", {
      method: "POST",
      body: JSON.stringify({ ...info, answers }),
    });
    sessionStorage.setItem("result", JSON.stringify(result));
    window.location.href = "result.html";
  } catch (err) {
    alert(err.message);
  }
}