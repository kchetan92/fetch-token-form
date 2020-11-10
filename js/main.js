//URL Config 
var GET_TOKEN_ENDPOINT =
  "https://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com/sign_in"; 
var GET_DEVICE_ID ="https://192.168.10.3:8080/getdeviceid";

// var HU_URL = "https://ec2-13-235-229-219.ap-south-1.compute.amazonaws.com:6868/";
var HU_URL="https://localhost:8080/"; 
//var HU_URL="http://192.168.10.3:8080/";

function checkCredentialError(res) { 
if (res && "ok" in res && res["ok"]) { 
return res;} else {
throw Error("Invalid Request");
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
  var accl =document.getElementById("accl");
  var DebgTime =document.getElementById("DebgTime");
  var nbf =document.getElementById("nbf");
  var token=document.getElementById("token");
  var pass1 =document.getElementById("pass1");
  var pgb =document.getElementById("progressBar");
  pgb.style.visibility = "hidden";
   var start = document.getElementById("start");
 var stop = document.getElementById("stop");
 var tokenSent = document.getElementById("token-sent");

 function sync() {
  pass1.value = pass.value;
}
//gerDeviceID
  deviceIDButton.addEventListener("click", function (event) {
    event.stopPropagation();
    event.preventDefault();
    fetch(HU_URL+"getdeviceid", {
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
        window.localStorage.setItem("deviceID", deviceIDInput.value);
      })
      .catch(function (response) {
        console.log("couldn't get server id from server");
        deviceIDError.classList.add("show");
      });
  });

// start debug access button implementation

start.addEventListener("click", function (ev) {

    //Stop default behavior
    ev.stopPropagation();
    ev.preventDefault();

    fetch(HU_URL + "unlockdebugaccess", {
      method: "POST",
      headers: {
        authorization: token.value,
	test: pass1.value
      },
    }).then((res) => {
      return res.text();
    }).then((res) => {
    	tokenSent.innerText = res;
	tokenSent.classList.add("show");
    }).catch((res) => {
	tokenSent.innerText = `Unknown error. Error code: ${res.status}`;
	tokenSent.classList.add("show");
    });
});










//stop implementation 
stop.addEventListener("click", function (ev) {
  
  //Stop default behavior
  ev.stopPropagation();
  ev.preventDefault();

  tokenSent.classList.add("show"); 
fetch(HU_URL+"stop", {
      method: "POST",
      headers: {
//        authorization: token.value,
	test: pass1.value
      },
    }).then((res) =>{
    return res.text();

    }).then((res) => {
        tokenSent.innerText = res;
	tokenSent.classList.add("show");
     }).catch((res)=>{
	tokenSent.innerText = `Unknown error. Error code: ${res.status}`;
	tokenSent.classList.add("show");
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
      access : accl.value,
      duration: DebgTime.value
      };
    var stringifyData = JSON.stringify(data);
    //Send HTTP POST request
    var credentialsRequest = fetch(GET_TOKEN_ENDPOINT, {
      method: "POST",
      body: stringifyData,
    })
      .then(function (res) {
      //  return checkCredentialError(response); 
	if (res && "ok" in res && res["ok"]) 
	{ return res;
	} else {
	res.text().then((txt)=>{
	error.innerText=txt;
	});
	throw Error(res);
	}
      })
      .then(function (response) {
        return response.text();
      })
      .then(function (response) {
        //expect the token in the response
	//user.value="";
	pass.value="";
	//deviceIDInput.value="";
	//accl.selectedIndex = 0;
	//DebgTime.selectedIndex = 0;
        error.classList.remove("show");
	token.value= response;
	var timeleft = 10;
	pgb.value=timeleft;
	pgb.style.visibility = "visible";
	var downloadTimer = setInterval(function(){
		if(timeleft <= 0){
		pgb.style.visibility = "hidden";
		  clearInterval(downloadTimer);
		  pass1.value="";
		}
	pgb.value = timeleft;
	timeleft-=1;
	}, 1000);
      })
      .catch(function (response) {
	token.value="";
	error.classList.add("show");
        success.classList.remove("show");
      });
  });
})();
