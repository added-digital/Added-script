gsap.registerPlugin(ScrollTrigger);

const columns = gsap.utils.toArray(".draw_col");

const drawSvgPaths = gsap.utils.toArray("#path");

gsap.set("#path", { scale: 1 });

drawSvgPaths.forEach((path) => {
  const length = path.getTotalLength();
  gsap.set(path, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });
});

const drawTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_draw-rail",
    start: "top 40%",
    end: "bottom 70%",
    scrub: 1,
  },
});

drawTl
  .from(columns, {
    opacity: 0,
    yPercent: (index) => (index % 2 === 0 ? -100 : 100),
    ease: "power1.inOut",
    stagger: {
      each: 0.1,
      from: "random",
    },
  })
  .to(
    drawSvgPaths,
    {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power1.inOut",
      stagger: 0.3,
    },
    ">"
  )
  .to(
    ".draw_image:not(.draw)",
    {
      opacity: 0,
    },
    "<"
  )
  .to(
    ".nav_fixed",
    {
      background: "#00000001",
    },
    "<"
  )
  .to(drawSvgPaths, {
    color: "white",
    duration: 0.6,
  })
  .to(drawSvgPaths, {
    transformOrigin: "50% 50%",

    scale: () => {
      const path = drawSvgPaths[0];
      if (!path) return 1;

      const pathRect = path.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const scaleX = viewportWidth / pathRect.width;
      const scaleY = viewportHeight / pathRect.height;

      return Math.max(scaleX, scaleY);
    },

    ease: "expo.inOut",
    duration: 0.6,
  })
  .to(
    "#d-checker",
    {
      opacity: 1,
      duration: 0,
    },
    "-=0.3"
  )
  .from(
    ".section_clients",
    {
      opacity: 0,
      duration: 1,
    },
    "-=0.5"
  )
  .to(
    ".body",
    {
      className: "body light-mode",
    },
    "-=0.6"
  )
  .set(
    "#path",
    {
      display: "none",
      duration: 0,
    },
    "+=0.2"
  )
  .set(
    ".nav_fixed",
    {
      background: "#fff",
    },
    "<"
  );

document.addEventListener("DOMContentLoaded", () => {
  const animatedSquare = document.getElementById("path");
  const matchingDiv = document.getElementById("d-checker");

  if (animatedSquare && matchingDiv) {
    function syncWidth() {
      const currentWidth = animatedSquare.getBoundingClientRect().width;
      const extraWidth = currentWidth + 2;
      matchingDiv.style.width = `${extraWidth}px`;

      requestAnimationFrame(syncWidth);
    }

    syncWidth();
  } else {
    console.error(
      "Could not find the animated-square or matching-div. Check the IDs in your HTML."
    );
  }
});
