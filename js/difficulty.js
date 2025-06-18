const buttons = document.querySelectorAll("button");

const difficultyHandler = (event) => {
  level = event.target.innerText.toLowerCase();
  localStorage.setItem("difficulty", level);
  window.location.assign("./index.html");
};

buttons.forEach((button) =>
  button.addEventListener("click", difficultyHandler)
);
