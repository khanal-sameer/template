document.addEventListener("DOMContentLoaded", function () {    // Product Slider
  // key ingredients slider
  var keyIngredientsSliderMobile = new Splide(
    "#key-ingredients-slider-mobile",
    {
      arrows: false,
      pagination: false,
      type: "loop",
      perPage: 1,
      cover: false,
      gap: "2rem",
      padding: "5rem",
      mediaQuery: "min",
      breakpoints: {
        576: {
          perPage: 2,
        },
      },
    }
  );

  keyIngredientsSliderMobile.mount();


  var keyIngredientsSliderDesktop = new Splide("#key-ingredients-slider-desktop", {
    arrows: false,
    pagination: false,
    perPage: 1,
    arrows: true,
    cover: false,
    gap: "2rem",
    mediaQuery: "min",
    rewind: false,
    breakpoints: {
      1280: {
        perPage: 3,
        width: "75%"
      },
      768: {
        perPage: 3,
      },
      576: {
        perPage: 2,
      },
    },
  });

  keyIngredientsSliderDesktop.mount();

  const keyItems = gsap.utils.toArray(".ingredients .item");
  keyItems.forEach((items) => {
    gsap.fromTo(
      items,
      { opacity: 0, y: 50, stagger: 0.2 },
      {
        duration: 1.5,
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".ingredients",
          start: "-80% top",
          end: "bottom 20%",
        },
      }
    );
  });

  const featItems = gsap.utils.toArray(".product-feature-item");
  featItems.forEach((items) => {
    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        duration: 1.5,
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".key-ingredients",
          start: "-30% top",
          end: "bottom center",
          scrub: 1,
        },
      }
    );
  });
});
