document.addEventListener("DOMContentLoaded", function () {
    const previewSlider = new Splide("#preview-slider", {
      rewind: true,
      pagination: false,
      arrows: false,
    });
    const thumbnailsSlider = new Splide("#thumbnail-slider", {
      start: 0,
      perPage: 6,
      gap: 10,
      rewind: true,
      pagination: false,
      isNavigation: true,
      mediaQuery: "min",
      breakpoints: {
        576: {
          perPage: 6,
          width: 440,
        },
      },
    });
  
    previewSlider.sync(thumbnailsSlider);
    previewSlider.mount();
    thumbnailsSlider.mount();
  });

  