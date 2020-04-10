//URL Config
var GET_TOKEN_ENDPOINT =
  "http://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com:8080/sign_in";

var GET_DEVICE_ID =
  "http://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com:6868/getdeviceid";

function checkCredentialError(res) {
  if (res && "ok" in res && res["ok"]) {
    return res;
  } else {
    throw Error("Incorrect response");
  }
}

(function () {
  //Cache the elements;
  var form = document.getElementById("login");
  var user = document.getElementById("user");
  var pass = document.getElementById("pass");

  var success = document.getElementById("success");
  var error = document.getElementById("error");

  var deviceIDInput = document.getElementById("deviceid");
  var deviceIDButton = document.getElementById("devicedID-fetch");
  var deviceIDError = document.getElementById("device-id-error");

  //gerDeviceID

  deviceIDButton.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    fetch(GET_DEVICE_ID, {
      method: "GET",
    })
      .then(function (response) {
        return checkCredentialError(response);
      })
      .then(function (response) {
        return response.text();
      })
      .then(function (response) {
        deviceIDInput.value = response;
      })
      .catch(function (response) {
        console.log("couldn't get server id from server");
        deviceIDError.classList.add("show");
      });
  });

  form.addEventListener("submit", function (event) {
    //Block default submit action
    event.preventDefault();
    event.stopPropagation();

    var data = {
      username: user.value,
      password: pass.value,
      deviceID: deviceIDInput.value,
    };

    var stringifyData = JSON.stringify(data);

    //Send HTTP POST request
    var credentialsRequest = fetch(GET_TOKEN_ENDPOINT, {
      method: "POST",
      body: stringifyData,
    })
      .then(function (response) {
        return checkCredentialError(response);
      })
      .then(function (response) {
        return response.text();
      })
      .then(function (response) {
        //expect the token in the response
        success.classList.add("show");
        error.classList.remove("show");
        window.localStorage.setItem("token", response);
      })
      .catch(function (response) {
        console.log(response);
        error.classList.add("show");
        success.classList.remove("show");
        window.localStorage.removeItem("token");
      });
  });
})();
