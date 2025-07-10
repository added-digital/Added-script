exports.nav = function () {
  const navLinks = document.querySelectorAll(".nav_link");

  navLinks.forEach((link) => {
    const textBlock = link.querySelector(".nav_link-text");
    if (!textBlock) return;

    // Set the nav_link height to the height of nav_link-text
    const textBlockHeight = textBlock.offsetHeight + "px";
    link.style.height = textBlockHeight;

    // Clone and insert as before
    const clone = textBlock.cloneNode(true);
    clone.classList.add("nav_link-text");
    textBlock.insertAdjacentElement("afterend", clone);
  });

  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const linkText = link.querySelectorAll(".nav_link-text");
      const tl = gsap.timeline();
      tl.to(linkText, {
        y: "-100%",
        duration: 0.5,
        ease: "expo.out",
      }).to(linkText, {
        y: "0%",
        duration: 0,
        ease: "power2.out",
      });
    });
  });
};
