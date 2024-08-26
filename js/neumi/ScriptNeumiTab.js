// Author: Prem and Sameer
document.addEventListener("DOMContentLoaded", function () {
  //Tab
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
    cover: false,
    gap: "12px",
    mediaQuery: "min",
    padding: "5rem",
    breakpoints: {
      1280: {
        perPage: 5,
      },
      1024: {
        perPage: 4,
      },
      768: {
        perPage: 3,
      },
      576: {
        perPage: 2,
        padding: "0",
        arrows: true,
      },
    },
  });

  tabSlider.mount();
});
