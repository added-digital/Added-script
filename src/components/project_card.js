exports.project_card = function () {
  // Skip card animations on mobile
  if (window.innerWidth <= 768) {
    return;
  }

  const leftTextEls = document.querySelectorAll(".side-text--left");
  const rightTextEls = document.querySelectorAll(".side-text--right");
  const textElsWrapper = document.querySelectorAll(".card_text-wrapper");

  const sideText = [
    { left: "Supernormal greens", right: "Website" },
    { left: "Falkenklev", right: "Website" },
    { left: "KLTK", right: "Booking system" },
    { left: "Jord", right: "Website" },
    { left: "Sylvera", right: "Website" },
  ];

  leftTextEls.forEach((el, i) => {
    el.textContent = sideText[i].left;
  });

  rightTextEls.forEach((el, i) => {
    el.textContent = sideText[i].right;
  });
  const cards = gsap.utils.toArray(
    ".card-flip_component .flip_list .flip_card"
  );
  const stConfig = {
    trigger: ".card-flip_component",
    start: "top center",
    end: "bottom bottom",
    scrub: true,
  };
  const heroOpacityConfig = {
    trigger: ".card-flip_component",
    start: "top 30%",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => {
      gsap.to(".section_hero", { opacity: 0, duration: 0.5 });
    },
    onLeaveBack: () => {
      gsap.to(".section_hero", { opacity: 1, duration: 0.5 });
    },
  };

  gsap.set(textElsWrapper, { opacity: 0, filter: "blur(10px)" });

  const textWrapperConfig = {
    trigger: ".card-flip_component",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => {
      gsap.to(".card_text-wrapper", {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.3,
      });
    },
    onLeaveBack: () => {
      gsap.to(".card_text-wrapper", {
        opacity: 0,
        filter: "blur(10px)",
      });
    },
  };

  const enterDuration = 1;
  const stackDuration = 0.5;
  const stagger = 0.75;
  const yStart = "120vh";
  const yStepVH = 2;
  const scaleStep = 0.04;

  // ────────────────────────────────────────────────────────
  // 4) TIMELINE #1: cardStackTl
  // ────────────────────────────────────────────────────────
  const cardStackTl = gsap.timeline({ scrollTrigger: stConfig });
  const textWrapperTl = gsap.timeline({ scrollTrigger: textWrapperConfig });
  const heroOpacityTl = gsap.timeline({ scrollTrigger: heroOpacityConfig });
  // initial positions
  gsap.set(cards, {
    y: yStart,
    scale: 1,
    zIndex: (i) => i + 1,
  });

  // bring in + restack each card
  cards.forEach((card, i) => {
    const label = `card${i + 1}`;
    const pos = i === 0 ? 0 : `card${i}+=${stagger}`;

    cardStackTl
      .addLabel(label, pos)
      // slide this card up
      .to(
        card,
        {
          y: 0,
          duration: enterDuration,
          ease: "power2.out",
        },
        label
      )
      // animate left and right text for this card, moving them up by 100% times i
      .to(
        leftTextEls[i],
        {
          y: `-${100 * i}%`,
          duration: 0.2,
          ease: "power2.out",
        },
        label + "+=0.3"
      )
      .to(
        rightTextEls[i],
        {
          y: `-${100 * i}%`,
          duration: 0.2,
          ease: "power2.out",
        },
        label + "+=0.3"
      )
      .to(
        rightTextEls[i - 1],
        {
          y: `-${100 * i + 1}%`,
          duration: 0.2,
          ease: "power2.out",
        },
        label + "+=0.3"
      )
      .to(
        leftTextEls[i - 1],
        {
          y: `-${100 * i + 1}%`,
          duration: 0.2,
          ease: "power2.out",
        },
        label + "+=0.3"
      );

    // shrink & lift all the ones under it
    if (i > 0) {
      cards.slice(0, i).forEach((underCard, j) => {
        const layer = i - j;
        cardStackTl.to(
          underCard,
          {
            scale: 1 - layer * scaleStep,
            y: `-${layer * yStepVH}vh`,
            duration: stackDuration,
            ease: "power1.out",
          },
          `${label}+=0.3`
        );
      });
      textWrapperTl.to(
        textElsWrapper[i],
        { opacity: 1, duration: 0.3 },
        `${label}+=0.3`
      );
    }
  });

  // ────────────────────────────────────────────────────────
  // 5) TIMELINE #2: textSwapTl
  // ────────────────────────────────────────────────────────
  // const textSwapTl = gsap.timeline({ scrollTrigger: stConfig });

  // cards.forEach((_, i) => {
  //   const label = `card${i + 1}`;
  //   const pos = i === 0 ? 0 : `card${i}+=${stagger}`;

  //   textSwapTl
  //     .addLabel(label, pos)
  //     // fire your scramble on both text blocks
  //     .add(() => {
  //       if (window.innerWidth > 768) {
  //         gsap.to(leftTextEl, {
  //           duration: 0.8,
  //           ease: "none",
  //           scrambleText: {
  //             text: sideText[i].left,
  //             chars: "lowerCase",
  //             speed: 0.3,
  //           },
  //         });
  //         gsap.to(rightTextEl, {
  //           duration: 0.8,
  //           ease: "none",
  //           scrambleText: {
  //             text: sideText[i].right,
  //             chars: "lowerCase",
  //             speed: 0.3,
  //           },
  //         });
  //       } else {
  //         // small‐screen fallback
  //         leftTextEl.textContent = sideText[i].left;
  //         rightTextEl.textContent = sideText[i].right;
  //       }
  //     }, `${label}+=0.1`);
  // });
};
