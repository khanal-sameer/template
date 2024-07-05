document.addEventListener("DOMContentLoaded", function () {
  const previewSlider = new Splide("#preview-slider", {
    rewind: true,
    pagination: false,
    arrows: false,
  });
  const thumbnailsSlider = new Splide("#thumbnail-slider", {
    start: 0,
    perPage: 5,
    gap: 6,
    rewind: true,
    pagination: false,
    isNavigation: true,
    mediaQuery: "min",
    breakpoints: {
      576: {
        perPage: 5,
        width: 400,
      },
    },
  });

  previewSlider.sync(thumbnailsSlider);
  previewSlider.mount();
  thumbnailsSlider.mount();

  var trustedBy = new Splide("#trusted-by-slider", {
    autoWidth: true,
      arrows: false,
      pagination: false,
      type: "loop",
      perPage: 7,
      autoplay: true,
      interval: 2000,
      cover: false,
      gap: "4rem",
      breakpoints: {
        1024: {
          perPage: 6,
          gap: "4rem",
        },
        576: {
          perPage: 7,
        },
      },
  });
  trustedBy.mount();

  var testimonialSlider = new Splide("#testimonial-slider",{
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
      768: {
        perPage: 2,
        arrows: true,
        padding: {
        right: "0px"
      },
      },
    },
  });
  testimonialSlider.mount();
});
