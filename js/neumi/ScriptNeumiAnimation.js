// Author: Prem
document.addEventListener("DOMContentLoaded", function () {
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