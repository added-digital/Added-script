require("./components/added_numbers").added_numbers();

gsap.set(".section_campaign-hero", {
  visibility: "visible",
});

gsap.set(".section_logo-slider", {
  visibility: "visible",
});

// Simple Hover Animation with Split Text
function initSimpleHoverAnimation() {
  // Find elements with data-hover-animation attribute
  const hoverElements = document.querySelectorAll("[data-hover-animation]");

  hoverElements.forEach((originalElement) => {
    // Debug: Log element details
    console.log("Element:", originalElement);
    console.log("Text content:", originalElement.textContent);
    console.log("Inner HTML:", originalElement.innerHTML);
    console.log("Element type:", originalElement.tagName);

    let element = originalElement;
    let textToAnimate = originalElement.textContent.trim();

    // Handle input[type="submit"] buttons specially
    if (
      originalElement.tagName === "INPUT" &&
      originalElement.type === "submit"
    ) {
      textToAnimate =
        originalElement.value || originalElement.textContent.trim();

      if (textToAnimate) {
        // Hide the original input text and create a visible span
        originalElement.style.color = "transparent";
        originalElement.style.textShadow = "none";

        // Create a wrapper span for the visible text
        const wrapper = document.createElement("span");
        wrapper.textContent = textToAnimate;
        wrapper.style.position = "absolute";
        wrapper.style.top = "50%";
        wrapper.style.left = "50%";
        wrapper.style.transform = "translate(-50%, -50%)";
        wrapper.style.pointerEvents = "none";
        wrapper.style.color = "inherit";
        wrapper.style.fontSize = "inherit";
        wrapper.style.fontFamily = "inherit";
        wrapper.style.fontWeight = "inherit";

        // Make the input button positioned relative
        originalElement.style.position = "relative";
        originalElement.appendChild(wrapper);

        element = wrapper; // Use the wrapper for animation
      }
    }

    // Skip if no text content
    if (!textToAnimate) {
      console.warn("Element has no text content for split animation");
      console.warn("Element details:", {
        tagName: originalElement.tagName,
        innerHTML: originalElement.innerHTML,
        textContent: originalElement.textContent,
        value: originalElement.value || "no value attribute",
      });
      return;
    }

    // Create split text
    const splitText = SplitText.create(element, {
      type: "chars",
      charsClass: "char",
    });

    // Set initial state
    gsap.set(splitText.chars, {
      y: 0,
      opacity: 1,
    });

    // Hover in animation
    originalElement.addEventListener("mouseenter", () => {
      gsap.to(splitText.chars, {
        y: -10,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
      });
      console.log("mouseenter");
    });

    // Hover out animation
    originalElement.addEventListener("mouseleave", () => {
      gsap.to(splitText.chars, {
        y: 0,
        duration: 0.3,
        stagger: 0.01,
        ease: "power2.out",
      });
      console.log("mouseleave");
    });
  });
}

// Initialize hover animations
document.addEventListener("DOMContentLoaded", initSimpleHoverAnimation);

// Also initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSimpleHoverAnimation);
} else {
  initSimpleHoverAnimation();
}
