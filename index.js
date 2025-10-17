function login() {
  var name = document.getElementById("Name").value;

  if (name === "") {
    alert("Please enter a your name!");
    return;
  }
  window.location.href = `quiz.html?Name=${encodeURIComponent(name)}`;
  document.getElementById("span-name").textContent = name;
}

window.onload = function () {
  const name = localStorage.getItem("userName");
  document.getElementById("span-name").textContent = name;
  loadQuestion();
};
