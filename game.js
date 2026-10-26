// game.js = el movimiento del juego. JavaScript hace que las cartas se volteen.
// Reglas simples: toca 2 cartas. Si son iguales, se quedan abiertas. Si no, se vuelven a tapar.

const symbols = ["🦸", "🦹", "💥", "⚡", "🛡️", "🎭", "🏙️", "📖"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let pairsFound = 0;

const board = document.getElementById("game-board");
const message = document.getElementById("game-message");
const movesText = document.getElementById("game-moves");
const restartButton = document.getElementById("game-restart");

function shuffle(array) {
  // Mezcla las cartas para que cada partida sea diferente
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startGame() {
  cards = shuffle([...symbols, ...symbols]);
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  moves = 0;
  pairsFound = 0;
  movesText.textContent = "Movimientos: 0";
  message.textContent = "Toca una carta para empezar. ¡Encuentra las 8 parejas!";
  board.innerHTML = "";

  cards.forEach((symbol) => {
    const button = document.createElement("button");
    button.className = "card";
    button.textContent = "❓";
    button.dataset.symbol = symbol;
    button.addEventListener("click", () => flipCard(button));
    board.appendChild(button);
  });
}

function flipCard(button) {
  if (lockBoard || button.classList.contains("open")) return;

  button.textContent = button.dataset.symbol;
  button.classList.add("open");

  if (!firstCard) {
    firstCard = button;
    return;
  }

  secondCard = button;
  moves++;
  movesText.textContent = "Movimientos: " + moves;

  if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
    // ¡Pareja encontrada!
    pairsFound++;
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");
    firstCard = null;
    secondCard = null;
    if (pairsFound === symbols.length) {
      message.textContent = "🎉 ¡POW! ¡Ganaste en " + moves + " movimientos! ¡Eres un verdadero héroe de cómics!";
    } else {
      message.textContent = "¡Bien! Encontraste una pareja. Sigue buscando.";
    }
  } else {
    // No son iguales: se tapan otra vez después de un momento
    lockBoard = true;
    setTimeout(() => {
      firstCard.textContent = "❓";
      secondCard.textContent = "❓";
      firstCard.classList.remove("open");
      secondCard.classList.remove("open");
      firstCard = null;
      secondCard = null;
      lockBoard = false;
    }, 800);
  }
}

restartButton.addEventListener("click", startGame);
startGame();
