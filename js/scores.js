const list = document.querySelector("ol");
const defaultList = document.getElementById("default");
const highScores = JSON.parse(localStorage.getItem("leaderboard"));

const showLeaderboard = () => {
  if (highScores) {
    defaultList.style.display = "none";
    const content = highScores.map((score, index) => {
      return `<li>
    <span>${index + 1}</span>
    <p>${score.username}</p>
    <span>${score.score}</span>
    </li>`;
    });
    console.log(content);
    list.innerHTML = content.join("");
  } else {
    defaultList.style.display = "block";
  }
};

window.addEventListener("load", showLeaderboard);
