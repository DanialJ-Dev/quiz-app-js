import formatData from "./helper.js";

const loader = document.getElementById("loader");
const error = document.getElementById("error");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const questionNumber = document.getElementById("question-number");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-btn");
const finishButton = document.getElementById("finish-btn");
const level = localStorage.getItem("difficulty") || "medium";

const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
const CORRECT_BONUS = 10;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    formattedData = formatData(data.results);
    start();
  } catch {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuestion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  questionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;
  if (index === correctAnswer) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = (event) => {
  questionIndex++;

  if (questionIndex < formattedData.length) {
    isAccepted = true;
    removeCLasses();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeCLasses = () => {
  answerList.forEach((button) => {
    button.className = "answer-text";
  });
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("./end.html");
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  const handler = (event) => checkAnswer(event, index);
  button.addEventListener("click", handler);
});
