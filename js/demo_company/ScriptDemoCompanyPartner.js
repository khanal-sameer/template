// Author: Kalpana
document.addEventListener("DOMContentLoaded", function () {
  var slider = new Splide("#trusted-by-slider", {
    arrows: false,
    pagination: false,
    type: "loop",
    perPage: 3,
    autoplay: true,
    interval: 2000,
    cover: false,
    gap: 30,
    mediaQuery: "min",
    rewind: true,
    breakpoints: {
      1350:{
        perPage: 7,
        gap: 40,
      },
      1024: {
        perPage: 5,
      },
      768: {
        perPage: 4,
      },
    },
  });
  slider.mount();
});
