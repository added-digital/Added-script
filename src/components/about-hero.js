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
    const children = Array.from(col.childNodes);
    children.forEach((child) => {
      col.appendChild(child.cloneNode(true));
      col.appendChild(child.cloneNode(true));
    });

    const originalContentHeight = col.scrollHeight / 2;
    const speed = 40 + Math.random() * 5;
    col.parentElement.style.height = originalContentHeight + "px";

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
