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
  }

  if (window.innerWidth > 992) {
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
  const hamburgerText = document.querySelectorAll(
    ".hamburger_link-text-action"
  );
  const navLinksHamburger = document.querySelectorAll("[data-hamburger-link]");

  if (hamburgerButton && navLinksWrapper && window.innerWidth <= 992) {
    let isMenuOpen = false;

    // Reset any existing transforms on hamburger links

    const tl = gsap.timeline({ paused: true, reversed: true });

    // Set initial state
    gsap.set(navLinksWrapper, { display: "none", opacity: 0 });
    gsap.set(navLinksHamburger, { opacity: 0, x: -10 });
    gsap.set(hamburgerText, { y: "0%" });

    // Open sequence
    tl.add(() => {
      navLinksWrapper.style.display = "flex";
    })
      .to(navLinksWrapper, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .to(
        navLinksHamburger,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.1"
      )
      // Hamburger text LAST on open
      .to(
        hamburgerText,
        { y: "-100%", duration: 0.3, ease: "power2.out" },
        "-=0.3"
      );

    // Reverse tweaks
    tl.eventCallback("onReverseStart", () => {
      // Run hamburger text FIRST when reversing
      gsap.to(hamburgerText, {
        y: "0%",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    tl.eventCallback("onReverseComplete", () => {
      navLinksWrapper.style.display = "none";
    });

    // Toggle
    hamburgerButton.addEventListener("click", () => {
      tl.reversed() ? tl.play() : tl.reverse();
    });

    // Close menu when hamburger links are clicked
    navLinksHamburger.forEach((link) => {
      link.addEventListener("click", () => {
        if (isMenuOpen) {
          isMenuOpen = false;

          // Run the same close animation as hamburger button
          gsap.to(navLinksHamburger, {
            opacity: 0,
            x: -10,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in",
          });

          gsap.to(navLinksWrapper, {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            ease: "power2.out",
            onComplete: () => {
              navLinksWrapper.style.display = "none";
              // Clear any transforms on hamburger links
              gsap.set(navLinksHamburger, { clearProps: "transform" });
            },
          });

          gsap.to(hamburgerText, {
            y: "0%",
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    });
  }
};
