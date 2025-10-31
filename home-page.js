/*FAQ*/ 
document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      content.classList.toggle("active");
    });
  });

  /*Time*/ 
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


/*Scrolling*/ 
$(window).on("scroll", function() {
  var scroll = $(window).scrollTop();
  var height = $(document).height() - $(window).height();
  var scrolled = (scroll / height) * 100;
  $("#progressBar").css("width", scrolled + "%");
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

/* Counter */ 
$('.count').each(function () {
  $(this).prop('Counter', 0).animate(
    {
      Counter: $(this).data('target')
    },
    {
      duration: 3000, 
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now)); 
      }
    }
  );
});
