require("./components/nav").nav();
require("./components/footer").footer();
require("./reusables/pixelAnimation").initPixelAnimation();

const workCards = document.querySelectorAll(".work_card");

workCards.forEach((card) => {
  const workImg = card.querySelector(".work_image");
  const button = card.querySelector(".work_button-wrapper");

  gsap.timeline().fromTo(
    card,
    { opacity: 0, filter: "blur(10px)", y: 100 },
    {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 1,
      ease: "power2.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: card,
        start: "top 100%",
        end: "bottom 100%",
        toggleActions: "play none none none",
      },
    }
  );

  gsap.set(button, {
    opacity: 0,
    filter: "blur(10px)",
    x: 20,
  });

  if (workImg) {
    card.addEventListener("mouseenter", () => {
      gsap.to(workImg, {
        scale: 1.02,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.fromTo(
        button,
        {
          opacity: 0,
          filter: "blur(10px)",
          x: 20,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(workImg, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(button, {
        opacity: 0,
        filter: "blur(10px)",
        x: 20,
      });
    });
  }
});
