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

  logoTl
    .from(logo, {
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      width: "10vw",
      duration: 1.2,
      delay: 0.5,
      ease: "power2.inOut",
    })
    .from(
      hero_header_split.chars,
      {
        opacity: 0,
        y: 50,
        rotateX: -90,
        filter: "blur(10px)",
        stagger: 0.02,
        ease: "power2.out",
        duration: 1,
      },
      "=-0.5"
    )
    .from(hero_text_split.lines, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      filter: "blur(10px)",
      stagger: 0.05,
    })
    .from(
      ".navbar_line",
      {
        width: "0%",
        duration: 2,
        ease: "power2.out",
      },
      "=-0.5"
    )
    .from(
      navlinks,
      {
        opacity: 0,
        stagger: 0.1,
        filter: "blur(10px)",
        duration: 1,
        ease: "power2.out",
      },
      "<"
    );
};

exports.pixel_hero = function () {
  window.onload = () => {
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
  };
};
