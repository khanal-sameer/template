function productSlider(){
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
}
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
      768: {
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
function trustedBySlider(){
  var slider = new Splide("#trusted-by-slider", {
    arrows: false,
    pagination: false,
    type: "loop",
    perPage: 2,
    autoplay: true,
    interval: 2000,
    cover: false,
    gap: 20,
    mediaQuery: "min",
    rewind: true,
    breakpoints: {
      1024: {
        perPage: 7,
        gap: 40,
      },
      576: {
        perPage: 3,
      },
    },
  });
  slider.mount();
}
function subscribe(){
  $(document).on('click','#subscribe',function(){
    $('.subscribe-card').addClass('active');
    $('.one-time-purchase-card').removeClass('active');
  })
  $(document).on('click','#one-time',function(){
    $('.one-time-purchase-card').addClass('active');
    $('.subscribe-card').removeClass('active');
  });
}

function quantity(){
  const quantitySelector = $("#quantity");
  var value = parseInt(quantitySelector.val());

  $(document).on('click','#increase-btn',function(){
    value++;
    quantitySelector.val(value);
  });

  $(document).on('click','#decrease-btn',function(){
    if (value === 1) {
      return;
    }
    value--;
    quantitySelector.val(value);
  })
  
}

document.addEventListener("DOMContentLoaded", function () {
  productSlider();
  testimonialSlider();
  trustedBySlider();
  subscribe();
  quantity();
});
