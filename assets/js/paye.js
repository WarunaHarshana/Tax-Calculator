document.addEventListener("DOMContentLoaded", () => {
  const salaryInput = document.getElementById("monthly-salary-input");
  const calcButton = document.getElementById("calc-paye-button");
  const clearButton = document.getElementById("clear-paye-button");
  const errorMessage = document.getElementById("paye-error-message");
  const resultDisplay = document.getElementById("paye-result-display");

  calcButton.addEventListener("click", () => {
    errorMessage.classList.add("d-none");
    resultDisplay.classList.add("d-none");
    errorMessage.textContent = "";
    resultDisplay.innerHTML = "";

    const salary = parseFloat(salaryInput.value);
    if (isNaN(salary) || salary < 0) {
      errorMessage.textContent =
        "Please enter a valid salary amount (0 or more).";
      errorMessage.classList.remove("d-none");
      return;
    }

    let remainingSalary = salary;
    let totalTax = 0;

    let appliedRates = ["0%"];

    remainingSalary = Math.max(0, remainingSalary - 100000);

    if (remainingSalary > 0) {
      let taxableSlab2 = Math.min(remainingSalary, 41667);
      let taxSlab2 = taxableSlab2 * 0.06;
      totalTax += taxSlab2;
      remainingSalary = Math.max(0, remainingSalary - 41667);
      appliedRates.push("6%");
    }

    if (remainingSalary > 0) {
      let taxableSlab3 = Math.min(remainingSalary, 41666);
      let taxSlab3 = taxableSlab3 * 0.12;
      totalTax += taxSlab3;
      remainingSalary = Math.max(0, remainingSalary - 41666);
      appliedRates.push("12%");
    }

    if (remainingSalary > 0) {
      let taxableSlab4 = Math.min(remainingSalary, 41667);
      let taxSlab4 = taxableSlab4 * 0.18;
      totalTax += taxSlab4;
      remainingSalary = Math.max(0, remainingSalary - 41667);
      appliedRates.push("18%");
    }

    if (remainingSalary > 0) {
      let taxableSlab5 = Math.min(remainingSalary, 41667);
      let taxSlab5 = taxableSlab5 * 0.24;
      totalTax += taxSlab5;
      remainingSalary = Math.max(0, remainingSalary - 41667);
      appliedRates.push("24%");
    }

    if (remainingSalary > 0) {
      let taxableSlab6 = Math.min(remainingSalary, 41665);
      let taxSlab6 = taxableSlab6 * 0.3;
      totalTax += taxSlab6;
      remainingSalary = Math.max(0, remainingSalary - 41665);
      appliedRates.push("30%");
    }

    if (remainingSalary > 0) {
      let taxSlab7 = remainingSalary * 0.36;
      totalTax += taxSlab7;
      appliedRates.push("36%");
    }

    let netSalary = salary - totalTax;

    let finalHTML = `
            <p class="fs-5 mb-2"><strong>Total Tax Amount:</strong> Rs. ${totalTax.toFixed(
              2
            )}</p>
            <p class="fs-5 mb-2"><strong>Net Salary After Tax:</strong> Rs. ${netSalary.toFixed(
              2
            )}</p>
            <hr>
            <p class="mb-1"><strong>Applied Tax Rate(s):</strong> ${appliedRates.join(
              ", "
            )}</p>
        `;

    resultDisplay.innerHTML = finalHTML;
    resultDisplay.classList.remove("d-none");
  });

  clearButton.addEventListener("click", () => {
    salaryInput.value = "";
    errorMessage.classList.add("d-none");
    resultDisplay.classList.add("d-none");
    errorMessage.textContent = "";
    resultDisplay.innerHTML = "";
  });
});
