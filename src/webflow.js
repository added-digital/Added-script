require("./components/added_numbers").added_numbers();

gsap.set(".hero-section", { visibility: "visible" });
const heroImageReveal = document.querySelector(".image_reveal");
const heroText = document.querySelector("[hero-text]");

gsap.from(heroImageReveal, {
  width: "100%",
  duration: 1,
  delay: 0.2,
  ease: "power2.inOut",
});

const workCards = document.querySelectorAll(".work_card");

// Handle individual card interactions
workCards.forEach((card) => {
  const workImg = card.querySelector(".work_image");
  const button = card.querySelector(".work_button-wrapper");

  // Set initial button state
  gsap.set(button, {
    opacity: 0,
    filter: "blur(10px)",
    x: 20,
  });

  if (workImg) {
    card.addEventListener("mouseenter", () => {
      // Kill any existing animations on this card
      gsap.killTweensOf(workImg);
      gsap.killTweensOf(button);

      gsap.to(workImg, {
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(button, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", () => {
      // Kill any existing animations on this card
      gsap.killTweensOf(workImg);
      gsap.killTweensOf(button);

      gsap.to(workImg, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(button, {
        opacity: 0,
        x: 20,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  }
});
