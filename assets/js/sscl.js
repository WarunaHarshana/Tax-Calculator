document.addEventListener('DOMContentLoaded', () => {

    const valueInput = document.getElementById('sscl-value-input');
    const calcButton = document.getElementById('calc-sscl-button');
    const clearButton = document.getElementById('clear-sscl-button');
    const errorMessage = document.getElementById('sscl-error-message');
    const resultDisplay = document.getElementById('sscl-result-display');

    calcButton.addEventListener('click', () => {
        
        errorMessage.classList.add('d-none');
        resultDisplay.classList.add('d-none');
        errorMessage.textContent = '';
        resultDisplay.innerHTML = ''; 

        const value = parseFloat(valueInput.value);
        if (isNaN(value) || value <= 0) {
            errorMessage.textContent = 'Please enter a valid value (must be greater than 0).';
            errorMessage.classList.remove('d-none');
            return;
        }

        const saleTax = value * 0.025;         
        const afterSaleTax = value + saleTax;  
        const vat = afterSaleTax * 0.15;       
        const finalSSCL = saleTax + vat;     

        let finalHTML = `
            <h4 class="alert-heading">SSCL Calculation</h4>
            <p class="mb-1"><strong>Sale Tax (2.5%):</strong> Rs. ${saleTax.toFixed(2)}</p>
            <p class="mb-1"><strong>Value after Sale Tax:</strong> Rs. ${afterSaleTax.toFixed(2)}</p>
            <p class="mb-1"><strong>VAT (15%):</strong> Rs. ${vat.toFixed(2)}</p>
            <hr>
            <p class="fs-5 mb-0"><strong>Final SSCL Value (Sale Tax + VAT): Rs. ${finalSSCL.toFixed(2)}</strong></p>
        `;

        resultDisplay.innerHTML = finalHTML;
        resultDisplay.classList.remove('d-none');
    });


    clearButton.addEventListener('click', () => {
        valueInput.value = '';
        errorMessage.classList.add('d-none');
        resultDisplay.classList.add('d-none');
        errorMessage.textContent = '';
        resultDisplay.innerHTML = '';
    });

});