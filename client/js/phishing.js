loadNavbar();

const samples = [
  { text: "From: security@paypa1-support.com\nSubject: URGENT: Account suspended\n\nYour account will be closed in 24 hours. Click http://paypa1-verify.xyz to confirm your password now!",
    isPhishing: true,
    flags: "Misspelled domain (paypa1), urgency, suspicious link, asks for password." },
  { text: "From: hr@yourcollege.edu\nSubject: Holiday notice\n\nThe college will remain closed on Friday for the festival. Regular classes resume Monday.",
    isPhishing: false,
    flags: "Known sender, no links, no request for personal information." },
  { text: "From: lucky-draw@win-prizes.biz\nSubject: You won ₹50,00,000!\n\nPay ₹2,000 processing fee to claim your prize. Reply with your bank details.",
    isPhishing: true,
    flags: "Too good to be true, asks for money and bank details." },
  { text: "From: noreply@github.com\nSubject: New login from Chrome\n\nWe noticed a new sign-in. If this was you, no action is needed.",
    isPhishing: false,
    flags: "Official domain, informational only, no link demanding action." },
  { text: "From: it-helpdesk@college-mail-update.com\nSubject: Password expires today\n\nYour email password expires today. Login at http://bit.ly/3xYz to keep your account.",
    isPhishing: true,
    flags: "Shortened link hides the real address, urgency, unofficial domain." },
];

let i = 0;
let score = 0;
let answered = false;

function show() {
  answered = false;
  document.getElementById("counter").textContent = `Email ${i + 1} of ${samples.length}`;
  document.getElementById("email").textContent = samples[i].text;
  document.getElementById("feedback").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
}

function answer(userSaysPhishing) {
  if (answered) return;
  answered = true;
  const s = samples[i];
  const correct = userSaysPhishing === s.isPhishing;
  if (correct) score++;
  document.getElementById("feedback").innerHTML =
    `<p class="${correct ? "success" : "error"}"><b>${correct ? "Correct!" : "Wrong!"}</b>
     This is ${s.isPhishing ? "a phishing email" : "a safe email"}.</p><p>${s.flags}</p>`;
  document.getElementById("nextBtn").style.display = "inline-block";
}

function next() {
  i++;
  if (i < samples.length) return show();
  document.getElementById("game").style.display = "none";
  document.getElementById("end").style.display = "block";
  document.getElementById("finalScore").textContent = `Score: ${score} / ${samples.length}`;
}

show();