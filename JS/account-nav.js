document.addEventListener("DOMContentLoaded", () => {
    const accountLink = document.querySelector('.header-nav a[href="../HTML/login.html"]');
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    const user = JSON.parse(localStorage.getItem("user"));

    if (loggedIn && user) {
        accountLink.textContent = "My Profile";
        accountLink.href = "../HTML/profile.html";
    } else {
        accountLink.textContent = "Account";
        accountLink.href = "../HTML/login.html";
    }
});
