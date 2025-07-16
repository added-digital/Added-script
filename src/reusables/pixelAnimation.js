exports.initPixelAnimation = function () {
  // Initialize pixel animation for all elements with the data-pixel-reveal attribute
  const initPixelAnimationOnElement = (element) => {
    const cols = 10;
    const rows = 10;

    // Create pixel overlay container
    const pixelOverlay = document.createElement("div");
    pixelOverlay.classList.add("pixel-overlay");
    pixelOverlay.style.position = "absolute";
    pixelOverlay.style.top = "0";
    pixelOverlay.style.left = "0";
    pixelOverlay.style.width = "100%";
    pixelOverlay.style.height = "100%";
    pixelOverlay.style.display = "grid";
    pixelOverlay.style.zIndex = "10";
    pixelOverlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    pixelOverlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

    // Make sure the parent element has relative positioning
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === "static") {
      element.style.position = "relative";
    }

    // Insert the overlay as the first child
    element.insertBefore(pixelOverlay, element.firstChild);

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

        pixel.style.opacity = "1"; // Start fully visible
        pixel.style.transition = "opacity 0.2s ease-out";
        pixel.style.aspectRatio = "1"; // Ensure square pixels
        pixel.style.width = "100%";
        pixel.style.height = "100%";

        const distToCenter = Math.hypot(centerX - x, centerY - y);
        pixel.dataset.dist = distToCenter;
        pixel.dataset.x = x;
        pixel.dataset.y = y;

        // Final keep decision is only if it was visited
        pixel.dataset.keep = visited[y][x] ? "1" : "0";

        pixelOverlay.appendChild(pixel);
      }
    }

    // Show the original content immediately (it's behind the pixels)
    gsap.set(element, { visibility: "visible" });

    // Return the pixels for scroll trigger
    return pixelOverlay.querySelectorAll(".pixel");
  };

  // Initialize on window load
  window.onload = () => {
    // Find all elements with the data-pixel-reveal attribute
    const elements = document.querySelectorAll("[data-pixel-reveal]");

    elements.forEach((element) => {
      // Hide the element initially
      gsap.set(element, { visibility: "hidden" });
      const pixels = initPixelAnimationOnElement(element);

      // Create scroll trigger for the animation
      gsap.to(pixels, {
        opacity: 0, // All pixels fade out
        delay: (i, el) => {
          const dist = +el.dataset.dist;
          const randomOffset = Math.random() * 0.5;
          return dist * 0.02 + randomOffset;
        },
        stagger: 0.01,
        ease: "power1.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%", // Start when element is 80% from top of viewport
          end: "bottom 20%", // End when element is 20% from bottom of viewport
          toggleActions: "play none none none", // Play on enter, reverse on leave
          markers: false, // Set to true for debugging
        },
      });
    });
  };
};

// Export a function to manually initialize pixel animation on any element
exports.initPixelAnimationOnElement = function (element, options = {}) {
  const {
    cols = 10,
    rows = 10,
    margin = 3,
    animationDuration = 0.2,
    staggerDelay = 0.01,
  } = options;

  // Create pixel overlay container
  const pixelOverlay = document.createElement("div");
  pixelOverlay.classList.add("pixel-overlay");
  pixelOverlay.style.position = "absolute";
  pixelOverlay.style.top = "0";
  pixelOverlay.style.left = "0";
  pixelOverlay.style.width = "100%";
  pixelOverlay.style.height = "100%";
  pixelOverlay.style.display = "grid";
  pixelOverlay.style.zIndex = "10";
  pixelOverlay.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  pixelOverlay.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  // Make sure the parent element has relative positioning
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.position === "static") {
    element.style.position = "relative";
  }

  // Insert the overlay as the first child
  element.insertBefore(pixelOverlay, element.firstChild);

  const centerX = cols / 2;
  const centerY = rows / 2;

  // Create a 2D array to hold "shouldStay" values
  const stayMap = Array.from({ length: rows }, () => Array(cols).fill(false));

  // First randomly mark some corner-adjacent pixels
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
      pixel.style.backgroundColor = pixelColor;
      pixel.style.opacity = "1"; // Start fully visible
      pixel.style.transition = `opacity ${animationDuration}s ease-out`;
      pixel.style.aspectRatio = "1"; // Ensure square pixels
      pixel.style.width = "100%";
      pixel.style.height = "100%";

      const distToCenter = Math.hypot(centerX - x, centerY - y);
      pixel.dataset.dist = distToCenter;
      pixel.dataset.x = x;
      pixel.dataset.y = y;

      // Final keep decision is only if it was visited
      pixel.dataset.keep = visited[y][x] ? "1" : "0";

      pixelOverlay.appendChild(pixel);
    }
  }

  // Animate - all pixels fade out to reveal the image
  const pixels = pixelOverlay.querySelectorAll(".pixel");

  gsap.to(pixels, {
    opacity: 0, // All pixels fade out
    delay: (i, el) => {
      const dist = +el.dataset.dist;
      const randomOffset = Math.random() * 0.5;
      return dist * 0.02 + randomOffset;
    },
    duration: animationDuration,
    stagger: staggerDelay,
    ease: "power1.out",
  });

  // Show the original content immediately (it's behind the pixels)
  gsap.set(element, { visibility: "visible" });
};
