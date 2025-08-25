exports.nav = function () {
  const navLinks = document.querySelectorAll(".nav_link");
  if (window.innerWidth > 992) {
    navLinks.forEach((link) => {
      const textBlock = link.querySelector(".nav_link-text");
      if (!textBlock) return;

      const textBlockHeight = textBlock.offsetHeight + "px";
      link.style.height = textBlockHeight;

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
  }

  const hamburgerButton = document.querySelector(".hamburger_button");
  const navLinksWrapper = document.querySelector(".nav_links-wrapper");
  const hamburgerText = document.querySelectorAll(".hamburger_link-text");

  if (hamburgerButton && navLinksWrapper) {
    let isMenuOpen = false;

    hamburgerButton.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;

      if (isMenuOpen) {
        // Open menu
        navLinksWrapper.style.display = "flex";

        // Fade in the wrapper first
        gsap.to(navLinksWrapper, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });

        // Fade in each link with stagger
        gsap.fromTo(
          navLinks,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            delay: 0.2, // Start after wrapper fade
          }
        );

        gsap.to(hamburgerText, {
          y: "-100%",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Close menu
        // Fade out each link first
        gsap.to(navLinks, {
          opacity: 0,
          y: -20,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });

        // Then fade out the wrapper
        gsap.to(navLinksWrapper, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          delay: 0.2, // Start after links fade
          onComplete: () => {
            navLinksWrapper.style.display = "none";
          },
        });

        gsap.to(hamburgerText, {
          y: "0%",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  }
};
