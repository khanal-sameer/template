// Author: Kalpana
function testimonialSlider(){
  var slider = new Splide("#testimonial-slider",{
    arrows: false,
    pagination: false,
    perPage: 1,
    cover: false,
    gap: "20px",
    padding: {
      right: "50px"
    },
    mediaQuery: "min",
    rewind: false,
    breakpoints: {
      576: {
        perPage: 2,
        arrows: true,
        padding: {
          right: "0px"
        },
      },
    },
  });
  slider.mount();
}

document.addEventListener("DOMContentLoaded", function () {
  testimonialSlider();
});
