document.addEventListener("DOMContentLoaded", function () {
    // 2. Subscribe Card Toggle
    const subscribeCard = document.querySelector(".subscribe-card");
    const subscribeCheckbox = document.getElementById("subscribe");
    const oneTimeOrderCheckbox = document.getElementById("onetime_order");
  
    const selectQuantityElement = document.getElementById(
      "group-checkout-quantity"
    );
    const hiddenQuantityInput = document.getElementById("checkout-quantity");
  
    function updateHiddenInput() {
      hiddenQuantityInput.value = selectQuantityElement.value;
    }
  
    // Function to update hidden input value when select changes
    selectQuantityElement.addEventListener("change", updateHiddenInput);
  
    // Initial assignment on page load
    updateHiddenInput();
  
    function toggleSubscribeCard(checked) {
      subscribeCard.classList.toggle("is-active", checked);
    }
  
    subscribeCheckbox.addEventListener("change", toggleSubscribeCard);
    oneTimeOrderCheckbox.addEventListener("change", () =>
      toggleSubscribeCard(false)
    );
    // Product Slider
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
  
    var keyIngredientsSliderDesktop = new Splide(
      "#key-ingredients-slider-desktop",
      {
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
            perPage: 4,
          },
          1024: {
            perPage: 3,
          },
          768: {
            perPage: 2,
          },
          576: {
            perPage: 2,
          },
        },
      }
    );
  
    keyIngredientsSliderDesktop.mount();
  
    //Accordion
    const accItem = document.querySelectorAll(".acc-item");
    accItem.forEach((item, index) => {
      let accHeader = item.querySelector(".acc-item_header");
      accHeader.addEventListener("click", () => {
        let accBody = item.querySelector(".acc-item_body");
        if (!item.classList.contains("acc-item_active")) {
          item.classList.add("acc-item_active");
          accBody.style.maxHeight = accBody.scrollHeight + 32 + "px";
          accItem.forEach((element, ind) => {
            let elementBody = element.querySelector(".acc-item_body");
            if (!(ind === index)) {
              element.classList.remove("acc-item_active");
              elementBody.style.maxHeight = null;
            }
          });
        } else {
          item.classList.remove("acc-item_active");
          accBody.style.maxHeight = null;
        }
      });
    });
    gsap.registerPlugin(ScrollTrigger);
  
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
  
    // Select all overlay elements within .page-section
    const overlays = gsap.utils.toArray(".overlay-animation .overlay-left");
  
    // Loop through each overlay element
    overlays.forEach((overlay) => {
      ScrollTrigger.create({
        trigger: overlay.closest(".overlay-animation"),
        start: "-100% top",
        end: "bottom 20%",
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(overlay, { duration: 1, x: "-100%" });
          } else {
            gsap.to(overlay, { duration: 1, x: 0 });
          }
        },
      });
    });
  
    const overlaysRight = gsap.utils.toArray(".overlay-animation .overlay-right");
  
    // Loop through each overlay element
    overlaysRight.forEach((overlay) => {
      ScrollTrigger.create({
        trigger: overlay.closest(".overlay-animation"),
        start: "-100% top",
        end: "bottom 20%",
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(overlay, { duration: 1, x: "100%" });
          } else {
            gsap.to(overlay, { duration: 1, x: 0 });
          }
        },
      });
    });
  
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
  
    const faqs = gsap.utils.toArray(".acc-item");
  
    gsap.fromTo(
      faqs,
      { opacity: 0, y: 50, stagger: 0.3 },
      {
        duration: 1.5,
        opacity: 1,
        stagger: 0.3,
        y: 0,
  
        scrollTrigger: {
          trigger: ".acc",
          start: "-100% top",
          end: "bottom center",
        },
      }
    );
  
    const wrappers = document.querySelectorAll(
      ".key-ingredients , .innovation, .easy-app, .lasting-benefit"
    );
    const className = "is-active";
  
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
        } else {
          entry.target.classList.remove(className);
        }
      }
    });
  
    wrappers.forEach((wrapper) => {
      observer.observe(wrapper);
    });
  });

  