(function() {
  var tokenDisplay = document.getElementById("token");
  var container = document.getElementById("token-result");

  var token = window.localStorage.getItem("token");
  if (token) {
    container.classList.add("success");
    tokenDisplay.innerText = token;
  } else {
    container.classList.add("fail");
  }
})();
