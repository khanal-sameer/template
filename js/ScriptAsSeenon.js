document.addEventListener("DOMContentLoaded", function () {
  //as seen slider
  var asSeen = new Splide("#as-seen_slider", {
    autoWidth: true,
    arrows: false,
    pagination: false,
    type: "loop",
    perPage: 1,
    autoplay: true,
    interval: 2000,
    cover: false,
    gap: "4rem",
    breakpoints: {
      1024: {
        perPage: 7,
        gap: "3rem",
      },
      576: {
        perPage: 4,
      },
    },
  });

  asSeen.mount();
});
