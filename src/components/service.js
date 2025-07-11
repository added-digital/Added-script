exports.service_scroll = function () {
  // Get text elements to animate
  const textElements = document.querySelectorAll("[data-scroll-text]");
  const service_headline = document.querySelectorAll(".service_item-wrapper");

  // Create split text instances
  textElements.forEach((text) => {
    // Make text visible (in case it was hidden)
    gsap.set(text, { visibility: "visible" });

    // Split into characters
    const headline_split = new SplitText(text, {
      type: "chars, words",
      charsClass: "char",
    });

    const service_headline_split = new SplitText(service_headline, {
      type: "lines",
      charsClass: "char",
      wordsClass: "word",
      linesClass: "line",
    });
    document.fonts.ready.then(() => {
      gsap.from(service_headline_split.lines, {
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        filter: "blur(10px)",
        stagger: 0.1,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    // Create scroll-triggered animation
    document.fonts.ready.then(() => {
      gsap.from(headline_split.chars, {
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 20,
        rotateX: -90,
        filter: "blur(10px)",
        stagger: 0.01,
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

      const service_text_split = new SplitText(service_text, {
        type: "words",
        wordsClass: "word",
      });

      const pills = service_pills
        ? service_pills.querySelectorAll("[data-service-explainer]")
        : [];

      const pillLines = service_pills
        ? service_pills.querySelectorAll(".service_pill-line")
        : [];

      all_service_tab.forEach((tab) => {
        gsap.set(tab, { display: "none" });
      });

      this.classList.add("active");

      if (service_tab) {
        gsap.set(service_tab, { display: "flex" });

        gsap.fromTo(
          service_text_split.words,
          { opacity: 0, y: 20, filter: "blur(10px)" },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.01,
            filter: "blur(0px)",
            ease: "power2.out",
          }
        );

        if (pills.length > 0) {
          gsap.fromTo(
            pills,
            { opacity: 0, y: 30, filter: "blur(10px)" },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.5,
              stagger: 0.1,
              ease: "expo.out",
              delay: 0.2,
            }
          );
        }

        if (pillLines.length > 0) {
          gsap.fromTo(
            pillLines,
            { width: 0 },
            {
              opacity: 1,
              width: "100%",
              duration: 1,
              stagger: 0.1,
              ease: "expo.out",
              delay: 0.2,
            }
          );
        }
      }
    });
  });
};
