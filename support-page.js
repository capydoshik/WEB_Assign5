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


/*Searching*/ 
$(document).ready(function () {
  const products = [
    { name: "iPhone 14", link: "iphone.html" },
    { name: "iPhone 15", link: "iphone.html" },
    { name: "iPhone 16", link: "iphone.html" },
    { name: "MacBook Air 2022", link: "macbook.html" },
    { name: "MacBook Air 13 2024", link: "macbook.html" },
    { name: "MacBook Air 13 2025", link: "macbook.html" },
    { name: "AirPods Pro", link: "airpods.html" },
    { name: "AirPods Pro 2", link: "airpods.html" },
    { name: "AirPods 4", link: "airpods.html" }
  ];

  $("#globalSearch").on("input", function () {
    const value = $(this).val().toLowerCase();
    const matches = products.filter(p => p.name.toLowerCase().includes(value));

    $("#suggestions").empty();

    if (value && matches.length > 0) {
      matches.forEach(p => {
        $("#suggestions").append(`<li data-link="${p.link}">${p.name}</li>`);
      });
      $("#suggestions").show();
    } else {
      $("#suggestions").hide();
    }
  });

  $("#suggestions").on("click", "li", function () {
    const pageLink = $(this).data("link");
    window.location.href = pageLink;
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".search-container").length) {
      $("#suggestions").hide();
    }
  });

  $("#searchBtn").on("click", function () {
    const sound = $("#searchSound")[0];
    sound.currentTime = 0;
    sound.play(); 
  });
});

