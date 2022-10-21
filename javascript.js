const display = document.querySelector('#display');
const equals = document.querySelector('#equals');
const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.operand');
const clear = document.querySelector('#clear');


// ----------------------- clear button --------------------------------------//

clear.addEventListener('click', () => {
  display.textContent = "";
  storedValue = 0;
  operation = "";
});


// ---------------------  operand wiring  ----------------------------------//


operands.forEach(operand => operand.addEventListener('click', (e) => {
  display.textContent += `${e.target.innerHTML}`;
}));

const percent = document.querySelector('#percent');
percent.addEventListener('click', () => {
  display.textContent *= 0.01;
});

const posNeg = document.querySelector('#pos-neg');
posNeg.addEventListener('click', () => {
  if (display.textContent.slice(0, 1) == "-") {
    display.textContent = display.textContent.slice(1, display.textContent.length);
  } else {
    const string = display.textContent;
    display.textContent = "-" + string;
  }
});

const factorial = document.querySelector('#factorial');
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

operators.forEach(operator => operator.addEventListener('click', (e) => {
  if (operation != "") operate(storedValue, operation);
  //^enables chain operations without pressing '='

  storedValue = Number(display.textContent);
  operation = e.target.id;
  display.textContent = "";
}));

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
  }

  operation = "";
};




//-------------------------- operation functions -------------------------------//

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