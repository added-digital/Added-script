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
      mask: "lines",
      autoSplit: true,
      linesClass: "line",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              end: "top 100%",
              toggleActions: "none play reverse none reset",
            },
          })
          .from(self.lines, {
            opacity: 0,
            y: 100,
            stagger: 0.1,
            duration: 1,
            ease: "expo.out",
          });
      },
    });

    gsap.set(text, { visibility: "visible" });
  });

  document.querySelectorAll("[data-word-reveal='true']").forEach((text) => {
    SplitText.create(text, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              end: "top 100%",
              toggleActions: "reverse play reverse none reset",
            },
          })
          .from(self.words, {
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

  document.querySelectorAll("[data-char-reveal='true']").forEach((text) => {
    SplitText.create(text, {
      type: "chars, words",
      wordsClass: "word",
      charsClass: "char",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
              end: "top 100%",
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

gsap.fromTo(
  ".horisontal_line",
  {
    width: "0%",
  },
  {
    width: "100%",
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".horisontal_line",
      start: "top 90%",
      toggleActions: "play none none none",
    },
  }
);
