
document.addEventListener("DOMContentLoaded", function () {
  // before after slider
  var beforeAfterSlider = new Splide("#before-after-preview-slider", {
    arrows: true,
    pagination: false,
    perPage: 1,
    mediaQuery: "min",
    breakpoints: {
      1024: {
        perPage: 3,

      },
      576: {
        perPage: 2,
        gap: "12px",
      },
    },
  });

  beforeAfterSlider.mount();
});
$(".medical-advisosry-list-toggle-btn").on("click", function (e) {
  e.preventDefault();
  $('.medical-advisory-content').slideToggle();
  $(".see-all-caption,.hide-all-caption").toggleClass("neumi-d-none");
})