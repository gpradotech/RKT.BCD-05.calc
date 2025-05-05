// display
const resultNumber = document.getElementById("resultNumber");
const displayOperator = document.getElementById("displayOperator");
const calc = document.getElementById("calc");

// numbers
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const decimal = document.getElementById("decimal");

// operators
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const subtract = document.getElementById("subtract");
const add = document.getElementById("add");
const equals = document.getElementById("equals");

// other buttons
const backspace = document.getElementById("backspace");
const percent = document.getElementById("percent");
const clear = document.getElementById("clear");

//////////////////////////////////////////////////////////////////
// 1. Preparar variáveis para armazenar o estado da calculadora
// states
let currentInput = "";       // Número que está sendo digitado
let previousInput = "";      // Número armazenado antes de escolher o operador
let operator = "";           // Operador atual (+, -, etc.)
let resultadoExibido = false; // Indica se acabou de mostrar um resultado


//////////////////////////////////////////////////////////////////
// 2. Função para atualizar o visor da calculadora
function updateDisplay() {
  if (currentInput === "" || currentInput === "Erro") {
    resultNumber.textContent = currentInput || "0";
  } else {
    // Remove excesso de caracteres, mas formata com separadores
    let toDisplay = currentInput.slice(0, 16); // maior limite porque inclui pontos/virgulas
    resultNumber.textContent = formatDisplayNumber(toDisplay);
  }
}


///////////////////////////////////////////////////////
// 3. Função para lidar com clique nos números
function appendNumber(number) {
  // Se acabou de mostrar o resultado, reinicia o cálculo
  if (resultadoExibido) {
    currentInput = "";
    previousInput = "";
    operator = "";
    calc.textContent = ".";
    updateOperatorDisplay("");
    resultadoExibido = false;
  }

  if (number === "." && currentInput.includes(".")) return;

  const plainDigits = currentInput.replace(".", "");
  if (plainDigits.length >= 8) return;

  currentInput += number;
  updateDisplay();
}


zero.onclick = () => appendNumber("0");
one.onclick = () => appendNumber("1");
two.onclick = () => appendNumber("2");
three.onclick = () => appendNumber("3");
four.onclick = () => appendNumber("4");
five.onclick = () => appendNumber("5");
six.onclick = () => appendNumber("6");
seven.onclick = () => appendNumber("7");
eight.onclick = () => appendNumber("8");
nine.onclick = () => appendNumber("9");
decimal.onclick = () => appendNumber(".");


//////////////////////////////////////////////////////////////////
// 4. Função para escolher o operador
function chooseOperator(op) {
  // Se o resultado foi exibido, queremos continuar usando ele
  if (resultadoExibido) {
    previousInput = currentInput;
    currentInput = "";
    resultadoExibido = false;
  }

  if (currentInput === "" && previousInput !== "") {
    operator = op;
    updateOperatorDisplay(op);
    updateHistoryDisplay(previousInput, operator);
    return;
  }

  if (currentInput === "") return;

  if (previousInput !== "") {
    compute();
    previousInput = currentInput;
    currentInput = "";
  } else {
    previousInput = currentInput;
    currentInput = "";
  }

  operator = op;
  updateOperatorDisplay(op);
  updateHistoryDisplay(previousInput, operator);
}


function updateOperatorDisplay(op) {
  const symbolMap = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  displayOperator.textContent = symbolMap[op] || "";
}

add.onclick = () => chooseOperator("+");
subtract.onclick = () => chooseOperator("-");
multiply.onclick = () => chooseOperator("*");
divide.onclick = () => chooseOperator("/");


//////////////////////////////////////////////////////////////////
// 5. Função de cálculo
function compute() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  let result = 0;
  switch (operator) {
    case "+": result = prev + current; break;
    case "-": result = prev - current; break;
    case "*": result = prev * current; break;
    case "/": result = current !== 0 ? prev / current : "Erro"; break;
    default: return;
  }

  const symbol = { "+": "+", "-": "−", "*": "×", "/": "÷" }[operator];
  calc.textContent = `${formatDisplayNumber(previousInput)} ${symbol} ${formatDisplayNumber(currentInput)} =`;

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay();
  updateOperatorDisplay("");

  resultadoExibido = true; // Marca que mostrou resultado
}


equals.onclick = () => compute();

//////////////////////////////////////////////////////////////////
// 6. Limpar e apagar
clear.onclick = () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay();
  updateOperatorDisplay("");
  calc.textContent = "."; // limpa histórico
};


backspace.onclick = () => {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
};


//////////////////////////////////////////////////////////////////
// 7. Porcentagem
percent.onclick = () => {
  if (currentInput === "") return;
  currentInput = (parseFloat(currentInput) / 100).toString();
  updateDisplay();
};

//////////////////////////////////////////////////////////////////
// 8. Criar função utilitária para formatar o número
function formatDisplayNumber(value) {
  const [integerPart, decimalPart] = value.split(".");

  // Formata parte inteira com separador de milhar
  const formattedInteger = parseInt(integerPart, 10)
    .toLocaleString("pt-BR"); // Usa formatação brasileira

  // Se houver parte decimal, adiciona com vírgula
  return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
}

//////////////////////////////////////////////////////////////////
// 9. Criar função updateHistoryDisplay()
function updateHistoryDisplay(prev, op) {
  const symbolMap = {
    "+": "+",
    "-": "−",
    "*": "×",
    "/": "÷"
  };

  // Mostra o número anterior + operador
  calc.textContent = `${formatDisplayNumber(prev)} ${symbolMap[op] || ""}`;
}

//////////////////////////////////////////////////////////////////
// 10. Controlar a calculadora com o teclado
document.addEventListener("keydown", handleKeyboardInput);

function handleKeyboardInput(event) {
  const key = event.key;

  // Se for número
  if (!isNaN(key)) {
    appendNumber(key);
    return;
  }

  // Ponto ou vírgula
  if (key === "." || key === ",") {
    appendNumber(".");
    return;
  }

  // Operadores
  if (key === "+" || key === "-" || key === "*" || key === "/") {
    chooseOperator(key);
    return;
  }

  // Igual ou Enter
  if (key === "=" || key === "Enter") {
    event.preventDefault(); // evita submit se for em form
    compute();
    return;
  }

  // Limpar tudo
  if (key === "Escape" || key === "Delete") {
    clear.click();
    return;
  }

  // Apagar último
  if (key === "Backspace") {
    backspace.click();
    return;
  }

  // Porcentagem
  if (key === "%") {
    percent.click();
    return;
  }
}