$(document).ready(function () {
    console.log("jQuery is ready!");

    /*Form validation*/
    const form = $("#contactForm");
    const errorMessage = $("#error-message");

    form.on("submit", function (e) {
    e.preventDefault();

        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const message = $("#message").val().trim();

        errorMessage.css("color", "red");

        if (!name || !email || !message) {
        errorMessage.text("Please fill in all fields.");
        return;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
        if (!email.match(emailPattern)) {
        errorMessage.text("Invalid email format.");
        return;
        }

        errorMessage.css("color", "lightgreen").text("Message sent successfully!");
        form[0].reset();
    });


  /*Spinner on contact us button*/ 
    const openFormBtn = $("#openFormBtn");
    const contactForm = $("#contactForm");

    openFormBtn.on("click", function () {
        const isHidden = contactForm.hasClass("hidden") || !contactForm.is(":visible");

        if (isHidden) {
            openFormBtn.addClass("loading");
            openFormBtn.prop("disabled", true);
            openFormBtn.html('<span class="spinner"></span> Opening form...');

            setTimeout(() => {
            openFormBtn.removeClass("loading");
            openFormBtn.prop("disabled", false);

            contactForm.removeClass("hidden").addClass("show").slideDown(300);
            openFormBtn.html("Close Form");
            }, 1500);
        } else {
            contactForm.slideUp(300, function () {
            contactForm.addClass("hidden").removeClass("show");
            });
            openFormBtn.html("Contact Us");
        }
    });



  /*Time*/
  function updateDateTime() {
    const now = new Date();
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };
    const dateTimeEl = $("#dateTime");
    if (dateTimeEl.length) {
      dateTimeEl.text(now.toLocaleString("en-US", options));
    }
  }

  setInterval(updateDateTime, 1000);
  updateDateTime();
});


/*Copy*/
$(".copy-btn").on("click", function () {
  const email = $(this).data("email");

  navigator.clipboard.writeText(email).then(() => {
    $(this).after('<span class="copy-msg">Copied!</span>');
    const msg = $(this).next(".copy-msg");

    setTimeout(() => {
      msg.fadeOut(300, function () {
        $(this).remove();
      });
    }, 1500);
  });
});

