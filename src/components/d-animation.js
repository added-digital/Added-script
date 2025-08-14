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

  const drawTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section_draw-rail",
      start: "top 40%",
      end: "bottom 70%",
      scrub: 1,
    },
  });

  drawTl
    .to(
      ".navbar",
      {
        y: -100,
        ease: "power1.in",
      },
      "<"
    )
    .from(columns, {
      opacity: 0,
      yPercent: (index) => (index % 2 === 0 ? -100 : 100),
      ease: "power1.inOut",
      stagger: {
        each: 0.1,
        from: "random",
      },
    })
    .to(
      drawSvgPaths,
      {
        strokeDashoffset: 0,
        duration: 0.6,
        ease: "power1.inOut",
        stagger: 0.3,
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
      duration: 1,
    })
    .from(
      ".section_clients",
      {
        opacity: 0,
        duration: 0.4,
      },
      "-=0.6"
    )
    .from(
      selected_client_header.chars,
      {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.01,
        rotateX: -90,
        filter: "blur(10px)",
        ease: "power1.inOut",
      },
      "-=1.2"
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
