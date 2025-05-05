// display
const resultNumber = document.getElementById("resultNumber");
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


//////////////////////////////////////////////////////////////////
// 2. Função para atualizar o visor da calculadora
function updateDisplay() {
  resultNumber.textContent = currentInput || "0"; // Mostra o número atual ou 0 se estiver vazio
}


///////////////////////////////////////////////////////
// 3. Função para lidar com clique nos números
function appendNumber(number) {
  if (number === "." && currentInput.includes(".")) return; // Impede múltiplos pontos
  currentInput += number; // Adiciona o número ao valor atual
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
  if (currentInput === "") return; // Ignora se não houver número
  if (previousInput !== "") {
    compute(); // Faz o cálculo se já havia um número e operador anterior
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "";
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
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = current !== 0 ? prev / current : "Erro";
      break;
    default:
      return;
  }

  currentInput = result.toString();
  operator = "";
  previousInput = "";
  updateDisplay();
}

equals.onclick = () => compute();

//////////////////////////////////////////////////////////////////
// 6. Limpar e apagar
clear.onclick = () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  updateDisplay();
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