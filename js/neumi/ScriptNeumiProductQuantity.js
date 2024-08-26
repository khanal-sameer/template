// Author: Binay
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
});
