exports.createLogoAnimation = function (tl, a, d1, d2, e, d3) {
  tl.from(a, {
    x: "-110%",
    ease: "expo.out",
    duration: 1,
  })
    .from(
      d1,
      {
        x: "-110%",
        ease: "expo.out",
        duration: 1,
      },
      "=-0.8"
    )
    .from(
      d2,
      {
        x: "-110%",
        ease: "expo.out",
        duration: 1,
      },
      "=-0.8"
    )
    .from(
      e,
      {
        ease: "expo.out",
        x: "-110%",
        duration: 1,
      },
      "=-0.8"
    )
    .from(
      d3,
      {
        ease: "expo.out",
        x: "-110%",
        duration: 1,
      },
      "=-0.8"
    );

  return tl;
};
