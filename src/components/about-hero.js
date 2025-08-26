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
    // ✅ Clone the whole content instead of rewriting innerHTML
    const clone = col.cloneNode(true);
    col.appendChild(clone);

    // Now col has its content twice
    const originalContentHeight = col.scrollHeight / 2;
    const speed = 20 + Math.random() * 5;
    col.parentElement.style.height = originalContentHeight + "px";

    // Alternate direction
    const isReverse = i % 2 === 1;
    const startY = isReverse ? -originalContentHeight : 0;
    const endY = isReverse ? 0 : -originalContentHeight;

    // ✅ Same GSAP timeline logic
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.fromTo(
      col,
      { y: startY },
      {
        y: endY,
        duration: speed,
      }
    );

    timelines.push(tl);
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
