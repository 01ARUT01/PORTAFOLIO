/* ═══════════════════════════════════════════════
   PORTAFOLIO — Animaciones e Interactividad
   ═══════════════════════════════════════════════ */

// ── PANTALLA DE CARGA ──
window.addEventListener("load", function () {
  var loader = document.getElementById("loader");
  var main = document.getElementById("main-content");

  setTimeout(function () {
    loader.classList.add("fade-out");
    main.classList.remove("hidden");
    setTimeout(initAnimations, 300);
  }, 1800);
});

function initAnimations() {
  // ── SCROLL REVEAL SECCIONES ──
  var sections = document.querySelectorAll(".fade-section");
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  sections.forEach(function (s) { observer.observe(s); });

  // ── SKILL BARS: animar al ser visibles ──
  var skillBars = document.querySelectorAll(".skill-fill");
  var barObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var pct = bar.getAttribute("data-pct");
          setTimeout(function () {
            bar.style.width = pct + "%";
          }, 400);
          barObserver.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillBars.forEach(function (bar) { barObserver.observe(bar); });

  // ── EFECTO LUPA / MAGNIFIER EN HABILIDADES ──
  var stage = document.getElementById("stage");
  if (stage) {
    var cards = gsap.utils.toArray(".card");
    var radius = 200;
    var maxScale = 1.15;

    stage.addEventListener("mousemove", function (e) {
      var mx = e.clientX,
        my = e.clientY;
      cards.forEach(function (card) {
        var r = card.getBoundingClientRect();
        var d = Math.hypot(
          mx - (r.left + r.width / 2),
          my - (r.top + r.height / 2)
        );
        var p = gsap.utils.clamp(0, 1, gsap.utils.mapRange(0, radius, 1, 0, d));
        gsap.to(card, {
          scale: 1 + (maxScale - 1) * p,
          overwrite: true,
          ease: "power2.out",
        });
      });
    });

    stage.addEventListener("mouseleave", function () {
      cards.forEach(function (card) {
        gsap.to(card, {
          scale: 1,
          duration: 0.5,
          overwrite: true,
          ease: "power2.out",
        });
      });
    });
  }

  // ── STAGGER ANIMATIONS PARA CARDS ──
  var animCards = document.querySelectorAll(".edu-card, .project-card, .contact-card");
  var cardObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cards = document.querySelectorAll(
            entry.target.parentElement.classList.contains("edu-grid") ? ".edu-card" :
            entry.target.parentElement.classList.contains("projects-grid") ? ".project-card" :
            ".contact-card"
          );
          cards.forEach(function (card, i) {
            gsap.fromTo(card,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.6, delay: i * 0.12, ease: "power2.out" }
            );
          });
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  animCards.forEach(function (c) { cardObserver.observe(c); });

  // ── HEADER ANIMACION ──
  gsap.fromTo(".header h1",
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  );
  gsap.fromTo(".header p",
    { y: -10, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: "power2.out" }
  );
}
