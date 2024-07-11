function trustedBySlider(){
  var slider = new Splide("#trusted-by-slider", {
    arrows: false,
    pagination: false,
    type: "loop",
    perPage: 3,
    autoplay: true,
    interval: 2000,
    cover: false,
    gap: 60,
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
function accordion(){
  $(document).on("click",".accordion-header",function(){
    $(".accordion-content").not($(this).next()).slideUp();
    $(".accordion-item").not($(this).parent()).removeClass("active");
    $(this).next(".accordion-content").slideToggle();
    $(this).parent(".accordion-item").toggleClass("active");
  });
}
function fancybox(){
  $("[data-fancybox]").fancybox({
    youtube: {
      controls: 0,
      modestbranding: 1, // Use modestbranding instead of showinfo
    },
  });
}
$(document).ready(function(){
  trustedBySlider();
  testimonialSlider();
  accordion();
  fancybox();
})