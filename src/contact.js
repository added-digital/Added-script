gsap.set(".contact_hero", { visibility: "visible" });

gsap.from(".contact_image", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power2.out",
});
