function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    if (num2 === 0) {
        alert("Division by zero is not allowed")
        return 0;
    }
    return num1 / num2;
};

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            throw new Error("Invalid operator");
    }
};

let formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
});

function setupCalculator() {
    let currentValue = ""; 
    let num1 = null;
    let currentOperator = '';
    let calculationHistory = ""; 
    let lastOperationCompleted = false;

    function performCalculation() {
        if (num1 !== null && currentValue !== "" && currentOperator) {
            let num2 = parseFloat(currentValue);
            let result = operate(currentOperator, num1, num2);

            document.getElementById('result-display').innerText = formatter.format(result);
            calculationHistory = `${formatter.format(num1)} ${currentOperator} ${formatter.format(num2)} = `;
            document.getElementById('calc-history').innerText = calculationHistory;
            console.log(calculationHistory);  
            
            num1 = result;  // Store the raw result for further calculations
            currentValue = ""; 
            lastOperationCompleted = true;
        } 
    }

    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (lastOperationCompleted) {
                currentValue = "";
                num1 = null;
                lastOperationCompleted = false;
                calculationHistory = "";
            }
            
            // Check if the button pressed is the decimal button
            if (this.value === "." && currentValue.includes(".")) {
                return;
            };

            currentValue += this.value;
            document.getElementById('result-display').innerText = currentValue;
        });
    });

    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function() {
        currentValue = "";
        num1 = null;
        currentOperator = '';
        calculationHistory = "";
        document.getElementById('result-display').innerText = "0.00";
        document.getElementById('calc-history').innerText = "0.00";
        console.log("Calculator cleared"); 
    });

    const equalButton = document.querySelector('.equal');
    equalButton.addEventListener('click', function() {
        if (currentOperator && currentValue !== "" && num1 !== null) {
            performCalculation();
            currentOperator = '';
            lastOperationCompleted = true;
            calculationHistory = ""; // Reset history after the calculation is complete
        }
    });

    const operatorsButtons = document.querySelectorAll('.operators');
    operatorsButtons.forEach(operator => {
        operator.addEventListener('click', function() {
            if (!lastOperationCompleted && currentValue !== "") {
                if (num1 === null) {
                    num1 = parseFloat(currentValue);
                } else if (currentOperator) {
                    performCalculation();
                }
                calculationHistory = "";
            }
            currentOperator = operator.value;
            lastOperationCompleted = false;
            calculationHistory += currentValue !== "" ? ` ${currentValue} ${currentOperator}` : ` ${currentOperator}`;
            document.getElementById('calc-history').innerText = calculationHistory;
            currentValue = "";
        });
    });

    const plusMinusButton = document.getElementById('pos-neg-button');
    plusMinusButton.addEventListener('click', function() {
        if (currentValue) {
            // If there is a current value entered, change its sign
            currentValue = (parseFloat(currentValue) * -1).toString();
            document.getElementById('result-display').innerText = formatter.format(parseFloat(currentValue));
        } else if (num1 !== null) {
            // If no current value but there is a calculated result, change the sign of the result
            num1 = num1 * -1;
            document.getElementById('result-display').innerText = formatter.format(num1);
        }
        // Update the calculation history only if needed
    });

    const percentageButton = document.getElementById('percentage-button');
    percentageButton.addEventListener('click', function() {
        if (currentValue) {
            // Scenario 1: Calculate the percentage of the current value
            let percentageResult = parseFloat(currentValue) / 100;
            currentValue = percentageResult.toString(); // Update currentValue
            document.getElementById('result-display').innerText = formatter.format(percentageResult);
            calculationHistory = `${currentValue} / 100 = ${formatter.format(percentageResult)}`;
        } else if (num1 !== null && lastOperationCompleted) {
            // Scenario 2: Apply percentage to the result of the last completed operation
            let percentageResult = num1 / 100;
            currentValue = percentageResult.toString(); // Update currentValue
            document.getElementById('result-display').innerText = formatter.format(percentageResult);
            calculationHistory = `${formatter.format(num1)} / 100 = ${formatter.format(percentageResult)}`;
        } else if (num1 !== null && !lastOperationCompleted) {
            // Scenario 3: Ongoing operation (e.g., "9 * 9"), apply percentage to num1
            let percentageResult = num1 / 100;
            currentValue = percentageResult.toString(); // Update currentValue
            document.getElementById('result-display').innerText = formatter.format(percentageResult);
            // Do not update calculationHistory for this intermediate step
        }
    
        document.getElementById('calc-history').innerText = calculationHistory;
        console.log(calculationHistory);
    });
};

document.addEventListener('DOMContentLoaded', setupCalculator);




