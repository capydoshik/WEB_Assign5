document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();
            const errorMessage = document.getElementById("error-message");

            errorMessage.style.color = "red";

            if (!name || !email || !message) {
                errorMessage.textContent = "Please fill in all fields.";
                return;
            }

            const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
            if (!email.match(emailPattern)) {
                errorMessage.textContent = "Invalid email format.";
                return;
            }

            errorMessage.style.color = "lightgreen";
            errorMessage.textContent = "Message sent successfully!";
            form.reset();
        });
    }
    const openFormBtn = document.getElementById("openFormBtn");
    const contactForm = document.getElementById("contactForm");

    if (openFormBtn && contactForm) {
        openFormBtn.addEventListener("click", () => {
            contactForm.classList.toggle("hidden");
            contactForm.classList.toggle("show");
            openFormBtn.textContent = contactForm.classList.contains("hidden")
                ? "Contact Us"
                : "Close Form";
        });
    }

    function updateDateTime() {
        const now = new Date();
        const options = {
            month: 'long', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
        };
        const dateTimeEl = document.getElementById("dateTime");
        if (dateTimeEl) {
            dateTimeEl.textContent = now.toLocaleString('en-US', options);
        }
    }
    setInterval(updateDateTime, 1000);
    updateDateTime();

});



