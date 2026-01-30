const quizData = [
  {
    question: "Which language runs in the browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    correct: 3,
  },
  {
    question: "What does DOM stand for?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Direct Object Method",
      "None",
    ],
    correct: 0,
  },
  {
    question: "Which keyword is used to declare variables in JS?",
    options: ["int", "var", "string", "float"],
    correct: 1,
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreContainer = document.getElementById("score-container");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");

function startTimer() {
  timeLeft = 15;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextBtn.disabled = false;
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timer);
  startTimer();

  nextBtn.disabled = true;
  optionsEl.innerHTML = "";

  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;

  current.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option;

    btn.onclick = () => selectAnswer(btn, index);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  clearInterval(timer);

  const correctIndex = quizData[currentQuestion].correct;

  Array.from(optionsEl.children).forEach((btn) => (btn.disabled = true));

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    optionsEl.children[correctIndex].classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.onclick = () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
};

function showScore() {
  document.getElementById("question-container").classList.add("hidden");
  nextBtn.classList.add("hidden");
  document.getElementById("timer").classList.add("hidden");

  scoreContainer.classList.remove("hidden");
  scoreEl.textContent = `${score} / ${quizData.length}`;
}

loadQuestion();
