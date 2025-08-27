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

    // Build the open animation sequence
    tl.set(navLinksWrapper, { display: "flex" }) // ensure it's visible when starting
      .fromTo(
        navLinksWrapper,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      .fromTo(
        navLinksHamburger,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.1" // slight overlap with wrapper fade
      )
      .to(
        hamburgerText,
        { y: "-100%", duration: 0.3, ease: "power2.out" },
        "<"
      );

    // Handle reversing (close)
    tl.eventCallback("onReverseComplete", () => {
      navLinksWrapper.style.display = "none"; // hide after close
    });

    // Button toggle
    hamburgerButton.addEventListener("click", () => {
      if (tl.reversed()) {
        tl.play(); // open
      } else {
        tl.reverse(); // close
      }
    });

    navLinksHamburger.forEach((link) => {
      link.addEventListener("click", () => {
        if (!tl.reversed()) {
          tl.timeScale(2).reverse();  // just reuse the timeline
        }
      });
    });
  }
};
