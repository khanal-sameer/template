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
  
    //as seen slider
    var asSeen = new Splide("#as-seen_slider", {
      autoWidth: true,
      arrows: false,
      pagination: false,
      type: "loop",
      perPage: 1,
      autoplay: true,
      interval: 2000,
      cover: false,
      gap: "4rem",
      breakpoints: {
        1024: {
          perPage: 7,
          gap: "3rem",
        },
        576: {
          perPage: 4,
        },
      },
    });
  
    asSeen.mount();
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
  document.addEventListener("DOMContentLoaded", async function () {
    function extractCookie(...keys) {
      return document.cookie
        .split(";")
        .filter((item) => keys.some((key) => item.includes(key)))
        .reduce((acc, item) => {
          const [key, value] = item.trim().split("=");
          acc[key] = value;
  
          return acc;
        }, {});
    }
  
    const cookie = extractCookie("country");
    const country = window.country || cookie.country || "us";
  
    const container = document.getElementById("hers");
    const product = container.getAttribute(["data-product"]);
    const defaultValue = { price: 65, subPrice: 50, currency: "$" };
  
    const getCountryData = (variants = []) => {
      const variant = variants[0];
  
      if (!variant) return defaultValue;
  
      const {
        price,
        subscription_price: subPrice,
        currency_symbol: currency,
      } = variant.variant_countries.find(
        (c) => c.country_iso.toLowerCase() === country
      );
  
      return { price, subPrice, currency };
    };
  
    const fetchVariantsDetail = async (product_id) => {
      if (!product_id) return defaultValue;
  
      const host = window.fcs?.api_url_host || "https://fluid.app";
  
      const url = new URL(`${host}/api/products/${product_id}`);
  
      try {
        const res = await fetch(url);
        const data = await res.json();
  
        if (!data) return defaultValue;
  
        return getCountryData(data.variants || []);
      } catch {
        return defaultValue;
      }
    };
  
    const updateSave = (price, subPrice, currency) => {
      const saved = Number(price - subPrice).toFixed(2);
      const element = document.getElementById("saving");
      element.textContent = `{currency}${saved}`;
    };
  
    const updateComponent = (price, subPrice) => {
      const body = document.getElementById("hers");
      const oneTimePrice = document.getElementById("onetime_order_price");
      const oneTimePriceCross = document.getElementById("crossed_onetime_price");
      const subscriptionPrice = document.getElementById("subscribe_price");
  
      oneTimePrice.textContent = price;
      oneTimePriceCross.textContent = price;
      subscriptionPrice.textContent = subPrice;
      body.style.display = "";
    };
  
    let { price, subPrice, currency } =
      (await fetchVariantsDetail(product)) || defaultValue;
    price = Number(price).toFixed(2);
    subPrice = Number(subPrice).toFixed(2);
    updateSave(price, subPrice, currency);
  
    subPrice = currency + subPrice + "/mo";
    price = currency + price;
  
    updateComponent(price, subPrice);
  });
  