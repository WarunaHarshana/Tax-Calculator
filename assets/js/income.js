document.addEventListener('DOMContentLoaded', () => {

    const incomeInput = document.getElementById('annual-income-input');
    const calcButton = document.getElementById('calc-income-button');
    const clearButton = document.getElementById('clear-income-button');
    const errorMessage = document.getElementById('income-error-message');
    const resultDisplay = document.getElementById('income-result-display');

    
    calcButton.addEventListener('click', () => {
        
        errorMessage.classList.add('d-none');
        resultDisplay.classList.add('d-none');
        errorMessage.textContent = '';
        resultDisplay.innerHTML = ''; 

        
        const income = parseFloat(incomeInput.value);
        if (isNaN(income) || income < 0) { 
            errorMessage.textContent = 'Please enter a valid income amount (0 or more).';
            errorMessage.classList.remove('d-none');
            return;
        }

        
        let remainingIncome = income;
        let totalTax = 0;
        let breakdownHTML = '<h4>Tax Breakdown (Annual):</h4>';

        
        let taxableSlab1 = Math.min(remainingIncome, 1200000);
        breakdownHTML += `<p class="mb-1">On first Rs. ${taxableSlab1.toFixed(2)} at 0%: Rs. 0.00</p>`;
        remainingIncome = Math.max(0, remainingIncome - 1200000);

        
        if (remainingIncome > 0) {
            let taxableSlab2 = Math.min(remainingIncome, 500000);
            let taxSlab2 = taxableSlab2 * 0.06;
            totalTax += taxSlab2;
            breakdownHTML += `<p class="mb-1">On next Rs. ${taxableSlab2.toFixed(2)} at 6%: Rs. ${taxSlab2.toFixed(2)}</p>`;
            remainingIncome = Math.max(0, remainingIncome - 500000);
        }

        
        if (remainingIncome > 0) {
            let taxableSlab3 = Math.min(remainingIncome, 500000);
            let taxSlab3 = taxableSlab3 * 0.12;
            totalTax += taxSlab3;
            breakdownHTML += `<p class="mb-1">On next Rs. ${taxableSlab3.toFixed(2)} at 12%: Rs. ${taxSlab3.toFixed(2)}</p>`;
            remainingIncome = Math.max(0, remainingIncome - 500000);
        }

        
        if (remainingIncome > 0) {
            let taxableSlab4 = Math.min(remainingIncome, 500000);
            let taxSlab4 = taxableSlab4 * 0.18;
            totalTax += taxSlab4;
            breakdownHTML += `<p class="mb-1">On next Rs. ${taxableSlab4.toFixed(2)} at 18%: Rs. ${taxSlab4.toFixed(2)}</p>`;
            remainingIncome = Math.max(0, remainingIncome - 500000);
        }

        
        if (remainingIncome > 0) {
            let taxableSlab5 = Math.min(remainingIncome, 500000);
            let taxSlab5 = taxableSlab5 * 0.24;
            totalTax += taxSlab5;
            breakdownHTML += `<p class="mb-1">On next Rs. ${taxableSlab5.toFixed(2)} at 24%: Rs. ${taxSlab5.toFixed(2)}</m</p>`;
            remainingIncome = Math.max(0, remainingIncome - 500000);
        }

        
        if (remainingIncome > 0) {
            let taxableSlab6 = Math.min(remainingIncome, 500000);
            let taxSlab6 = taxableSlab6 * 0.30;
            totalTax += taxSlab6;
            breakdownHTML += `<p class="mb-1">On next Rs. ${taxableSlab6.toFixed(2)} at 30%: Rs. ${taxSlab6.toFixed(2)}</p>`;
            remainingIncome = Math.max(0, remainingIncome - 500000);
        }

       
        if (remainingIncome > 0) {
            let taxSlab7 = remainingIncome * 0.36;
            totalTax += taxSlab7;
            breakdownHTML += `<p class="mb-1">On remaining Rs. ${remainingIncome.toFixed(2)} at 36%: Rs. ${taxSlab7.toFixed(2)}</p>`;
        }

        
        let netIncome = income - totalTax;

        let finalHTML = `
            <p class="fs-5 mb-2"><strong>Total Annual Tax: Rs. ${totalTax.toFixed(2)}</strong></p>
            <p class="fs-5"><strong>Net Income After Tax: Rs. ${netIncome.toFixed(2)}</strong></p>
            <hr>
            ${breakdownHTML}
        `;

        resultDisplay.innerHTML = finalHTML;
        resultDisplay.classList.remove('d-none');
    });


    
    clearButton.addEventListener('click', () => {
        incomeInput.value = '';
        errorMessage.classList.add('d-none');
        resultDisplay.classList.add('d-none');
        errorMessage.textContent = '';
        resultDisplay.innerHTML = '';
    });

});