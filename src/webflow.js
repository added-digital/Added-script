require("./components/added_numbers").added_numbers();

gsap.set(".webflow_logo", { visibility: "visible" });

gsap.from(".webflow_logo", {
  opacity: 0,
  duration: 1,
  ease: "power2.inOut",
});

const workCards = document.querySelectorAll(".work_card");

// Handle individual card interactions
workCards.forEach((card) => {
  const workImg = card.querySelector(".work_image");
  const button = card.querySelector(".work_button-wrapper");

  // Set initial button state
  gsap.set(button, {
    opacity: 0,
    filter: "blur(10px)",
    x: 20,
  });

  if (workImg) {
    card.addEventListener("mouseenter", () => {
      // Kill any existing animations on this card
      gsap.killTweensOf(workImg);
      gsap.killTweensOf(button);

      gsap.to(workImg, {
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(button, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      // Kill any existing animations on this card
      gsap.killTweensOf(workImg);
      gsap.killTweensOf(button);

      gsap.to(workImg, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(button, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }
});

// Image swapping function
function createImageSwapper(containerSelector, imageArray, options = {}) {
  const {
    interval = 3000, // 3 seconds default
    transitionDuration = 0.8,
    fadeInDuration = 0.6,
    fadeOutDuration = 0.4,
    autoStart = true,
  } = options;

  const container = document.querySelector(containerSelector);
  if (!container) {
    console.warn(`Image swapper: Container "${containerSelector}" not found`);
    return null;
  }

  if (!imageArray || imageArray.length === 0) {
    console.warn("Image swapper: No images provided");
    return null;
  }

  let currentIndex = 0;
  let isTransitioning = false;
  let intervalId = null;

  // Create image elements
  const images = imageArray.map((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = index === 0 ? "1" : "0";
    img.style.transition = `opacity ${fadeInDuration}s ease-in-out`;
    container.appendChild(img);
    return img;
  });

  // Set container position relative for absolute positioning
  container.style.position = "relative";
  container.style.overflow = "hidden";

  function showNextImage() {
    if (isTransitioning || images.length <= 1) return;

    isTransitioning = true;
    const currentImg = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
    const nextImg = images[currentIndex];

    // Fade out current image
    gsap.to(currentImg, {
      opacity: 0,
      duration: fadeOutDuration,
      ease: "power2.inOut",
      onComplete: () => {
        // Fade in next image
        gsap.to(nextImg, {
          opacity: 1,
          duration: fadeInDuration,
          ease: "power2.inOut",
          onComplete: () => {
            isTransitioning = false;
          },
        });
      },
    });
  }

  function start() {
    if (intervalId) return;
    intervalId = setInterval(showNextImage, interval);
  }

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function destroy() {
    stop();
    images.forEach((img) => img.remove());
  }

  // Auto start if enabled
  if (autoStart) {
    start();
  }

  return {
    start,
    stop,
    destroy,
    showNext: showNextImage,
    getCurrentIndex: () => currentIndex,
    setInterval: (newInterval) => {
      interval = newInterval;
      if (intervalId) {
        stop();
        start();
      }
    },
  };
}


const imageSwapper = createImageSwapper('.webflow_col-image-gallery', [
  "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68bad029f4a6239d1c0afa7c_Frame%202085652806.webp",
  "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68bad0de8d51f3af443797c6_Frame%202085652805.webp",
  "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1be77ead03987c7edd089_Frame%202085652806%20(1).png"
], {
  interval: 4000, // 4 seconds
  transitionDuration: 1.0,
  autoStart: true
});

