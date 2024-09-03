// Author: Prem
document.addEventListener("DOMContentLoaded", function () {
  // GSAP ScrollTrigger setup
  gsap.registerPlugin(ScrollTrigger);

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

});