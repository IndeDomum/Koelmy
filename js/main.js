// Koel-MY site script: mobile menu, footer year, contact form.
(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("hoofdmenu");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Sluiten" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });
  }

  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  // GitHub Pages has no server-side mail, so the form composes an e-mail in the
  // visitor's own mail program instead of posting somewhere.
  var form = document.getElementById("contactformulier");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var get = function (name) { return (form.elements[name].value || "").trim(); };
      var subject = get("onderwerp") + " - " + get("naam");
      var body = [
        get("bericht"),
        "",
        "Naam: " + get("naam"),
        "Telefoon: " + (get("telefoon") || "-"),
        "E-mail: " + get("email"),
        "Plaats: " + (get("plaats") || "-")
      ].join("\r\n");

      window.location.href = "mailto:info@koelmy.nl" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      var status = document.getElementById("form-status");
      if (status) {
        status.hidden = false;
        status.focus();
      }
    });
  }
})();
