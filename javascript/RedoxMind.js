$(document).ready(function () {
  // video popup
  $("[data-fancybox]").fancybox({
    youtube: {
      controls: 0,
      modestbranding: 1, // Use modestbranding instead of showinfo
    },
  });
});
document.addEventListener("DOMContentLoaded", async function () {
  const getInfoWrapperKey = (lang = "en") => `${lang}_info_wrapper`;
  const getAsSeenOnKey = (lang = "en") => `${lang}_as_seen_on`;
  const getProductContentKey = (lang = "en") => `${lang}_product_content`;

  const getInfoWrapperElements = () => [
    ...(document.querySelectorAll('[id$="_info_wrapper"]') || []),
  ];
  const getAsSeenOnElements = () => [
    ...(document.querySelectorAll('[id$="_as_seen_on"]') || []),
  ];
  const getProductContentElements = () => [
    ...(document.querySelectorAll('[id$="_product_content"]') || []),
  ];

  const filterOptions = ["country", "locale"];
  const cookie = document.cookie
    .split(";")
    .filter((item) => filterOptions.some((key) => item.includes(key)))
    .reduce((acc, item) => {
      const [key, value] = item.trim().split("=");
      acc[key] = value;

      return acc;
    }, {});

  const locale = window.locale || cookie.locale || "en";
  const country = window.country || cookie.country || "us";

  const renderer = (
    elementGenerator = getInfoWrapperElements,
    keyMapper = getInfoWrapperKey
  ) => {
    const regionalElement = document.getElementById(keyMapper(locale));
    const lang = !regionalElement ? "en" : locale;

    elementGenerator().forEach((element) => {
      const id = element.getAttribute("id");
      if (id === keyMapper(lang)) {
        element.style.display = "";
      } else {
        element.remove();
      }
    });
  };

  renderer(getProductContentElements, getProductContentKey);
  renderer(getAsSeenOnElements, getAsSeenOnKey);
  renderer(getInfoWrapperElements, getInfoWrapperKey);

  const quantityDisplay = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increaseBtn");
  const decreaseBtn = document.getElementById("decreaseBtn");
  const container = document.getElementById("asea-landing_page");
  container.style.display = "";

  const subscribeInput = document.getElementById("subscribe");
  subscribeInput.checked = true;
  const oneTimePurchase = document.getElementById("onetime_order");
  const oneTimePrice = document.getElementById("onetime_order_price");
  const subscriptionPrice = document.getElementById("subscribe_price");
  const subscriptionPriceCross = document.getElementById(
    "subscribe_price_cross"
  );
  const totalPrice = document.getElementById("total_price");
  // Set the initial quantity
  let productQuantity = 1;
  quantityDisplay.value = productQuantity;

  function increaseValue() {
    var value = parseInt(quantityDisplay.value);
    value = isNaN(value) ? 1 : value;
    value++;
    quantityDisplay.value = value;
  }

  function decreaseValue() {
    var value = parseInt(quantityDisplay.value);
    value = isNaN(value) ? 1 : value;
    value < 1 ? (value = 1) : "";
    if (value === 1) {
      return;
    }
    value--;
    quantityDisplay.value = value;
  }

  increaseBtn.addEventListener("click", () => {
    increaseValue();
  });
  decreaseBtn.addEventListener("click", () => {
    decreaseValue();
  });

  const oneTimePurchasePrice = oneTimePrice.textContent;
  const subscribeOrderPrice = subscriptionPrice.textContent;
  const product = container.getAttribute("data-product");
  const defaultValue = {
    price: oneTimePurchasePrice,
    subPrice: subscribeOrderPrice,
  };

  const findRegionalData = (variants = []) => {
    const variant = variants[0];

    if (!variant) return;

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

    const host = window.fcs?.api_url_host || "http://localhost";
    const url = new URL(`${host}/api/products/${product_id}`);

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (!data) return;

      return findRegionalData(data.variants || []);
    } catch {
      return;
    }
  };

  const updateComponent = (price, subPrice) => {
    oneTimePrice.textContent = price;
    subscriptionPrice.textContent = subPrice;
    subscriptionPriceCross.textContent = price;
    totalPrice.textContent = price;

    if (subscribeInput.checked) {
      totalPrice.textContent = subPrice;
    } else {
      totalPrice.textContent = price;
    }

    subscribeInput.addEventListener("click", () => {
      totalPrice.textContent = subPrice;
    });
    oneTimePurchase.addEventListener("click", () => {
      totalPrice.textContent = price;
    });
  };

  let { price, subPrice, currency } =
    (await fetchVariantsDetail(product)) || {};

  subPrice =
    subPrice && currency ? currency + subPrice + "/mo" : defaultValue.subPrice;
  price = price && currency ? currency + price : defaultValue.price;

  updateComponent(price, subPrice);

  //Product Slider

  var preview = new Splide("#preview-slider", {
    width: 800,
    rewind: true,
    pagination: true,
  });
  var thumbnails = new Splide("#thumbnail-slider", {
    start: 0,
    perPage: 7,
    gap: 10,
    rewind: true,
    pagination: false,
    isNavigation: true,
  });

  preview.sync(thumbnails);
  preview.mount();
  thumbnails.mount();

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
    gap: "2rem",
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

  const tabLists = document.querySelectorAll(".asea-tabs_nav");

  function showTab(tabList, index) {
    const tabsInList = tabList.querySelectorAll(".asea-tabs_nav li");
    const panelsInList =
      tabList.parentElement.nextElementSibling.querySelectorAll(
        ".tabs-content_item"
      );

    tabsInList.forEach((tab) => tab.classList.remove("active"));
    panelsInList.forEach((panel) => panel.classList.remove("active"));

    tabsInList[index].classList.add("active");
    panelsInList[index].classList.add("active");
  }

  tabLists.forEach((tabList) => {
    const tabs = tabList.querySelectorAll(".asea-tabs_nav li");

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
    gap: "1.5rem",
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

  //show more
  const itemsPerPage = 10;
  let currentPage = 1;
  const showMoreBtn = document.querySelector(".showmore");
  function showMore() {
    const dataContainer = document.getElementById("acc");
    const listItems = dataContainer.querySelectorAll(".acc-item");
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    for (let i = 0; i < listItems.length; i++) {
      if (i >= start && i < end) {
        listItems[i].style.display = "block";
      }
    }

    currentPage++;

    if (end >= listItems.length) {
      showMoreBtn.style.display = "none";
    }
  }
  showMoreBtn.addEventListener("click", () => {
    showMore();
  });
});
window.addEventListener("load", function (event) {
  let lazyScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });
});
