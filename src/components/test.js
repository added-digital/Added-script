exports.hero_images = function () {
  if (window.innerWidth <= 992) {
    return;
  }

  // Fisher-Yates shuffle algorithm
  function shuffleArray(array) {
    const shuffled = [...array]; // Create a copy to avoid mutating original
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Pre-fetch images function
  function prefetchImages(imageUrls, onProgress = null) {
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    return Promise.all(
      imageUrls.map((url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();

          img.onload = () => {
            loadedCount++;
            if (onProgress) {
              onProgress(loadedCount, totalImages);
            }
            resolve(img);
          };

          img.onerror = () => {
            console.warn(`Failed to pre-fetch image: ${url}`);
            loadedCount++;
            if (onProgress) {
              onProgress(loadedCount, totalImages);
            }
            resolve(null); // Resolve with null instead of rejecting to continue with other images
          };

          // Start loading the image
          img.src = url;
        });
      })
    );
  }

  const originalImageUrls = [
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68addf9ac0b85a34bcbbbf74_jk.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1bb0397725e31b0caafb9_Frame%202085652805.webp",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1b9e995edcb7ce5fbe30c_Frame%202085652806.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1ba3aec80b080309e8770_gt.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68a5e1d85c470f8c5e5d7191_sykvera.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1bb751c894092087eb825_Frame%202085652806.webp",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1bd918111102cc3db9e55_Frame%202085653009.webp",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1c07cf89470e62c236a05_Frame%202085652806.webp",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1be77ead03987c7edd089_Frame%202085652806%20(1).png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68b1b97f0deb484edccd2aa5_ad.svg",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68af03682513615830b20fd3_aaa.webp",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68adde24aa0c876444378a1a_daw.png",
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
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68addc8ebcf31bc78794c786_awd.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689c7f2688e0c2945c288801_Frame%202085653079.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689ef3680efc4d3ce65b6994_Falkenklev.webp",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689eee301b72c4094bb29a0e_Sylvera.avif",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689ef1cecaa6e4cf51a6735f_Tentipi.avif",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689f12579883837f2e7b295b_DRAKKE.png",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689de754606102f4c9378570_KLTK.avif",
    "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68adde24c49914a5063853e2_vc.png",
  ];

  const config = {
    imageUrls: shuffleArray(originalImageUrls), // Shuffle the array
    popupDuration: 1, // seconds - shorter duration for cleaner look
    heightImageSize: 200,
    widthImageSize: 200,
    popupDistance: 10,
  };

  let activePopups = [];
  let lastPopupPosition = null;
  let minDistanceForPopup = 300; // minimum pixels to move before creating next popup
  let currentImageIndex = 0; // track the current image index for sequential order
  let imagesPrefetched = false; // track if images have been pre-fetched

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
    img.style.maxWidth = config.widthImageSize + "px";
    img.style.maxHeight = config.heightImageSize + "px";
    img.style.width = "auto";
    img.style.height = "auto";

    // Add error handling for image loading
    img.onerror = () => console.error("Failed to load image:", imageUrl);
    img.onload = () => {
      const ratio = img.naturalWidth / img.naturalHeight;
      if (ratio > 1) {
        img.style.maxWidth = config.widthImageSize * 1.2 + "px";
        img.style.maxHeight = config.heightImageSize + "px";
      } else {
        img.style.maxWidth = config.widthImageSize + "px";
        img.style.maxHeight = config.heightImageSize * 1.2 + "px";
      }
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
    const posX = mouseX + offsetX - config.widthImageSize / 2;
    const posY = mouseY + offsetY - config.heightImageSize / 2;

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
    let rect = null;
    if (!heroContent) {
      // Fallback: check if we're anywhere on the page
      const isInHeroContent = true;
    } else {
      // Check if mouse is within .hero_content bounds using viewport coordinates
      rect = heroContent.getBoundingClientRect();
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
    const currentPosition = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

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

  // Initialize pre-fetching of images
  console.log("Starting to pre-fetch hero images...");
  // prefetchImages(config.imageUrls, (loaded, total) => {
  //   const percentage = Math.round((loaded / total) * 100);
  //   console.log(`Pre-fetching progress: ${loaded}/${total} (${percentage}%)`);

  //   if (loaded === total) {
  //     imagesPrefetched = true;
  //     console.log("All hero images pre-fetched successfully!");
  //   }
  // }).catch((error) => {
  //   console.error("Error during image pre-fetching:", error);
  // });
};
