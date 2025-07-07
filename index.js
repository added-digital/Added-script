document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-word-reveal='true']").forEach((text) => {

    const split = SplitText.create(text.children, {
      type: "words, chars",
      mask: "words",
      wordsClass: "word",
      charsClass: "char",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: text,
        start: "top bottom",
        end: "top 80%",
        toggleActions: "none play none reset",
      },
    });
    tl.from(split.words, {
      yPercent: 110,
      delay: 0.2,
      duration: 0.8,
      stagger: { amount: 0.5 },
    });

    gsap.set(text, { visibility: "visible" });
  });
});