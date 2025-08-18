require("./reusables/blogCard").blogCard();

window.addEventListener("DOMContentLoaded", () => {
  const sectionHero = document.querySelector(".section_hero-blog-page");
  gsap.set(sectionHero, { visibility: "visible" });

  const blogCards = document.querySelectorAll(".blog_card-wrapper");
  gsap.set(blogCards, { visibility: "visible" });

  gsap.from(blogCards, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
    stagger: 0.05,
  });
  gsap.from(sectionHero, {
    opacity: 0,
    y: 100,
    duration: 1,
    ease: "power2.out",
  });
});
