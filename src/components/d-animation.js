exports.d_animation = function () {
  gsap.registerPlugin(ScrollTrigger);

  const columns = gsap.utils.toArray(".draw_col");
  const drawSvgPaths = gsap.utils.toArray("#path");

  const selected_client_header = SplitText.create("#selected-client-header", {
    type: "chars, words",
    charsClass: "char",
    wordsClass: "word",
  });

  gsap.set("#path", { scale: 1 });
  gsap.set("#nav_transition", { opacity: 0 });

  drawSvgPaths.forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  // Responsive configuration
  const isMobile = window.innerWidth <= 768;

  const scrollTriggerConfig = isMobile
    ? {
        trigger: ".section_draw-rail",
        start: "top bottom", // Start later on mobile
        end: "bottom 50%", // End earlier on mobile
        scrub: 0.5, // Faster scrub on mobile
      }
    : {
        trigger: ".section_draw-rail",
        start: "top 40%",
        end: "bottom 70%",
        scrub: 1,
      };

  const drawTl = gsap.timeline({
    scrollTrigger: scrollTriggerConfig,
  });

  drawTl
    .to(
      ".navbar",
      {
        yPercent: -100,
        ease: "power1.in",
      },
      "<"
    )
    .from(columns, {
      opacity: 0,
      yPercent: isMobile ? 50 : (index) => (index % 2 === 0 ? -100 : 100), // Smaller movement on mobile
      ease: "power1.inOut",
      stagger: {
        each: isMobile ? 0.05 : 0.1, // Faster stagger on mobile
        from: "random",
      },
    })
    .to(
      drawSvgPaths,
      {
        strokeDashoffset: 0,
        duration: isMobile ? 0.4 : 0.6, // Faster on mobile
        ease: "power1.inOut",
        stagger: isMobile ? 0.15 : 0.3, // Faster stagger on mobile
      },
      ">"
    )
    .to(
      ".draw_image:not(.draw)",
      {
        opacity: 0,
      },
      "<"
    )
    .to(drawSvgPaths, {
      color: "white",
      duration: 0.6,
      ease: "power1.inOut",
    })
    .to(drawSvgPaths, {
      transformOrigin: "50% 50%",

      scale: () => {
        const path = drawSvgPaths[0];
        if (!path) return 1;

        const pathRect = path.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        const scaleX = viewportWidth / pathRect.width;
        const scaleY = viewportHeight / pathRect.height;

        return Math.max(scaleX, scaleY);
      },

      ease: "expo.inOut",
      duration: isMobile ? 0.6 : 1, // Faster on mobile
    })
    .from(
      ".section_clients",
      {
        opacity: 0,
        duration: 0.4,
      },
      isMobile ? "-=0.6" : "-=1.2"
    )
    .from(
      selected_client_header.chars,
      {
        duration: isMobile ? 0.3 : 0.5, // Faster on mobile
        opacity: 0,
        y: isMobile ? 10 : 20, // Smaller movement on mobile
        stagger: isMobile ? 0.005 : 0.01, // Faster stagger on mobile
        rotateX: isMobile ? -45 : -90, // Less rotation on mobile
        filter: "blur(10px)",
        ease: "power1.inOut",
      },
      isMobile ? "-=0.8" : "-=1.2" // Adjust timing for mobile
    )
    .to("body", {
      className: "light-mode",
      onReverseComplete: function () {
        document.body.className = "";
      },
    })
    .set("#path", {
      display: "none",
      duration: 0,
    })
    .to(".navbar", {
      y: 0,
      ease: "power1.out",
    });
};
