$(document).ready(function(){
  $(document).on("click",".accordion-header",function(){
    $(".accordion-content").not($(this).next()).slideUp();
    $(".accordion-item").not($(this).parent()).removeClass("active");
    $(this).next(".accordion-content").slideToggle();
    $(this).parent(".accordion-item").toggleClass("active");
  });
})