
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

  const tabLists = document.querySelectorAll(".tab-menu");

  function showTab(tabList, index) {
    const tabsInList = tabList.querySelectorAll(".tab-menu li");
    const panelsInList =
      tabList.parentElement.nextElementSibling.querySelectorAll(
        ".tab-content-item"
      );

    tabsInList.forEach((tab) => tab.classList.remove("active"));
    panelsInList.forEach((panel) => panel.classList.remove("active"));

    tabsInList[index].classList.add("active");
    panelsInList[index].classList.add("active");
  }

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll(".tab-menu li");

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => showTab(tabList, index));
    });

    // Show the first tab in each list by default
    showTab(tabList, 0);
  });

  //video slider
  var tabSlider = new Splide("#tab-slider", {
    arrows: false,
    pagination: false,
    type: "loop",
    perPage: 1,
    arrows: true,
    cover: false,
    gap: "2rem",
    mediaQuery: "min",
    breakpoints: {
      1280: {
        perPage: 5,
      },
      1024: {
        perPage: 4,
      },
      800: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 2,
      },
    },
  });

  tabSlider.mount();

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