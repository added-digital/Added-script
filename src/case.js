const heroWrapper = document.querySelector(".case-hero_text-wrapper");
const heroText = document.querySelector("[data-hero-reveal]");
const descriptionItems = document.querySelectorAll("[data-project-text]");
const descriptionItemLines = document.querySelectorAll(".horisontal_line-case");
const heroImageReveal = document.querySelectorAll(".case_hero-reveal");
const clientLogo = document.querySelector(".case-hero_client-logo");
const workPills = document.querySelectorAll(".work_pill");
console.log("this will run");
gsap.set(heroWrapper, {
  visibility: "visible",
});

gsap.set(heroImageReveal, {
  width: "100%",
});

const heroTextsplit = new SplitText(heroText, {
  type: "lines",
  linesClass: "line",
});

const descriptionItemSplit = new SplitText(descriptionItems, {
  type: "lines",
  linesClass: "line",
  mask: "lines",
});

const tl = gsap.timeline();

tl.set(window, { scrollTo: 0 })
  .from(clientLogo, {
    y: "100%",
    duration: 1,
    ease: "expo.out",
  })
  .fromTo(
    heroTextsplit.lines,
    {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: "blur(10px)",
      ease: "power2.out",
      duration: 1,
    },
    {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: "blur(0px)",
      stagger: 0.1,
      ease: "power2.out",
      duration: 1,
    },
    "-=0.7"
  )
  .from(
    descriptionItemLines,
    {
      width: 0,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.1,
    },
    "-=1.2"
  )
  .from(
    descriptionItemSplit.lines,
    {
      y: 50,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    },
    "-=1.2"
  )
  .to(
    heroImageReveal,
    {
      width: "0%",
      duration: 1.2,
      ease: "power2.out",
    },
    "=-1"
  )
  .from(
    workPills,
    {
      opacity: 0,
      y: 20,
      duration: 1,
      ease: "power2.out",
      stagger: 0.1,
    },
    "=-1"
  )
  .call(() => {
    // Resume Lenis smooth scrolling after animation
    if (window.lenis) {
      window.lenis.start();
    }
  });
