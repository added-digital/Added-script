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
    } else if (window.innerWidth >= 1800) {
      return "250px"; // Desktop
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

exports.pixel_hero = function () {
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

exports.hero_images = function () {
  document.addEventListener("DOMContentLoaded", function () {
    // Configuration
    const config = {
      imageUrls: [
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1c0d05a00d8c67b1f143a_Frame%202085652807.webp",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1bd918111102cc3db9e55_Frame%202085653009.webp",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1c07cf89470e62c236a05_Frame%202085652806.webp",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1be77ead03987c7edd089_Frame%202085652806%20(1).png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1b97f0deb484edccd2aa5_ad.svg",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68af03682513615830b20fd3_aaa.webp",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68aec6d400a486851827a9c7_kl.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68addf9ab54e265ba6dbff6a_dghjk.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68aec581427057f509e971b3_h.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68aec580525eb498a38d3808_jgg.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68addf9af3dd62711e39ff17_gfa.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68addbf972cf04c9de58ee92_Frame%206.svg",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68ac9a6b6b672f730e018fc1_Frame%202085653047.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68addbfa591a81fed1353360_kltkhero.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68a5e1ef20c6ca5fef03dfa4_Frame%202085652807.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68ac9a5e97417638476c3f8a_Frame%202085653044.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68a5e1b3a5aee66996350f54_sylvera-banner.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68a5e0b92b0adadff1616f7b_Frame%202085652808-1.svg",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68a5dfa1ca7cca58ab00055a_Frame%202085652806.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689da82f0e84fa0499c07d6e_sng-mobile.webp",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689ee38a6398240df4809a40_Frame%202085652806.png",
        "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689c7f2688e0c2945c288801_Frame%202085653079.png",
      ],
      popupDuration: 1, // seconds - shorter duration for cleaner look
      imageSize: 200, // size of popup images - slightly smaller for better performance
      popupDistance: 10, // distance from mouse cursor - very close to mouse for accurate following
    };

    let activePopups = [];
    let lastPopupPosition = null;
    let minDistanceForPopup = 300; // minimum pixels to move before creating next popup
    let currentImageIndex = 0; // track the current image index for sequential order

    // Create popup image element
    function createPopupImage() {
      const img = document.createElement("img");
      img.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 10;
      border-radius: 4px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      transform: scale(0);
      opacity: 0;
    `;

      // Select images in sequential order
      const imageUrl = config.imageUrls[currentImageIndex];
      img.src = imageUrl;

      // Move to next image (cycle back to first when reaching the end)
      currentImageIndex = (currentImageIndex + 1) % config.imageUrls.length;
      // Let images maintain their natural aspect ratio
      img.style.maxWidth = config.imageSize + "px";
      img.style.maxHeight = config.imageSize + "px";
      img.style.width = "auto";
      img.style.height = "auto";

      // Add error handling for image loading
      img.onerror = () => console.error("Failed to load image:", randomImage);
      img.onload = () => {
        console.log("Image loaded successfully:", randomImage);
      };

      return img;
    }

    // Animate popup image
    function animatePopup(img, mouseX, mouseY, event) {
      // Simple approach: position image directly at mouse cursor
      const offsetX = (Math.random() - 0.5) * config.popupDistance;
      const offsetY = (Math.random() - 0.5) * config.popupDistance;

      // Center image on mouse cursor with small random offset
      // Estimate centering based on config.imageSize (will be refined after load)
      const posX = mouseX + offsetX - config.imageSize / 2;
      const posY = mouseY + offsetY - config.imageSize / 2;

      // Set position directly using CSS properties to bypass any transform issues
      img.style.left = posX + "px";
      img.style.top = posY + "px";

      gsap.set(img, {
        scale: 0.5,
        opacity: 0,
        rotate: 10,
      });

      // Popup animation - make it fully visible
      gsap.to(img, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        y: "-=0",
        duration: 1,
        ease: "expo.out",
      });

      // Drop down animation after delay
      gsap.to(img, {
        y: "+=80",
        opacity: 0,
        rotate: 10,
        duration: 1,
        delay: config.popupDuration,
        ease: "expo.in",
        onComplete: () => {
          // Remove image and clean up
          img.remove();
          const index = activePopups.indexOf(img);
          if (index > -1) {
            activePopups.splice(index, 1);
          }
        },
      });
    }

    // Helper function to create popup at a specific position
    function createPopupAtPosition(position, heroContent, event) {
      const popupImg = createPopupImage();

      // Append to hero_content instead of body for better containment
      if (heroContent) {
        heroContent.appendChild(popupImg);
      } else {
        // Fallback to body if hero_content not found
        document.body.appendChild(popupImg);
      }

      activePopups.push(popupImg);
      animatePopup(popupImg, position.x, position.y, event);
    }

    // Mouse move handler
    function handleMouseMove(event) {
      // Check if mouse is over .hero_content
      const heroContent = document.querySelector(".hero_content");
      if (!heroContent) {
        // Fallback: check if we're anywhere on the page
        const isInHeroContent = true;
      } else {
        // Check if mouse is within .hero_content bounds using viewport coordinates
        const rect = heroContent.getBoundingClientRect();
        const isInHeroContent =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        // Only create popups when mouse is over .hero_content
        if (!isInHeroContent) {
          return;
        }
      }

      // Check if we've moved enough distance to create a new popup
      const currentPosition = { x: event.pageX, y: event.pageY };

      if (lastPopupPosition === null) {
        // First popup - create it immediately
        createPopupAtPosition(currentPosition, heroContent, event);
        lastPopupPosition = currentPosition;
      } else {
        // Calculate distance from last popup
        const distance = Math.sqrt(
          Math.pow(currentPosition.x - lastPopupPosition.x, 2) +
            Math.pow(currentPosition.y - lastPopupPosition.y, 2)
        );

        if (distance >= minDistanceForPopup) {
          createPopupAtPosition(currentPosition, heroContent, event);
          lastPopupPosition = currentPosition;
        }
      }
    }

    // Add mouse move listener
    document.addEventListener("mousemove", handleMouseMove);

    // Clean up function
    function cleanup() {
      activePopups.forEach((img) => img.remove());
      activePopups = [];
    }
    // Clean up on page unload
    window.addEventListener("beforeunload", cleanup);
  });
};
