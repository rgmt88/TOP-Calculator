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

    function performCalculation() {
        if (num1 !== null && currentValue !== "" && currentOperator) {
            let num2 = parseFloat(currentValue);
            let result = operate(currentOperator, num1, num2);

            num1 = result;
            
            document.getElementById('result-display').innerText = formatter.format(result);
            calculationHistory += ` ${formatter.format(currentValue)} = ${formatter.format(result)}`;
            document.getElementById('calc-history').innerText = calculationHistory;
            console.log(calculationHistory);  
            currentValue = ""; 
            currentOperator = '';
        } 
    };

    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentValue += this.value;
            document.getElementById('result-display').innerText = formatter.format(currentValue);
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
        performCalculation();
        currentOperator = '';
        calculationHistory = `${formatter.format(num1)}`; // Start a new history with the last result
    });

    const operatorsButtons = document.querySelectorAll('.operators');
    operatorsButtons.forEach(operator => {
        operator.addEventListener('click', function() {
            if (currentValue !== "") {
                if (num1 === null) {
                    num1 = parseFloat(currentValue);
                    calculationHistory = `${formatter.format(num1)}`;
                } else if (currentOperator) {
                    performCalculation();
                }
                currentOperator = operator.value;
                calculationHistory += ` ${currentOperator}`;
                document.getElementById('calc-history').innerText = calculationHistory;
                console.log(calculationHistory);
                currentValue = "";
            } else if (num1 !== null && !currentValue) {
                currentOperator = operator.value;
                calculationHistory = `${formatter.format(num1)} ${currentOperator}`;
                document.getElementById('calc-history').innerText = calculationHistory;
                console.log(calculationHistory); 
            }
        });
    });

    const plusMinusButton = document.getElementById('pos-neg-button');
    plusMinusButton.addEventListener('click', function() {
        if (num1 !== null && !currentValue) {
            let valueChange = formatter.format(num1 * -1);
            document.getElementById('result-display').innerText = valueChange;
            num1 = parseFloat(valueChange);
            calculationHistory = `${num1}`;    
        } else {
            currentValue = formatter.format(currentValue * -1);
            document.getElementById('result-display').innerText = currentValue;
            num1 = parseFloat(currentValue);
            calculationHistory = `${num1}`;
        };
    });

    const percentageButton = document.getElementById('percentage-button');
    percentageButton.addEventListener('click', function() {
        if (num1 !== null && !currentValue) {
            let valueChange = formatter.format(num1 / 100);
            document.getElementById('result-display').innerText = valueChange;

            num1 = parseFloat(valueChange);
            calculationHistory = `${num1}`;
        } else {
            currentValue = formatter.format(currentValue / 100);
            document.getElementById('result-display').innerText = currentValue;
            num1 = parseFloat(currentValue);
            calculationHistory = `${num1}`;
        };
    });

};

document.addEventListener('DOMContentLoaded', setupCalculator);




