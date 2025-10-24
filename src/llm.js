require("./components/added_numbers").added_numbers();

document.fonts.ready.then(() => {
  gsap.set(".section_logo-slider .section_campaign-hero", {
    visibility: "visible",
  });
});
