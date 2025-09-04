// // GSAP Mouse-Following Image Animation
// // This script creates zones across the screen width and animates images based on mouse position

// // Wait for DOM to be ready
// document.addEventListener("DOMContentLoaded", function () {
//   // Get all hero images
//   const heroImages = document.querySelectorAll(".hero_image");

//   if (heroImages.length === 0) {
//     console.warn("No images with class .hero_image found");
//     return;
//   }

//   const imageCount = heroImages.length;
//   const screenWidth = window.innerWidth;
//   const zoneWidth = screenWidth / imageCount;

//   console.log(
//     `Found ${imageCount} images, creating ${imageCount} zones of ${zoneWidth}px each`
//   );

//   // Set initial state - first image visible, others hidden
//   gsap.set(heroImages, {
//     opacity: 0,
//     scale: 1.1,
//     zIndex: 1,
//   });

//   // Show first image initially
//   gsap.set(heroImages[0], {
//     opacity: 1,
//     scale: 1,
//     zIndex: 10,
//   });

//   // Track current active image
//   let currentActiveIndex = 0;

//   // Mouse move handler
//   function handleMouseMove(event) {
//     const mouseX = event.clientX;
//     const zoneIndex = Math.floor(mouseX / zoneWidth);

//     // Clamp zone index to valid range
//     const clampedIndex = Math.max(0, Math.min(zoneIndex, imageCount - 1));

//     // Only animate if we're in a different zone
//     if (clampedIndex !== currentActiveIndex) {
//       animateToImage(clampedIndex);
//       currentActiveIndex = clampedIndex;
//     }
//   }

//   // Animate to specific image
//   function animateToImage(imageIndex) {
//     // Hide all images
//     gsap.to(heroImages, {
//       opacity: 0,
//       duration: 0.6,
//       ease: "power2.out",
//       zIndex: 1,
//     });

//     // Show target image
//     gsap.to(heroImages[imageIndex], {
//       opacity: 1,
//       duration: 0.6,
//       ease: "power2.out",
//       zIndex: 10,
//     });

//     console.log(`Switching to image ${imageIndex + 1}`);
//   }

//   // Add mouse move listener
//   document.addEventListener("mousemove", handleMouseMove);

//   // Handle window resize
//   window.addEventListener("resize", function () {
//     const newScreenWidth = window.innerWidth;
//     const newZoneWidth = newScreenWidth / imageCount;
//     console.log(`Resized: new zone width is ${newZoneWidth}px`);
//   });

//   // Optional: Add touch support for mobile
//   let touchStartX = 0;

//   document.addEventListener("touchstart", function (event) {
//     touchStartX = event.touches[0].clientX;
//   });

//   document.addEventListener("touchmove", function (event) {
//     event.preventDefault();
//     const touchX = event.touches[0].clientX;
//     const zoneIndex = Math.floor(touchX / zoneWidth);
//     const clampedIndex = Math.max(0, Math.min(zoneIndex, imageCount - 1));

//     if (clampedIndex !== currentActiveIndex) {
//       animateToImage(clampedIndex);
//       currentActiveIndex = clampedIndex;
//     }
//   });

//   // Optional: Add keyboard support (left/right arrows)
//   document.addEventListener("keydown", function (event) {
//     if (event.key === "ArrowLeft") {
//       const newIndex = Math.max(0, currentActiveIndex - 1);
//       if (newIndex !== currentActiveIndex) {
//         animateToImage(newIndex);
//         currentActiveIndex = newIndex;
//       }
//     } else if (event.key === "ArrowRight") {
//       const newIndex = Math.min(imageCount - 1, currentActiveIndex + 1);
//       if (newIndex !== currentActiveIndex) {
//         animateToImage(newIndex);
//         currentActiveIndex = newIndex;
//       }
//     }
//   });

//   console.log("GSAP Mouse-Following Image Animation initialized successfully!");
//   console.log(
//     `Move your mouse horizontally to see ${imageCount} images animate`
//   );
// });

// // Optional: Add some CSS styles if needed
// const style = document.createElement("style");
// style.textContent = `
//     .hero_image {
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: none; /* Disable CSS transitions to let GSAP handle animations */
//     }

//     /* Container for the images should have position: relative */
//     .hero-container {
//         position: relative;
//         width: 100%;
//         height: 100vh; /* Adjust height as needed */
//         overflow: hidden;
//     }
// `;
// document.head.appendChild(style);

// Mouse Popup Image Animation
// This function creates floating images that popup at mouse position and drop down after 1 second

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
      "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/68a5dfa1ca7cca58ab00055a_Frame%202085652806.png",
      "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689da82f0e84fa0499c07d6e_sng-mobile.webp",
      "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689ee38a6398240df4809a40_Frame%202085652806.png",
      "https://cdn.prod.website-files.com/686b91f995e69a47237c9a51/689c7f2688e0c2945c288801_Frame%202085653079.png",
    ],
    popupDuration: 3, // seconds - shorter duration for cleaner look
    imageSize: 200, // size of popup images - slightly smaller for better performance
    popupDistance: 10, // distance from mouse cursor - very close to mouse for accurate following
  };

  let activePopups = [];
  let lastPopupPosition = null;
  let minDistanceForPopup = 200; // minimum pixels to move before creating next popup
  let currentImageIndex = 0; // track the current image index for sequential order

  // Create popup image element
  function createPopupImage() {
    const img = document.createElement("img");
    img.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 10;
      border-radius: 8px;
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
      scale: 0,
      opacity: 0,
      rotate: 10,
      x: 50,
    });

    // Popup animation - make it fully visible
    gsap.to(img, {
      scale: 1,
      opacity: 1,
      rotate: 0,
      x: 0,
      duration: 1,
      ease: "expo.out",
    });

    // Drop down animation after delay
    gsap.to(img, {
      y: "+=80",
      opacity: 0,
      scale: 0.7,
      duration: 0.6,
      delay: config.popupDuration,
      ease: "power2.in",
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
