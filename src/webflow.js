require("./components/added_numbers").added_numbers();

const createWordScrubAnimation = () => {
  const words = document.querySelectorAll("[data-scrub-words]");
  words.forEach((word) => {
    console.log(word);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  createWordScrubAnimation();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
