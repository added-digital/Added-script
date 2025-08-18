exports.footer = function () {
  const { createLogoAnimation } = require("../reusables/logo");
  const footerLinks = document.querySelectorAll(".footer_link");
  const a = document.getElementById("a-footer");
  const d1 = document.getElementById("d1-footer");
  const d2 = document.getElementById("d2-footer");
  const e = document.getElementById("e-footer");
  const d3 = document.getElementById("d3-footer");

  const tl = gsap.timeline({ paused: true });

  const logoTl = createLogoAnimation(tl, a, d1, d2, e, d3);

  ScrollTrigger.create({
    trigger: ".footer",
    start: "top 80%",
    onEnter: () => tl.play(),
  });

  footerLinks.forEach((link) => {
    const textBlock = link.querySelector(".footer_link-text");
    if (!textBlock) return;

    // Set the nav_link height to the height of nav_link-text
    const textBlockHeight = textBlock.offsetHeight + "px";
    link.style.height = textBlockHeight;

    // Clone and insert as before
    const clone = textBlock.cloneNode(true);
    clone.classList.add("footer_link-text");
    textBlock.insertAdjacentElement("afterend", clone);
  });

  footerLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      const linkText = link.querySelectorAll(".footer_link-text");
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
