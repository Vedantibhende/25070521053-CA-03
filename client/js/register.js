loadNavbar();

async function register() {
  const msg = document.getElementById("msg");
  try {
    await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });
    msg.className = "success";
    msg.textContent = "Registered! Redirecting to login...";
    setTimeout(() => (window.location.href = "login.html"), 1000);
  } catch (err) {
    msg.className = "error";
    msg.textContent = err.message;
  }
}