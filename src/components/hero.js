exports.hero = function () {
  const logo = document.getElementById("logo");
  const a = document.getElementById("a");
  const d1 = document.getElementById("d1");
  const d2 = document.getElementById("d2");
  const e = document.getElementById("e");
  const d3 = document.getElementById("d3");
  const { createLogoAnimation } = require("../reusables/logo");
  const tl = gsap.timeline();

  const navlinks = document.querySelectorAll(".nav_link");

  const hero_header = document.querySelector("[data-lines-hero='true']");
  gsap.set(hero_header, { visibility: "visible" });

  const hero_text = document.querySelector("[data-hero-text]");
  gsap.set(hero_text, { visibility: "visible" });

  const hero_text_split = SplitText.create(hero_text, {
    type: "lines",
    linesClass: "line",
  });

  const hero_header_split = SplitText.create(hero_header, {
    type: "chars, words",
    linesClass: "line",
  });

  const logoTl = createLogoAnimation(tl, a, d1, d2, e, d3);

  // Responsive width based on screen size
  const getResponsiveWidth = () => {
    if (window.innerWidth <= 768) {
      return "25vw"; // Mobile
    } else if (window.innerWidth <= 1024) {
      return "15vw"; // Tablet
    } else {
      return "10vw"; // Desktop
    }
  };

  // Responsive animation configuration
  const getAnimationConfig = () => {
    // Desktop values as default
    const defaultConfig = {
      logo: {
        duration: 1.2,
        delay: 0.5,
        ease: "power2.inOut",
      },
      header: {
        y: 50,
        rotateX: -90,
        stagger: 0.02,
        duration: 1,
        ease: "power2.out",
      },
      text: {
        y: 20,
        duration: 1,
        stagger: 0.02,
        ease: "power2.out",
      },
      navbar: {
        duration: 2,
        ease: "power2.out",
      },
      navlinks: {
        stagger: 0.1,
        duration: 1,
        ease: "power2.out",
      },
      badge: {
        duration: 1,
        x: 50,
        ease: "power2.out",
      },
    };

    if (window.innerWidth <= 768) {
      // Mobile overrides - only specify what's different from desktop
      return {
        ...defaultConfig,
        logo: {
          ...defaultConfig.logo,
          duration: 0.8,
          delay: 0.3,
        },
        // Add other mobile-specific overrides here when needed
        // header: { ...defaultConfig.header, y: 30 },
        // text: { ...defaultConfig.text, y: 15 },
        // etc.
      };
    } else {
      return defaultConfig;
    }
  };

  const config = getAnimationConfig();

  // On mobile, just fade out the logo without movement
  if (window.innerWidth <= 768) {
    logoTl.to(logo, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: config.logo.delay,
    });

    // Animate hero-video_wrapper on mobile
    logoTl.from(
      ".hero-video_wrapper",
      {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power2.out",
      },
      "=-0.3"
    );
  } else {
    // On desktop/tablet, do the full movement animation
    logoTl.from(logo, {
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      width: getResponsiveWidth(),
      duration: config.logo.duration,
      delay: config.logo.delay,
      ease: config.logo.ease,
    });
  }

  logoTl
    .from(
      hero_header_split.chars,
      {
        opacity: 0,
        y: config.header.y,
        rotateX: config.header.rotateX,
        filter: "blur(10px)",
        stagger: config.header.stagger,
        ease: config.header.ease,
        duration: config.header.duration,
      },
      "=-0.5"
    )
    .from(
      hero_text_split.lines,
      {
        opacity: 0,
        y: config.text.y,
        duration: config.text.duration,
        ease: config.text.ease,
        filter: "blur(10px)",
        stagger: config.text.stagger,
      },
      "=-0.5"
    );

  const isFirstVisit = !sessionStorage.getItem("hasVisited");
  const isHomePage =
    window.location.pathname === "/" || window.location.pathname === "";
  const isMobile = window.innerWidth <= 768;

  if (isFirstVisit && isHomePage && !isMobile) {
    logoTl
      .from(
        ".navbar_line",
        {
          width: "0%",
          duration: config.navbar.duration,
          ease: config.navbar.ease,
        },
        "=-0.5"
      )
      .from(
        navlinks,
        {
          opacity: 0,
          stagger: config.navlinks.stagger,
          filter: "blur(10px)",
          duration: config.navlinks.duration,
          ease: config.navlinks.ease,
        },
        "<"
      )
      .from(
        ".webflow_badge",
        {
          opacity: 0,
          duration: config.badge.duration,
          x: config.badge.x,
          filter: "blur(10px)",
          ease: config.badge.ease,
        },
        "=-0.2"
      );

    sessionStorage.setItem("hasVisited", "true");
  }
};

/*exports.pixel_hero = function () {
  window.onload = () => {
    // Skip pixel animation on mobile
    if (window.innerWidth <= 768) {
      gsap.set(".hero_video", { visibility: "visible" });
      gsap.set(".section_hero", { visibility: "visible" });
      return;
    }

    const pixelOverlay = document.querySelector(".pixel-overlay");
    const cols = 10;
    const rows = 10;

    pixelOverlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    pixelOverlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    const centerX = cols / 2;
    const centerY = rows / 2;

    // Create a 2D array to hold "shouldStay" values
    const stayMap = Array.from({ length: rows }, () => Array(cols).fill(false));

    // First randomly mark some corner-adjacent pixels
    const margin = 3;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const rand = Math.random();
        const inTopLeft = x < margin && y < margin && rand < 0.5;
        const inTopRight = x > cols - margin - 1 && y < margin && rand < 0.5;
        const inBottomLeft = x < margin && y > rows - margin - 1 && rand < 0.5;
        const inBottomRight =
          x > cols - margin - 1 && y > rows - margin - 1 && rand < 0.5;

        if (inTopLeft || inTopRight || inBottomLeft || inBottomRight) {
          stayMap[y][x] = true;
        }
      }
    }

    // Flood fill to keep only connected pixels that reach an edge
    const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
    const queue = [];

    // Add all edge-connected "true" pixels to queue
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (
          stayMap[y][x] &&
          (x === 0 || y === 0 || x === cols - 1 || y === rows - 1)
        ) {
          queue.push({ x, y });
          visited[y][x] = true;
        }
      }
    }

    // Directions (4-way)
    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    while (queue.length > 0) {
      const { x, y } = queue.shift();
      for (const [dx, dy] of dirs) {
        const nx = x + dx;
        const ny = y + dy;
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < cols &&
          ny < rows &&
          stayMap[ny][nx] &&
          !visited[ny][nx]
        ) {
          visited[ny][nx] = true;
          queue.push({ x: nx, y: ny });
        }
      }
    }

    // Create pixels
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        const distToCenter = Math.hypot(centerX - x, centerY - y);
        pixel.dataset.dist = distToCenter;
        pixel.dataset.x = x;
        pixel.dataset.y = y;

        // Final keep decision is only if it was visited
        pixel.dataset.keep = visited[y][x] ? "1" : "0";

        pixelOverlay.appendChild(pixel);
      }
    }

    // Animate
    const pixels = gsap.utils.toArray(".pixel");

    gsap.to(pixels, {
      opacity: (i, el) => {
        return el.dataset.keep === "1" ? 1 : 0;
      },
      delay: (i, el) => {
        const dist = +el.dataset.dist;
        const randomOffset = Math.random() * 0.5;
        return dist * 0.02 + randomOffset;
      },
      duration: 0.2,
      stagger: 0.03,
      ease: "power1.out",
    });
    gsap.set(".hero_video", { visibility: "visible" });
    gsap.set(".section_hero", { visibility: "visible" });
  };
};
*/
