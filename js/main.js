//URL Config
var GET_TOKEN_ENDPOINT =
  "http://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com:8080/sign_in";

(function() {
  //Cache the elements;
  var form = document.getElementById("login");
  var user = document.getElementById("user");
  var pass = document.getElementById("pass");

  var success = document.getElementById("success");
  var error = document.getElementById("error");
  var token = document.getElementById("token");

  form.addEventListener("submit", function(event) {
    //Block default submit action
    event.preventDefault();
    event.stopPropagation();

    var data = {
      username: user.value,
      password: pass.value
    };

    var stringifyData = JSON.stringify(data);

    //Send HTTP POST request
    var credentialsRequest = fetch(GET_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: stringifyData
    })
      .then(function(response) {
        //expect the token in the response
        success.classList.add("show");
        token.innerText = response;
      })
      .catch(function(response) {
        console.log(response);
        error.classList.add("show");
      });
  });
})();
