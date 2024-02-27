const setFirstActive = (element) => {
  const active = element.getAttribute("data-active");

  const query = active ? `[data-title='${active}']` : ".item";
  const child = element.querySelector(query);

  setActive(child);
};

const triggerAction = (element) => {
  const grandParent = element.parentNode.parentNode;
  const root = grandParent.getAttribute("data-root");
  const container = grandParent.querySelector(".select-title");
  const title = container.querySelector(".fw-600");
  title.textContent =
    grandParent.getAttribute("data-active") ||
    element.getAttribute("data-title");

  if (!root) return;
  const id = element.getAttribute("data-value")
  console.log(id)
};

const setActive = (element) => {
  triggerAction(element);
  Array.from(element.parentNode.children).forEach((sibling) => {
    if (sibling === element) return;
    sibling.classList.remove("is-active");
  });
  element.classList.add("is-active");
};

const setDisplay = (element, variant) => {
  Array.from(element.parentNode.children).forEach((sibling) => {
    if (element === sibling) return;
    const root = sibling.getAttribute("data-root");

    sibling.style.display = "none";
    if (root !== variant) return;
    setFirstActive(sibling);
    sibling.style.display = "";
  });
};

function arsOnClick(element) {
  const grandParent = element.parentNode.parentNode;
  grandParent.setAttribute("data-active", element.getAttribute("data-title"));
  setActive(element);

  if (grandParent.getAttribute("data-root")) return;

  const variant = element.getAttribute("data-title");
  setDisplay(grandParent, variant);
}

const setRoot = () => {
  const roots = document.querySelectorAll("[data-root]");
  roots.forEach((root) => {
    const nonRoot = root.getAttribute("data-root");
    if (nonRoot) return;
    const child = root.querySelector(".item");
    arsOnClick(child);
    root.style.display = "";
  });
};

setRoot();
