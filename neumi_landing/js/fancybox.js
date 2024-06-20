$(document).ready(function () {
    // video popup
    $("[data-fancybox]").fancybox({
      youtube: {
        controls: 0,
        modestbranding: 1, // Use modestbranding instead of showinfo
      },
    });
    $(".reviews-pagination a").on("click", function (e) {
      e.preventDefault();
    });
  });