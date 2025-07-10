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
        opacity: 0,
        y: 20,
        rotateX: -90,
        filter: "blur(10px)",
        stagger: 0.02,
        ease: "power2.out",
        duration: 0.5,
      });
    });
  });
};

exports.service_headline = function () {
  const headline = document.querySelectorAll(".service_item-wrapper");

  const all_service_tab = document.querySelectorAll(".service_text-wrapper");
  gsap.set(all_service_tab, { display: "none" });

  // Set the first service tab to visible on initial load
  const firstTab = document.querySelector('[data-service-tab="0"]');
  if (firstTab) {
    gsap.set(firstTab, { display: "flex" });
  }

  // Set the first service item wrapper to active
  const firstHeadline = document.querySelector(".service_item-wrapper");
  if (firstHeadline) {
    firstHeadline.classList.add("active");
  }

  headline.forEach((item, index) => {
    item.addEventListener("click", function () {
      headline.forEach((wrapper) => {
        wrapper.classList.remove("active");
      });

      const service_tab = document.querySelector(
        `[data-service-tab="${index}"]`
      );

      const service_text = document.querySelector(
        `[data-service-text="${index}"]`
      );

      const service_pills = document.querySelector(
        `[data-service-pills="${index}"]`
      );
      const pills = service_pills
        ? service_pills.querySelectorAll(".service_pill")
        : [];

      // First, hide all tabs immediately
      all_service_tab.forEach((tab) => {
        gsap.set(tab, { display: "none" });
      });

      this.classList.add("active");

      // Then show and animate the selected tab
      if (service_tab) {
        gsap.set(service_tab, { display: "flex" });

        gsap.fromTo(service_text, { opacity: 0, y: -20 }, { opacity: 1, y: 0 });

        // Animate individual pills with stagger
        if (pills.length > 0) {
          gsap.fromTo(
            pills,
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              stagger: 0.2,
              ease: "back.out(1.7)",
            }
          );
        }
      }
    });
  });
};
