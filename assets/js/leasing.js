document.addEventListener('DOMContentLoaded', () => {

    // --- CALCULATOR 1: PLAN COMPARISON ---
    const loanAmountInput = document.getElementById('loan-amount');
    const interestRateInput = document.getElementById('annual-interest-rate');
    const calcLeasingButton = document.getElementById('calc-leasing-button');
    const clearLeasingButton = document.getElementById('clear-leasing-button');
    const leasingErrorMessage = document.getElementById('leasing-error-message');
    const leasingResultDisplay = document.getElementById('leasing-result-display');

    /**
     * Calculates the Equated Monthly Installment (EMI)
     * A = Principal Loan Amount
     * i = Monthly Interest Rate (decimal)
     * n = Number of Months
     * Formula: (A * i) / (1 - (1 + i)^-n)
     */
    function calculateEMI(principal, monthlyRate, months) {
        if (monthlyRate === 0) {
            return principal / months;
        }
        let part1 = Math.pow(1 + monthlyRate, -months); // (1 + i)^-n
        let part2 = 1 - part1;                       // 1 - (1 + i)^-n
        let part3 = principal * monthlyRate;         // A * i
        return part3 / part2;
    }

    // --- Event Listener for Calculator 1 ---
    calcLeasingButton.addEventListener('click', () => {
        leasingErrorMessage.classList.add('d-none');
        leasingResultDisplay.classList.add('d-none');

        const loanAmount = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);

        if (isNaN(loanAmount) || loanAmount <= 0) {
            leasingErrorMessage.textContent = 'Please enter a valid Loan Amount (must be greater than 0).';
            leasingErrorMessage.classList.remove('d-none');
            return;
        }
        if (isNaN(annualRate) || annualRate <= 0) {
            leasingErrorMessage.textContent = 'Please enter a valid Interest Rate (must be greater than 0).';
            leasingErrorMessage.classList.remove('d-none');
            return;
        }

        const monthlyRate = (annualRate / 12) / 100;
        
        const emi3Years = calculateEMI(loanAmount, monthlyRate, 36);
        const emi4Years = calculateEMI(loanAmount, monthlyRate, 48);
        const emi5Years = calculateEMI(loanAmount, monthlyRate, 60);

        let finalHTML = `
            <h4 class="alert-heading">Monthly Installment Plan Comparison</h4>
            <p class="fs-5 mb-1"><strong>3-Year Plan (36 Months):</strong> Rs. ${emi3Years.toFixed(2)} / month</p>
            <p class="fs-5 mb-1"><strong>4-Year Plan (48 Months):</strong> Rs. ${emi4Years.toFixed(2)} / month</p>
            <p class="fs-5 mb-0"><strong>5-Year Plan (60 Months):</strong> Rs. ${emi5Years.toFixed(2)} / month</p>
        `;
        leasingResultDisplay.innerHTML = finalHTML;
        leasingResultDisplay.classList.remove('d-none');
    });

    // --- Clear Listener for Calculator 1 ---
    clearLeasingButton.addEventListener('click', () => {
        loanAmountInput.value = '';
        interestRateInput.value = '';
        leasingErrorMessage.classList.add('d-none');
        leasingResultDisplay.classList.add('d-none');
    });


    // --- CALCULATOR 2: REVERSE CALCULATION ---
    const reversePaymentInput = document.getElementById('reverse-payment-amount');
    const reverseRateInput = document.getElementById('reverse-annual-rate');
    const reverseTermInput = document.getElementById('reverse-loan-term');
    const calcReverseButton = document.getElementById('calc-reverse-button');
    const clearReverseButton = document.getElementById('clear-reverse-button');
    const reverseErrorMessage = document.getElementById('reverse-error-message');
    const reverseResultDisplay = document.getElementById('reverse-result-display');

    /**
     * Calculates the Max Loan Value (Principal)
     * EMI = Monthly Payment
     * i = Monthly Interest Rate (decimal)
     * n = Number of Months
     * Formula: (EMI * (1 - (1 + i)^-n)) / i
     */
    function calculateMaxLoan(emi, monthlyRate, months) {
        if (monthlyRate === 0) {
            return emi * months;
        }
        let part1 = Math.pow(1 + monthlyRate, -months); // (1 + i)^-n
        let part2 = 1 - part1;                       // 1 - (1 + i)^-n
        let part3 = emi * part2;                     // EMI * (1 - (1 + i)^-n)
        return part3 / monthlyRate;
    }

    // --- Event Listener for Calculator 2 ---
    calcReverseButton.addEventListener('click', () => {
        reverseErrorMessage.classList.add('d-none');
        reverseResultDisplay.classList.add('d-none');

        const monthlyPayment = parseFloat(reversePaymentInput.value);
        const annualRate = parseFloat(reverseRateInput.value);
        const termInYears = parseFloat(reverseTermInput.value);

        if (isNaN(monthlyPayment) || monthlyPayment <= 0) {
            reverseErrorMessage.textContent = 'Please enter a valid Monthly Payment (must be greater than 0).';
            reverseErrorMessage.classList.remove('d-none');
            return;
        }
        if (isNaN(annualRate) || annualRate <= 0) {
            reverseErrorMessage.textContent = 'Please enter a valid Interest Rate (must be greater than 0).';
            reverseErrorMessage.classList.remove('d-none');
            return;
        }
        if (isNaN(termInYears) || termInYears <= 0 || termInYears > 5) {
            reverseErrorMessage.textContent = 'Please enter a valid Term (must be > 0 and <= 5 years).';
            reverseErrorMessage.classList.remove('d-none');
            return;
        }
        
        const monthlyRate = (annualRate / 12) / 100;
        const termInMonths = termInYears * 12;

        const maxLoan = calculateMaxLoan(monthlyPayment, monthlyRate, termInMonths);

        let finalHTML = `
            <h4 class="alert-heading">Calculation Result</h4>
            <p class.fs-5>For a <strong>${termInYears}-year</strong> loan at <strong>${annualRate}%</strong> with a payment of <strong>Rs. ${monthlyPayment.toFixed(2)}</strong>, you can borrow a maximum of:</p>
            <p class="fs-4 mb-0"><strong>Rs. ${maxLoan.toFixed(2)}</strong></p>
        `;
        reverseResultDisplay.innerHTML = finalHTML;
        reverseResultDisplay.classList.remove('d-none');
    });

    // --- Clear Listener for Calculator 2 ---
    clearReverseButton.addEventListener('click', () => {
        reversePaymentInput.value = '';
        reverseRateInput.value = '';
        reverseTermInput.value = '';
        reverseErrorMessage.classList.add('d-none');
        reverseResultDisplay.classList.add('d-none');
    });

});