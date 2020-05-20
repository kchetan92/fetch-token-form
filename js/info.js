var TARGET_URL =
  "https://192.168.10.3:8080/unlockdebugaccess";

//var TARGET_URL = "https://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com:6868/unlockdebugaccess";

function checkCredentialError(res) {
  if (res && "ok" in res && res["ok"]) {
    return res;
  } else {
    throw Error("Incorrect response");
  }
}

(function () {
  var tokenDisplay = document.getElementById("token");
  var container = document.getElementById("token-result");
  var sendButton = document.getElementById("send");
  var tokenSent = document.getElementById("token-sent");

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
//        deviceID: window.localStorage.getItem("deviceID"),
        authorization: window.localStorage.getItem("token"),
      },
    }).then((res) => {
      if (res.status === 200) {
        tokenSent.innerText = "OK";
      } else if (res.status === 401) {
        tokenSent.innerText = "Unauthorized";
      } else {
        tokenSent.innerText = `Unknown error. Error code: ${res.status}`;
      }

      tokenSent.classList.add("show");
    });
  });
})();
