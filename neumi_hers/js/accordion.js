
document.addEventListener("DOMContentLoaded", function () {
  //Accordion
  const accItem = document.querySelectorAll(".acc-item");
  accItem.forEach((item, index) => {
    let accHeader = item.querySelector(".acc-item_header");
    accHeader.onclick = () => {
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
    };
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
});