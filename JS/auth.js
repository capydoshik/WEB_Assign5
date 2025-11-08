document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const profileInfo = document.getElementById("profileInfo");
  const logoutBtn = document.getElementById("logoutBtn");

  /* SIGN UP */
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const msg = document.getElementById("signup-msg");

      if (!name || !email || !password) {
        msg.style.color = "red";
        msg.textContent = "Please fill in all fields.";
        return;
      }

      if (!/^[^ ]+@[^ ]+\.[a-z]{2,}$/.test(email)) {
        msg.style.color = "red";
        msg.textContent = "Invalid email format.";
        return;
      }

      const user = { name, email, password };
      localStorage.setItem("user", JSON.stringify(user));

      msg.style.color = "lightgreen";
      msg.textContent = "Account created successfully!";
      setTimeout(() => (window.location.href = "login.html"), 1200);
    });
  }

  /* LOG IN */
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const msg = document.getElementById("login-msg");

      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        msg.style.color = "red";
        msg.textContent = "No account found. Please sign up first.";
        return;
      }

      if (email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        msg.style.color = "lightgreen";
        msg.textContent = "Login successful!";
        setTimeout(() => (window.location.href = "../index.html"), 1000);
      } else {
        msg.style.color = "red";
        msg.textContent = "Invalid credentials.";
      }
    });
  }

  /* PROFILE PAGE */
  if (profileInfo) {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user) {
      window.location.href = "login.html";
      return;
    }

    profileInfo.innerHTML = `
      <p><strong>Name:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
    `;

    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }
});
