const calculator = document.querySelector('.calculator');
const display = document.querySelector('#display');
const equals = document.querySelector('#equals');
const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');
const clearBtn = document.querySelector('#clear');
const decimal = document.getElementById('decimal');
const percent = document.querySelector('#percent');
const posNeg = document.querySelector('#pos-neg');
const factorial = document.querySelector('#factorial');

// ---------------------  operand wiring  ----------------------------------//


operands.forEach(operand => operand.addEventListener('click', (e) => {
  display.textContent += `${e.target.innerHTML}`;
}));

percent.addEventListener('click', () => {
  display.textContent *= 0.01;
});

posNeg.addEventListener('click', () => {
  if (display.textContent.slice(0, 1) == "-") {
    display.textContent = display.textContent.slice(1, display.textContent.length);
  } else {
    const string = display.textContent;
    display.textContent = "-" + string;
  }
});


factorial.addEventListener('click', () => {
  if (display.textContent == "") return;
  if (display.textContent == "0") {
    display.textContent = 1;
  } else {
    for (let i = display.textContent; i > 1; i--) {
      display.textContent *= (i - 1);
    };
  }
});


// -------------------------- operation wiring -------------------------------//



let storedValue = 0;
let operation = "";


//Clear Button
clearBtn.addEventListener('click', clear);


//Disables multiple decimals per operand
decimal.addEventListener('click', () => {
  decimal.disabled = true;
});


operators.forEach(operator => operator.addEventListener('click', storeOperator));


equals.addEventListener('click', () => operate(storedValue, operation));

function operate() {

  if (operation == "") return;
  if (display.textContent == "" || display.textContent == "error")
    return display.textContent = "error";

  switch (operation) {
    case "addition":
      result = add(storedValue);
      break;
    case "subtraction":
      result = subt(storedValue);
      break;
    case "multiplication":
      result = mult(storedValue);
      break;
    case "division":
      result = divd(storedValue);
      break;
    case "power":
      result = pow(storedValue);
      break;
    case "modulus":
      result = mod(storedValue);
      break;
    default:
      result = display.textContent;
  };
  
  if (result % 1 == 0) {
    display.textContent = result;
    storedValue = result;
  } else {
    display.textContent = result.toFixed(2);
    storedValue = result.toFixed(2);
  };

  operation = "";
};




//-------------------------- aux functions ------------------------------------//

function clear() {
  display.textContent = "";
  storedValue = 0;
  operation = "";
  decimal.disabled = false;
};


function storeOperator(e) {
  if (operation != "") operate(storedValue, operation);
  //^enables chain operations without pressing '='
  storedValue = Number(display.textContent);
  operation = e.target.id;
  display.textContent = "";
  decimal.disabled = false;
};

function add() {
  return storedValue + Number(display.textContent);
};

function subt() {
  return storedValue - Number(display.textContent);
};

function mult() {
  return storedValue * Number(display.textContent);
};

function divd() {
  if (Number(display.textContent) == "0") return display.textContent = "sry no can do";
  return storedValue / Number(display.textContent);
};

function pow() {
  let pwrdNum = storedValue;
  for (let i = 1 ; i < Number(display.textContent) ; i++) {
  pwrdNum *= storedValue;
  }
  return pwrdNum;
};

function mod() {
  return storedValue % Number(display.textContent);
}

// ----------------------- Keyboard Support ---------------------------------//

document.addEventListener('keydown', (e) => {
  if (e.code.slice(0, 3) == "Dig") display.textContent += e.key;
  if (e.key == ".") decimalKey();
  if (e.key == "Backspace") clear();
  if (e.key == "Enter") operate(storedValue, operation);
  if (e.key == "+") {keyOperator(); operation = "addition"};
  if (e.key == "-") {keyOperator(); operation = "subtraction"};
  if (e.key == "*") {keyOperator(); operation = "multiplication"};
  if (e.key == "/") {e.preventDefault(); keyOperator(); operation = "division"};

});

function keyOperator() {
  if (operation != "") operate(storedValue, operation);
  storedValue = Number(display.textContent);
  display.textContent = "";
  decimal.disabled = false;
};

function decimalKey() {
  if (decimal.disabled == true) {
    return;
  } else {
    display.textContent += ".";
    decimal.disabled = true;
  }
};