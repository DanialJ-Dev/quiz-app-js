const scoreContainer = document.getElementById("score-container");
const saveButton = document.getElementById("save-btn");
const usernameInput = document.getElementById("username-input");
const alertMessage = document.getElementById("alert-message");
const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
const score = localStorage.getItem("score");

scoreContainer.innerText = score;

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const saveHandler = () => {
  const username = usernameInput.value.trim();

  if (!username) {
    showAlert("Please enter a username", "error");
    return;
  } else if (score == 0) {
    showAlert("Invalid score", "error");
    return;
  } else {
    const record = { username: username, score: score };
    leaderboard.push(record);
    leaderboard.sort((a, b) => {
      return b.score - a.score;
    });
    leaderboard.splice(10);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    localStorage.removeItem("score");
    showAlert("Successfully saved", "success");
    window.location.assign("./index.html");
  }
};

saveButton.addEventListener("click", saveHandler);
