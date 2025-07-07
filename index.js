document.fonts.ready.then(() => {
  document.querySelectorAll("[data-line-reveal='true']").forEach((text) => {
    SplitText.create(text, {
      type: "lines",
      autoSplit: true,
      mask: "lines",
      linesClass: "line",
      onSplit(self) {
        return gsap
          .timeline({
            scrollTrigger: {
              trigger: text,
              start: "top bottom",
              end: "top 80%",
              toggleActions: "none play none reset",
            },
          })
          .from(self.lines, {
            yPercent: 110,
            delay: 0.2,
            duration: 0.8,
            stagger: { amount: 0.5 },
          });
      },
    });

    gsap.set(text, { visibility: "visible" });
  });
});
