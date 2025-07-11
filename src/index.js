window.lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 0.7,
  gestureOrientation: "vertical",
  normalizeWheel: false,
  smoothTouch: false,
});
function raf(time) {
  window.lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
$("[data-lenis-start]").on("click", function () {
  window.lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  window.lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    window.lenis.stop();
  } else {
    window.lenis.start();
  }
});

document.fonts.ready.then(() => {
  document.querySelectorAll("[data-line-reveal='true']").forEach((text) => {
    SplitText.create(text, {
      type: "lines",
      autoSplit: true,
      linesClass: "line",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top bottom",
              end: "top 50%",
              toggleActions: "none play reverse none reset",
            },
          })
          .from(self.lines, {
            opacity: 0,
            y: 100,
            stagger: 0.1,
            filter: "blur(10px)",
            duration: 1,
            ease: "power2.out",
          });
      },
    });

    gsap.set(text, { visibility: "visible" });
  });

  document.querySelectorAll("[data-word-reveal='true']").forEach((text) => {
    SplitText.create(text, {
      type: "words, chars",
      mask: "words",
      wordsClass: "word",
      charsClass: "char",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top bottom",
              end: "top 80%",
              toggleActions: "reverse play reverse none reset",
            },
          })
          .from(self.words, {
            y: "150%",
            rotation: 10,
            stagger: 0.05,
            duration: 0.5,
            ease: "back.out(1.5)",
          });
      },
    });

    gsap.set(text, { visibility: "visible" });
  });

  document.querySelectorAll("[data-char-reveal='true']").forEach((text) => {
    SplitText.create(text, {
      type: "chars",
      charsClass: "char",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top bottom",
              end: "top 90%",
              toggleActions: "none play reverse none reset",
            },
          })
          .from(self.chars, {
            opacity: 0,
            y: 50,
            rotateX: -90,
            filter: "blur(10px)",
            stagger: 0.02,
            ease: "power2.out",
            duration: 1,
          });
      },
    });

    gsap.set(text, { visibility: "visible" });
  });
});
