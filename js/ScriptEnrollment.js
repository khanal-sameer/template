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

  const cookie = extractCookie("country", "locale");
  const country = window.country || cookie.country || "us";
  const locale = window.locale || cookie.locale || "en";
  const selector = '[data-product^="product_"]';

  const container = document.getElementById("enroll-pack");
  const containers = container.querySelectorAll(selector);

  const extractId = (id = "") => id.split("_").pop();

  const fetchEnrollmentDetail = async (product_id) => {
    if (!product_id) return null;

    const host = "https://app.neumi.com";
    const url = new URL(
      `${host}/api/v1/enrollment_packs/${product_id}?country_iso=${country}&language_iso=${locale}`
    );

    try {
      const res = await fetch(url);
      const data = await res.json();

      return data;
    } catch {
      return null;
    }
  };

  const promises = [...containers].map(async (element) => {
    const productId = element.getAttribute("data-product");
    const id = extractId(productId);

    const data = (await fetchEnrollmentDetail(id)) || {};
    const {
      display_price: p,
      image_url,
      title,
      membership_products,
      subscription_products,
    } = data;

    const sub = (subscription_products || [])[0];
    const one_time = (membership_products || [])[0];

    const { title: subTitle = "", active: subActive } = sub || {};
    let { title: oneTimeTitle = "", active: oneTimeActive } = one_time || {};

    oneTimeTitle =
      subTitle && oneTimeTitle ? oneTimeTitle + " + " : oneTimeTitle;

    return {
      id,
      title,
      desc: oneTimeTitle + subTitle,
      title,
      img: image_url,
      hide: !subActive && !oneTimeActive,
      element,
      price: p,
    };
  });

  const enrollments = await Promise.all(promises);
  const hasEnrollments = enrollments.some((item) => !item.hide);

  enrollments.forEach(({ desc, element, hide, id, img, title, price }) => {
    const enroll = container.querySelector(`[data-product="enrollment_${id}"]`);

    if (hide) {
      element.remove();
      enroll.remove();
      return;
    }

    const imageElement = element.querySelector(".p-image");
    imageElement.src = img;

    const descElement = enroll.querySelector(".p-desc");
    const titleElement = enroll.querySelector(".p-title");
    const priceElement = enroll.querySelector(".p-price");

    titleElement.textContent = title;
    priceElement.textContent = price;
    descElement.textContent = desc;
  });

  if (hasEnrollments) container.classList.remove("is-hide");
});
