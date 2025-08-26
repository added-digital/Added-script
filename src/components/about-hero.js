exports.about_hero = () => {
  const columns = document.querySelectorAll(".about-hero_col");
  if (!columns.length) return;

  gsap.set(".about-hero_col", { visibility: "visible" });

  const timelines = [];

  gsap.from(
    columns,
    {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: {
        each: 0.1,
        from: "random",
      },
      ease: "power2.out",
    },
    "=+0.5"
  );

  columns.forEach((col, i) => {
    // Clone the content once so we have double content for continuous scroll
    const clone = col.cloneNode(true);
    col.appendChild(clone);

    const originalContentHeight = col.scrollHeight / 2;
    const speed = 20 + Math.random() * 5;

    col.parentElement.style.height = originalContentHeight + "px";

    // Alternate direction
    const direction = i % 2 === 1 ? -1 : 1;

    gsap.to(col, {
      y: direction * -originalContentHeight, // move one "content length"
      duration: speed,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: (y) => {
          const current = parseFloat(y);

          // Wrap properly in BOTH directions
          if (direction === 1) {
            return (
              ((current + originalContentHeight) % originalContentHeight) + "px"
            );
          } else {
            return (
              ((current - originalContentHeight) % -originalContentHeight) +
              "px"
            );
          }
        },
      },
    });
  });

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    timelines.forEach((tl) => tl.timeScale(1.5));
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      timelines.forEach((tl) => {
        gsap.to(tl, { timeScale: 1, duration: 1, ease: "power2.out" }); // 1s ease back
      });
    });
  });
};
