loadNavbar();

function check() {
  const p = document.getElementById("pw").value;
  const tests = [
    [p.length >= 8, "Use at least 8 characters"],
    [/[A-Z]/.test(p), "Add an uppercase letter"],
    [/[a-z]/.test(p), "Add a lowercase letter"],
    [/[0-9]/.test(p), "Add a number"],
    [/[^A-Za-z0-9]/.test(p), "Add a symbol like @ # $ !"],
    [p.length >= 12, "Make it 12+ characters for extra safety"],
  ];
  const common = ["password", "123456", "qwerty", "admin", "letmein"];
  let points = tests.filter(t => t[0]).length;
  if (common.some(c => p.toLowerCase().includes(c))) points = Math.min(points, 1);

  const levels = [
    ["", "0%", "#334155"],
    ["Very Weak", "20%", "#f87171"],
    ["Weak", "35%", "#fb923c"],
    ["Fair", "55%", "#facc15"],
    ["Good", "75%", "#a3e635"],
    ["Strong", "90%", "#4ade80"],
    ["Very Strong", "100%", "#22c55e"],
  ];
  const lv = p ? levels[points] : levels[0];
  const bar = document.getElementById("bar");
  bar.style.width = lv[1];
  bar.style.background = lv[2];
  document.getElementById("label").textContent = lv[0];
  document.getElementById("tips").innerHTML = p
    ? tests.filter(t => !t[0]).map(t => `<p>• ${t[1]}</p>`).join("")
    : "";
}