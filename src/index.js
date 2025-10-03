require("./components/nav").nav();
require("./components/footer").footer();

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
    const delay = parseFloat(text.getAttribute("delay")) || 0;
    SplitText.create(text, {
      type: "words, chars",
      wordsClass: "word",
      charsClass: "char",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top 95%",
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
            delay: delay,
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

// Animate horizontal lines with dynamic delays
document.querySelectorAll(".horisontal_line").forEach((line) => {
  const delay = parseFloat(line.getAttribute("delay")) || 0;

  gsap.fromTo(
    line,
    {
      width: "0%",
    },
    {
      width: "100%",
      duration: 2,
      delay: delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 90%",
        toggleActions: "play none none none",
      },
    }
  );
});

// Initialize underline link hover animations
function initUnderlineLinkAnimations() {
  const underlineLinks = document.querySelectorAll(".underline_link");

  underlineLinks.forEach((link) => {
    const underlineLine = link.querySelector(".underline_link-line");

    if (underlineLine) {
      // Hover in animation
      link.addEventListener("mouseenter", () => {
        gsap.to(underlineLine, {
          width: "100%",
          duration: 0.3,
          ease: "power2.out",
        });
      });

      // Hover out animation
      link.addEventListener("mouseleave", () => {
        gsap.to(underlineLine, {
          width: "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      });
    }
  });
}

// Page transition configuration
const pageTransitionConfig = {
  "/": "",
  "/work": "light-mode",
  "/sv/work": "light-mode",
  "/studio": "",
  "/blog": "light-mode",
  "/sv/blog": "light-mode",
  "/contact": "",
};

// Folder-based class configuration for efficiency
const folderClassConfig = {
  "/work": "light-mode",
  "/blog": "light-mode",
  "/sv/work": "light-mode",
  "/sv/blog": "light-mode",
};

const mainWrapper = document.querySelector(".main-wrapper");

// Set initial body class based on current page
updateBodyClass(location.pathname);

// Initialize underline link hover animations
initUnderlineLinkAnimations();

// Intercept all internal links
const internalLinks = document.querySelectorAll('a[href^="/"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Ignore links with target="_blank" or modifier keys
    if (link.target === "_blank") {
      return;
    }

    // Start page transition
    handlePageTransition(href);
  });
});

// Handle the page transition
function handlePageTransition(newPath) {
  const mainWrapper = document.querySelector(".main-wrapper");

  if (!mainWrapper) {
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
      }, 300);
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

  // Remove all folder-based classes
  Object.values(folderClassConfig).forEach((cls) => {
    if (cls && cls !== "") {
      body.classList.remove(cls);
    }
  });

  // First check for exact path match (for specific overrides)
  if (pageTransitionConfig[path] !== undefined) {
    if (pageTransitionConfig[path] && pageTransitionConfig[path] !== "") {
      body.classList.add(pageTransitionConfig[path]);
    }
    return; // Exit early if exact match found
  }

  // Check for folder-based matching
  for (const [folderPath, className] of Object.entries(folderClassConfig)) {
    if (path.startsWith(folderPath) && className && className !== "") {
      body.classList.add(className);
      return; // Exit after first match
    }
  }

  // If no matches found, ensure all classes are removed
  Object.values(pageTransitionConfig).forEach((cls) => {
    if (cls && cls !== "") {
      body.classList.remove(cls);
    }
  });
  Object.values(folderClassConfig).forEach((cls) => {
    if (cls && cls !== "") {
      body.classList.remove(cls);
    }
  });
}
