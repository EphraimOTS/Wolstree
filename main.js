// WolStreet Finance — shared front-end behaviour

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // Live utility-bar date (client's local date, falls back to static markup if JS is off)
  var dateEl = document.getElementById("utility-date");
  if (dateEl) {
    var today = new Date();
    var formatted = today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    dateEl.textContent = formatted;
  }

  // Header search: no live backend yet, so keep it graceful rather than a dead end
  var searchForm = document.querySelector(".header-search");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = searchForm.querySelector("input[type='search']");
      var q = (input && input.value || "").trim();
      window.location.href = q ? "/blog.html?q=" + encodeURIComponent(q) : "/blog.html";
    });
  }

  // Category filter on the blog/archive page
  var pills = document.querySelectorAll(".cat-pill[data-filter]");
  var cards = document.querySelectorAll("[data-category]");
  if (pills.length && cards.length) {
    pills.forEach(function (pill) {
      pill.addEventListener("click", function (e) {
        e.preventDefault();
        pills.forEach(function (p) { p.classList.remove("active"); });
        pill.classList.add("active");
        var filter = pill.getAttribute("data-filter");
        cards.forEach(function (card) {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Newsletter + contact form: friendly placeholder submit (no backend wired up yet)
  document.querySelectorAll("form[data-placeholder-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = "Thanks! This form isn't wired to a backend yet — connect it to Mailchimp, Formspree, or your own API to start collecting real submissions.";
        note.style.display = "block";
      }
      form.reset();
    });
  });

  // Sticky header shadow intensifies slightly on scroll for depth cues
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.style.boxShadow = window.scrollY > 4
        ? "0 6px 20px rgba(11,30,61,0.14)"
        : "0 2px 10px rgba(11,30,61,0.07)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
});
