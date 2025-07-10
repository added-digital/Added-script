exports.service_scroll = function () {
  // Get text elements to animate
  const textElements = document.querySelectorAll("[data-scroll-text]");

  // Create split text instances
  textElements.forEach((text) => {
    // Make text visible (in case it was hidden)
    gsap.set(text, { visibility: "visible" });

    // Split into characters
    const split = new SplitText(text, {
      type: "chars, words",
      charsClass: "char",
    });

    // Create scroll-triggered animation
    document.fonts.ready.then(() => {
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: text,
          start: "top 90%", // Starts animation when element is 80% from top of viewport
          end: "top 40%",
          scrub: true, // Smooth animation that follows scroll position
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        rotateX: -90,
        filter: "blur(10px)",
        stagger: 0.02,
        ease: "power2.out",
        duration: 1,
      });
    });
  });
};

exports.service_headline = function () {
  const headline = document.querySelectorAll(".service_item-wrapper");

  headline.forEach((item, index) => {
    item.addEventListener("click", function () {
      // Remove active class from all service item wrappers
      headline.forEach((wrapper) => {
        wrapper.classList.remove("active");
      });

      // Add active class to the clicked item
      this.classList.add("active");

      // Get the corresponding text block and pill wrapper
      const textBlock = document.querySelector(
        `[data-service-text="${index}"]`
      );
      const pillWrapper = document.querySelector(
        `[data-service-pills="${index}"]`
      );
      const pills = pillWrapper
        ? pillWrapper.querySelectorAll(".service_pill")
        : [];

      // Hide all text blocks and pill wrappers first
      const allTextBlocks = document.querySelectorAll("[data-service-text]");
      const allPillWrappers = document.querySelectorAll("[data-service-pills]");

      // Hide all text blocks with display: none and reset opacity
      allTextBlocks.forEach((block) => {
        gsap.set(block, { display: "none", opacity: 0, y: -20 });
      });

      gsap.to(allPillWrappers, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.out",
      });

      if (textBlock) {
        // Set display to block first, then animate
        gsap.set(textBlock, { display: "block" });
        gsap.to(textBlock, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.2,
        });
      }

      gsap.to(pillWrapper, {
        opacity: 1,
      });

      gsap.from(pills, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        stagger: 0.2,
        ease: "expo.out",
        delay: 0.3,
      });
    });
  });
};
