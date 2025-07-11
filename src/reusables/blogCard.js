exports.blogCard = function () {
  const blogCards = document.querySelectorAll(".blog_img-wrapper");

  blogCards.forEach((card) => {
    const blogImg = card.querySelector(".blog_img");
    const button = card.querySelector(".blog_button-wrapper");

    gsap.set(button, {
      opacity: 0,
      filter: "blur(10px)",
      x: 20,
    });

    if (blogImg) {
      card.addEventListener("mouseenter", () => {
        gsap.to(blogImg, {
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
        gsap.to(blogImg, {
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
    console.log(blogImg);
  });
};
