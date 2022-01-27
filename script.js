// ***** VARIABLE DECLARATIONS AND QUERY SELECTORS ***** //

let displayValue = "";
let displayValue2 = "";
let currentOperator = "";
let currentSolution = "";
const display = document.querySelector('.display');
const buttons = Array.from(document.querySelectorAll('button'));
const decimalBtn = document.querySelector('.decimal');
const now = new Date();
const min = now.getMinutes();
const hour = now.getHours();
const hours = ((hour + 11) % 12 + 1)
const info = document.querySelector('.infoPane');
const info2 = document.querySelector('.infoPane2');
const inputReadout = document.querySelector('.inputReadout');
let clickFired = false;
let keyFired = false;


// *****MATHEMATICAL FUNCTIONS***** //
function add(...args) {
    return Number((args.reduce((total, current) => total + current, 0)).toFixed(3));
};

function subtract(num1, ...args) {
    return Number((args.reduce((total, current) => total - current, num1)).toFixed(3));
};

function multiply(...args) {
    return Number((args.reduce((incrementer, next) => incrementer * next, 1)).toFixed(3));
};

function divide(num1, ...args) {
    return Number((args.reduce((incrementer, next) => incrementer / next, num1)).toFixed(3));
};



// ***** CALCULATOR OPERATIONAL FUNCTIONS ***** //


//the function below performs a chosen operation on input parameters
function operate(operator, ...args) {

    if (operator === '+' || operator === add) {
        return add(...args);
    } else if (operator === '-' || operator === subtract) {
        return subtract(...args);
    } else if (operator === '*' || operator === multiply) {
        return multiply(...args);
    } else if (operator === '/' || operator === divide || operator === '÷') {
        if (divide(...args) === "Infinity" || divide(...args) === "-Infinity") {
            return "You can't do that...";
        } else {
            return divide(...args);
        }
    } else {
        return "Error - Press AC"
    }
}


//the function below adds user button input to calculator display
function addToDisplay(chars) {
    display.innerText += `${chars}`;

}

//the function below clears the display
function clearDisplay() {
    display.innerText = "";
    keyFired = false;
    clickFired = false;
}

//the function below clears the display value
function clearDisplayValue() {
    displayValue = "";
    displayValue2 = "";
    keyFired = false;
    clickFired = false;

}
//the function below clears the current solution
function clearSolution() {
    currentSolution = "";
}

//the function below toggles positive and negative values
function backspace() {
    display.textContent = (display.textContent).toString().slice(0, -1)
    display.innerText = display.textContent;
    hasDecimal();

}
//the function below changes the result to a percent

function clearDis(input) {
    clearDisplay();
}

//the function below checks if a value is stored. If so, a second value is stored

function valueStatus() {

    if (currentSolution !== "") {
        displayValue = currentSolution;
        displayValue2 = "";
        clearDisplay();
        clearSolution();
    } else if (displayValue === "") {
        displayValue += display.innerText;
        clearDisplay();
    } else if (displayValue2 === "") {
        displayValue2 += display.innerText;
        clearDisplay();
    }
}

//the function below calculates a solution and adds the ability for operator buttons to display totals

function calculate() {
    if (displayValue && displayValue2) {
        currentSolution = operate(currentOperator, Number(displayValue), Number(displayValue2))
    }
    if (currentSolution != 0) {
        display.innerText = currentSolution;
    }
}

//the function below calculates a solution and adds the ability for operator buttons to display totals

function reCalculate() {
    if (displayValue && displayValue2 && currentSolution) {
        valueStatus();
        calculate();
    }
}

//the function below tests if a decimal is present and ensures only one decimal per operand

function hasDecimal() {
    if (String(display.innerText).includes('.')) {
        keyFired = true;
        clickFired = true;
    } else if (String(display.innerText).includes('.') && keyFired === true) {
        clickFired = true;
    } else if (String(display.innerText).includes('.') && clickFired === true) {
        keyFired = true;
    } else {
        keyFired = false;
        clickFired = false;
    }
}

//***** EVENT LISTENERS AND FUNCTION CALLS ***** //
buttons.forEach((button) => {



    if (button.className == "allClear") {
        button.addEventListener('click', () => {
            clearDisplay();
            clearDisplayValue();
            clearSolution();
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === 'a' || event.key === 'A') {
                clearDisplay();
                clearDisplayValue();
                clearSolution();
            }
        });

    } else if (button.className == "backspace") {
        button.addEventListener('click', () => {
            backspace();
        });
        window.addEventListener('keydown', (event) => {
            if (event.key === "Backspace") {
                backspace();
            }
        });
    } else if (button.className == "clearDis") {
        button.addEventListener('click', () => {
            clearDis(display.innerText);
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === 'c' || event.key === 'C') {
                clearDis(display.innerText);
            }
        });
    } else if (button.className == "divide") {
        button.addEventListener('click', () => {
            valueStatus();
            calculate();
            currentOperator = divide
            reCalculate();
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === '÷' || event.key === '/') {
                valueStatus();
                calculate();
                currentOperator = divide
                reCalculate();
            }
        });
    } else if (button.className == "multiply") {
        button.addEventListener('click', () => {
            valueStatus();
            calculate();
            currentOperator = multiply;
            reCalculate();
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === 'x' || event.key === 'X' || event.key === '*') {
                valueStatus();
                calculate();
                currentOperator = multiply;
                reCalculate();
            }
        });
    } else if (button.className == "subtract") {
        button.addEventListener('click', () => {
            valueStatus();
            calculate();
            currentOperator = subtract;
            reCalculate();
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === '-') {
                valueStatus();
                calculate();
                currentOperator = subtract;
                reCalculate();
            }
        });
    } else if (button.className == "add") {
        button.addEventListener('click', () => {
            valueStatus();
            calculate();
            currentOperator = add;
            reCalculate();
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === '+') {
                valueStatus();
                calculate();
                currentOperator = add;
                reCalculate();
            }
        });
    } else if (button.className == "equals") {
        button.addEventListener('click', () => {
            valueStatus();
            calculate();
        });
        window.addEventListener('keypress', (event) => {
            if (event.key === '=' || event.key === 'Enter') {
                valueStatus();
                calculate();
            }
        });
    } else if (button.className == "decimal") {


        button.addEventListener('click', () => {
            if (!clickFired) {
                clickFired = true;
                addToDisplay(button.innerText);
                hasDecimal();
            }
        });


        window.addEventListener('keypress', (event) => {
            if (event.key === '.') {
                if (!keyFired) {
                    keyFired = true;
                    addToDisplay(event.key);
                    hasDecimal();
                }
            }

        });


    } else {
        button.addEventListener('click', () => {
            addToDisplay(button.innerText);
        });
    }
});

window.addEventListener('keypress', (event) => {
    if (event.key === '1' || event.key === '2' || event.key === '3' || event.key === '4' || event.key === '5' || event.key === '6' || event.key === '7' || event.key === '8' || event.key === '9' || event.key === '0') {
        display.innerText += event.key;
    }
});

info.innerText = `${hours}:${min} ◃ `;
info2.innerText = ` 📶 Wi-Fi 🔋`;