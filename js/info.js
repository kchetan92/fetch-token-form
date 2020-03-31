var TARGET_URL = "http://192.168.5.2";

(function() {
  var tokenDisplay = document.getElementById("token");
  var container = document.getElementById("token-result");
  var sendButton = document.getElementById("send");

  var token = window.localStorage.getItem("token");
  if (token) {
    container.classList.add("success");
    tokenDisplay.innerText = token;
  } else {
    container.classList.add("fail");
  }

  sendButton.addEventListener("click", function() {
    fetch(TARGET_URL);
  });
})();
