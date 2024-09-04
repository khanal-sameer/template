// Author: Prem
document.addEventListener("DOMContentLoaded", function () {
  // Product Slider
  const enrollPreviewSlider = new Splide("#enroll-preview-slider ", {
    pagination: false,
  });
  const enrollThumbnailsSlider = new Splide("#enroll-pack-nav-slider", {
    start: 0,
    perPage: 1,
    pagination: false,
    isNavigation: true,
  });

  enrollPreviewSlider.sync(enrollThumbnailsSlider);
  enrollPreviewSlider.mount();
  enrollThumbnailsSlider.mount();


  const buttons = document.querySelectorAll("button[data-target]");
  // Add click event listener to each button
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

})