// Author: Kalpana
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

function tabMenu(){
  $(document).on("click", ".cp-tab-menu li", function(e){
    e.preventDefault();
    var itemID = $(this).attr('id');
    var tabContentSelector = $(this).closest('.cp-tab-menu').next('.cp-tab-menu-content');
    // add active class on tab menu item
    $(this).siblings('li').removeClass("active");
    $(this).addClass("active");

    // show/hide tab content
    tabContentSelector.children('li').css('display','none');
    tabContentSelector.children('li').removeClass('active');
    tabContentSelector.children('.' + itemID + '-content').css('display','block');
    tabContentSelector.children('.' + itemID + '-content').addClass('active');

  })
}
document.addEventListener("DOMContentLoaded", function () {
  console.log('hello')
  productSlider();
  subscribe();
  quantity();
  tabMenu();
});
