require("./components/added_numbers").added_numbers();

gsap.set(".section_campaign-hero", {
  visibility: "visible",
});

gsap.set(".section_logo-slider", {
  visibility: "visible",
});

// Split Text Hover Animation for Submit Buttons
function initSubmitButtonHoverAnimation() {
  // Find all submit buttons (both input[type="submit"] and button[type="submit"])
  const submitButtons = document.querySelectorAll(
    'input[type="submit"], button[type="submit"], .submit-button, [data-submit-button]'
  );

  submitButtons.forEach((button) => {

    // Store original text content
    const originalText = button.textContent;

    // Create split text for the button
    const splitText = SplitText.create(button, {
      type: "chars",
      charsClass: "char",
    });

    // Set initial state for characters with perspective
    gsap.set(splitText.chars, {
      y: 0,
      rotationX: 0,
      transformOrigin: "50% 50% -30px",
      display: "inline-block",
    });

    // Ensure button has perspective for 3D transforms
    gsap.set(button, {
      perspective: 1000,
    });

    // Create hover timeline
    const hoverTl = gsap.timeline({ paused: true });

    // Hover in animation - characters flip up and forward
    hoverTl.to(splitText.chars, {
      y: -8,
      rotationX: -90,
      duration: 0.5,
      stagger: 0.03,
      ease: "back.out(1.4)",
    });

    // Hover out animation (reverse)
    const hoverOutTl = gsap.timeline({ paused: true });
    hoverOutTl.to(splitText.chars, {
      y: 0,
      rotationX: 0,
      duration: 0.4,
      stagger: 0.01,
      ease: "power2.out",
    });

    // Add event listeners with proper cleanup
    let isHovered = false;

    button.addEventListener("mouseenter", () => {
      if (isHovered) return;
      isHovered = true;
      hoverOutTl.kill();
      hoverTl.restart();
    });

    button.addEventListener("mouseleave", () => {
      if (!isHovered) return;
      isHovered = false;
      hoverTl.kill();
      hoverOutTl.restart();
    });

    // Click animation with feedback
    button.addEventListener("click", (e) => {
      // Prevent default if it's a submit button to show animation first
      if (button.type === "submit") {
        e.preventDefault();

        // Play click animation
        gsap.to(splitText.chars, {
          scale: 0.8,
          duration: 0.1,
          stagger: 0.01,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
          onComplete: () => {
            // Submit the form after animation
            if (button.form) {
              button.form.submit();
            }
          },
        });
      } else {
        // For non-submit buttons, just play the animation
        gsap.to(splitText.chars, {
          scale: 0.9,
          duration: 0.1,
          stagger: 0.01,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        });
      }
    });
  });
}

// Initialize submit button animations
document.addEventListener("DOMContentLoaded", initSubmitButtonHoverAnimation);

// Also initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSubmitButtonHoverAnimation);
} else {
  initSubmitButtonHoverAnimation();
}
