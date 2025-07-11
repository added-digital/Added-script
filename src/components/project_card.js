exports.project_card = function () {
  const leftTextEl = document.querySelector(".side-text--left");
  const rightTextEl = document.querySelector(".side-text--right");

  const sideText = [
    { left: "Supernormal greens", right: "Website" },
    { left: "Cur8", right: "Sales portal" },
    { left: "Stureplans Resor", right: "Website" },
    { left: "Jord", right: "Website" },
    { left: "Sylvera", right: "Website" },
  ];

  const cards = gsap.utils.toArray(
    ".card-flip_component .flip_list .flip_card"
  );

  const stConfig = {
    trigger: ".card-flip_component",
    start: "top center",
    end: "bottom bottom",
    scrub: true,
    onEnter: () => gsap.to(".section_hero", { opacity: 0, duration: 0.5 }),
    onLeaveBack: () => gsap.to(".section_hero", { opacity: 1, duration: 0.5 }),
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
    }
  });

  // ────────────────────────────────────────────────────────
  // 5) TIMELINE #2: textSwapTl
  // ────────────────────────────────────────────────────────
  const textSwapTl = gsap.timeline({ scrollTrigger: stConfig });

  cards.forEach((_, i) => {
    const label = `card${i + 1}`;
    const pos = i === 0 ? 0 : `card${i}+=${stagger}`;

    textSwapTl
      .addLabel(label, pos)
      // fire your scramble on both text blocks
      .add(() => {
        if (window.innerWidth > 768) {
          gsap.to(leftTextEl, {
            duration: 0.8,
            ease: "none",
            scrambleText: {
              text: sideText[i].left,
              chars: "lowerCase",
              speed: 0.3,
            },
          });
          gsap.to(rightTextEl, {
            duration: 0.8,
            ease: "none",
            scrambleText: {
              text: sideText[i].right,
              chars: "lowerCase",
              speed: 0.3,
            },
          });
        } else {
          // small‐screen fallback
          leftTextEl.textContent = sideText[i].left;
          rightTextEl.textContent = sideText[i].right;
        }
      }, `${label}+=0.1`);
  });
};
