document.addEventListener("DOMContentLoaded", () => {
  const taxTypeButton = document.getElementById("tax-type-button");
  const hiddenTaxInput = document.getElementById("tax-type-value");
  const dropdownItems = document.querySelectorAll(".dropdown-item");

  const amountInput = document.getElementById("amount");
  const calcButton = document.getElementById("calc-button");
  const errorMessage = document.getElementById("error-message");
  const resultDisplay = document.getElementById("result-display");

  const clearButton = document.getElementById("clear-button");

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedText = event.target.textContent;
      const selectedValue = event.target.getAttribute("data-value");
      taxTypeButton.textContent = selectedText;
      hiddenTaxInput.value = selectedValue;
    });
  });

  calcButton.addEventListener("click", () => {
    errorMessage.classList.add("d-none");
    resultDisplay.classList.add("d-none");
    errorMessage.textContent = "";
    resultDisplay.textContent = "";

    const taxType = hiddenTaxInput.value;
    const amount = parseFloat(amountInput.value);

    if (taxType === "") {
      errorMessage.textContent = "Please select a tax type.";
      errorMessage.classList.remove("d-none");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      errorMessage.textContent = "Amount must be a number greater than 0.";
      errorMessage.classList.remove("d-none");
      return;
    }

    let calculatedTax = 0;

    switch (taxType) {
      case "rent":
        if (amount > 100000) calculatedTax = amount * 0.1;
        break;
      case "interest":
        calculatedTax = amount * 0.05;
        break;
      case "dividend":
        if (amount > 100000) calculatedTax = amount * 0.14;
        break;
    }

    const formattedTax = calculatedTax.toFixed(2);
    resultDisplay.textContent = `Calculated Tax: Rs. ${formattedTax}`;
    resultDisplay.classList.remove("d-none");
  });

  clearButton.addEventListener("click", () => {
    amountInput.value = "";

    taxTypeButton.textContent = "-- Please Select --";

    hiddenTaxInput.value = "";

    errorMessage.classList.add("d-none");
    errorMessage.textContent = "";

    resultDisplay.classList.add("d-none");
    resultDisplay.textContent = "";
  });
});
