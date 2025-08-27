exports.added_numbers = () => {
  document.querySelectorAll(".animated_number-col").forEach((col) => {
    const animatedNumber = col.querySelector(".animated_number");
    if (!animatedNumber) return;

    const target = parseInt(animatedNumber.textContent, 10);
    if (isNaN(target)) return;

    col.innerHTML = "";
    for (let i = 0; i <= target; i++) {
      const div = document.createElement("div");
      div.className = "animated_number";
      div.textContent = i;
      col.appendChild(div);
    }
  });

  document.querySelectorAll(".animated-number_wrapper").forEach((wrapper) => {
    const firstNumber = wrapper.querySelector(".animated_number");
    if (firstNumber) {
      wrapper.style.height = firstNumber.offsetHeight + "px";
      wrapper.style.overflow = "hidden";
    }
  });

  if (window.gsap && window.gsap.registerPlugin && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".animated_number-col").forEach((col) => {
      const numbers = col.querySelectorAll(".animated_number");
      if (!numbers.length) return;
      gsap.fromTo(
        col,
        { y: "100%" },
        {
          y: `-${(numbers.length - 1) * 100}%`,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: numbers,
            start: "top 100%",
            toggleActions: "play none none reverse",
          },
          duration: 2,
        }
      );
    });
  }
};
