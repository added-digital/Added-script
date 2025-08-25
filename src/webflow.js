require("./components/added_numbers").added_numbers();

console.log("webflow");

const words = document.querySelectorAll("[data-scrub-words]");

words.forEach((wordContainer) => {
  const text = wordContainer.textContent;
  const wordsArray = text.split(" ");

  wordContainer.innerHTML = "";

  wordsArray.forEach((word, index) => {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = word + (index < wordsArray.length - 1 ? " " : "");
    wordSpan.style.opacity = "0.5";
    wordContainer.appendChild(wordSpan);
  });

  gsap.to(wordContainer.querySelectorAll("span"), {
    opacity: 1,
    duration: 1,
    ease: "none",
    stagger: 0.05,
    scrollTrigger: {
      trigger: wordContainer,
      start: "top 80%",
      end: "bottom 20%",
      scrub: true,
      toggleActions: "play none none reverse",
    },
  });
});
