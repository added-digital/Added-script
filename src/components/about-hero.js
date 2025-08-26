exports.about_hero = () => {
  const columns = document.querySelectorAll(".about-hero_col");
  if (!columns.length) return;
  gsap.config({ force3D: true });

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
    col.innerHTML += col.innerHTML;
    const originalContentHeight = col.scrollHeight / 2;
    const speed = 20 + Math.random() * 5;
    col.parentElement.style.height = originalContentHeight + "px";

    // Make every other column go in the opposite direction
    const isReverse = i % 2 === 1;
    const startY = isReverse ? -originalContentHeight : 0;
    const endY = isReverse ? 0 : -originalContentHeight;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });
    tl.fromTo(
      col,
      { yPercent: isReverse ? -100 : 0 },
      { yPercent: isReverse ? 0 : -100, duration: speed }
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
