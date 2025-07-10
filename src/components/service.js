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
  const rail = document.querySelector(".services_rail");
  const headlines = document.querySelectorAll("[data-service-headline]");
  const explainers = document.querySelectorAll("[data-service-explainer]");
  if (!rail || headlines.length === 0 || explainers.length !== headlines.length)
    return;

  // Hide all headlines and explainers initially
  headlines.forEach((h) =>
    gsap.set(h, {
      autoAlpha: 0,
      y: 100,
      position: "absolute",
    })
  );
  explainers.forEach((e) =>
    gsap.set(e, {
      autoAlpha: 0,
    })
  );

  // Reveal each headline, animate out the previous one, and scramble explainer
  headlines.forEach((headline, i) => {
    const progress = [0, 0.3, 0.6][i]; // 0%, 30%, 60%
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: rail,
        start: () => `top+=${progress * rail.offsetHeight} center`,
        end: () => `top+=${(progress + 0.1) * rail.offsetHeight} center`,
        scrub: true,
        toggleActions: "play reverse play reverse",
      },
    });

    // Animate previous headline out
    if (i > 0) {
      tl.to(
        headlines[i - 1],
        {
          autoAlpha: 0,
          y: -100,
          duration: 1,
          ease: "power2.inout",
        },
        0
      );
      tl.to(
        explainers[i - 1],
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power2.inout",
        },
        0
      );
    }

    // Animate current headline in
    tl.to(
      headline,
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.inout",
      },
      0
    );

    // Scramble in the explainer text
    tl.to(
      explainers[i],
      {
        autoAlpha: 1,
        duration: 2,
        ease: "power2.inout",
        scrambleText: {
          text: explainers[i].dataset.scrambleText || explainers[i].textContent,
          chars: "lowerCase",
          speed: 0.3,
        },
      },
      0.2 // Slightly after headline animates in
    );
  });
};
