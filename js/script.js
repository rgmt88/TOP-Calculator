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
        throw new Error("Division by zero is not allowed");
    }
    return num1 / num2;
};

let num1 = 0;
let num2 = 0;
let operator = '';

function operate(operator, num1, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            throw new Error("Invalid operator");
    }
}

function setupCalculator() {
    let currentValue = ""; // Variable to hold the current value

    // Function to handle number button press
    function numberPressed(number) {
        currentValue += number; // Append the pressed number to the current value
        document.getElementById('result-display').innerText = currentValue; // Display the current value
    }

    // Setup event listeners for number buttons
    const numberButtons = document.querySelectorAll('.numbers');
    numberButtons.forEach(button => {
        button.addEventListener('click', function() {
            numberPressed(this.value);
        });
    });

    //Clear button
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', function() {
        document.getElementById('result-display').innerText = 0;
        currentValue = "";
    });


}

// Call setupCalculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupCalculator);


