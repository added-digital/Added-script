gsap.set(".work_card", { visibility: "visible" });

const workCards = document.querySelectorAll(".work_card");

// Single timeline for all cards - much more efficient
gsap.timeline().fromTo(
  workCards,
  {
    opacity: 0,
    y: 100,
  },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.05,
    scrollTrigger: {
      trigger: ".work_card", // Single trigger for all cards
      start: "top 90%",
      end: "bottom 10%",
      toggleActions: "play none none reverse",
    },
  }
);

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
