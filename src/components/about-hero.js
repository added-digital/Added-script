exports.about_hero = () => {
  const columns = document.querySelectorAll(".about-hero_col");
  if (!columns.length) return;

  const timelines = [];

  gsap.from(columns, {
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: {
      each: 0.1,
      from: "random",
    },
  });

  columns.forEach((col, i) => {
    col.innerHTML += col.innerHTML;
    const originalContentHeight = col.scrollHeight / 2;
    const speed = 20 + Math.random() * 20;
    col.parentElement.style.height = originalContentHeight + "px";

    // Make every other column go in the opposite direction
    const isReverse = i % 2 === 1;
    const startY = isReverse ? -originalContentHeight : 0;
    const endY = isReverse ? 0 : -originalContentHeight;

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
