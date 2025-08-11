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
    const delay = parseFloat(text.getAttribute("delay")) || 0;

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
              start: "top 100%",
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
            delay: delay,
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

// Page transition configuration
const pageTransitionConfig = {
  "/": "",
  "/work": "light-mode",
  "/studio": "light-mode",
  "/blog": "",
  "/contact": "",
  "/work/work-template": "light-mode",
  "/blog/blog-template": "",
  "/work/sylvera": "sylvera",
};

// Page transition system
document.addEventListener("DOMContentLoaded", () => {
  const mainWrapper = document.querySelector(".main-wrapper");

  // Set initial body class based on current page
  updateBodyClass(location.pathname);

  // Intercept all internal links
  const internalLinks = document.querySelectorAll('a[href^="/"]');
  console.log("Found internal links:", internalLinks.length);

  internalLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Preventing default navigation");

      const href = link.getAttribute("href");

      // Ignore links with target="_blank" or modifier keys
      if (link.target === "_blank") {
        console.log("Ignoring link due to target or modifier keys");
        return;
      }

      // Start page transition
      handlePageTransition(href);
    });
  });
});

// Handle the page transition
function handlePageTransition(newPath) {
  console.log("Page transition triggered to:", newPath);

  const mainWrapper = document.querySelector(".main-wrapper");

  if (!mainWrapper) {
    console.warn("Main wrapper not found, navigating directly");
    window.location.href = newPath;
    return;
  }

  // 1. Fade out the main wrapper
  gsap.to(mainWrapper, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      setTimeout(() => {
        window.location.href = newPath;
      }, 400);
    },
  });

  // 2. Update body class 200ms after animation starts
  setTimeout(() => {
    updateBodyClass(newPath);
  }, 200);
}

// Function to update body class based on path
function updateBodyClass(path) {
  const body = document.body;

  // Remove all known transition classes
  Object.values(pageTransitionConfig).forEach((cls) => {
    if (cls && cls !== "") {
      // Only remove non-empty classes
      body.classList.remove(cls);
    }
  });

  // Add class if the path has a match and the class is not empty
  if (pageTransitionConfig[path] && pageTransitionConfig[path] !== "") {
    body.classList.add(pageTransitionConfig[path]);
  }
  // If the path has an empty string, we explicitly remove all classes
  else if (pageTransitionConfig[path] === "") {
    // Remove all known classes to ensure clean state
    Object.values(pageTransitionConfig).forEach((cls) => {
      if (cls && cls !== "") {
        body.classList.remove(cls);
      }
    });
  }
}
