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
});
