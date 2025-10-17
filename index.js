function login() {
  var name = document.getElementById("Name").value;

  if (name === "") {
    alert("Please enter a your name!");
    return;
  }

  localStorage.setItem("userName", name);
  localStorage.setItem("score", 0);

  window.location.href = `quiz.html?Name=${encodeURIComponent(name)}`;
  document.getElementById("span-name").textContent = name;
}

const quizData = [
  {
    question: "1. What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Hyper Text Preprocessor",
      "Hyper Text Multiple Language",
      "Hyper Tool Multi Language",
    ],
    correct: 0,
  },
  {
    question: "2. What does CSS stand for?",
    options: [
      "Creative Style System",
      "Cascading Style Sheets",
      "Computer Style Syntax",
      "Colorful Style Sheets",
    ],
    correct: 1,
  },
  {
    question: "3. Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<script>", "<javascript>", "<code>"],
    correct: 1,
  },
  {
    question: "4. What symbol is used for comments in JavaScript?",
    options: ["//", "<!-- -->", "/* */", "#"],
    correct: 0,
  },
  {
    question: "5. Which company developed JavaScript?",
    options: ["Microsoft", "Sun Microsystems", "Netscape", "Oracle"],
    correct: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let timer=null;
let timerRunning = false;

window.onload = function () {
  const name = localStorage.getItem("userName");
  document.getElementById("span-name").textContent = name;
  document.getElementById("span-name").style.color='white';
  loadQuestion();
};

function loadQuestion() {
  const q = quizData[currentQuestion];
  document.getElementById("question-text").textContent = q.question;
  document.getElementById("topic").textContent = `Question ${
    currentQuestion + 1
  }/${quizData.length}`;

  const options = document.querySelectorAll(".form-check-label");
  const inputs = document.querySelectorAll('input[name="answer"]');

  q.options.forEach((opt, i) => {
    options[i].textContent = opt;
    inputs[i].checked = false;
    inputs[i].value = i;
  });

  clearInterval(timer);
  startTimer(10);
}

function nextQuestion() {
  clearInterval(timer);
  timerRunning=false;

  const selected = document.querySelector('input[name="answer"]:checked');

  if (selected) {
    const answer = parseInt(selected.value);
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function startTimer(seconds) {
  const timerDisplay = document.getElementById("timer");
  let timeLeft = seconds;
  timerRunning=true;

  timer = setInterval(function () {
    timeLeft--;

    if (timeLeft <= 0) {
      clearInterval(timer);

      nextQuestion();
      return;
    }

    let minutes = parseInt(timeLeft / 60);
    let secondsLeft = timeLeft % 60;

    timerDisplay.textContent = minutes + ":" + secondsLeft;

    if (timeLeft <= 3) {
      timerDisplay.style.color = "red";
    } else {
      timerDisplay.style.color = "black";
    }0
  }, 1000);
}

function showResult() {
  const container = document.querySelector(".container");
  const name = localStorage.getItem("userName");

  container.innerHTML = `
    <div class="card text-center p-5 shadow">
      <h3>Quiz Completed!</h3>
      <p>${name ? name + "," : ""} your score is:</p>
      <h4>${score}/${quizData.length}</h4>
      <button class="btn btn-primary mt-3" onclick="restartQuiz()">Play Again</button>
    </div>
  `;
  localStorage.clear();
}

function restartQuiz() {
  window.location.href = "index.html";
}