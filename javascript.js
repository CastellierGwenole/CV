navigator.getUserMedia(constraints, successCallback, errorCallback);

function test() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

setInterval(test, 10);

function keyDownHandler(e){
document.getElementById("test").innerHTML = "jean";
}

function keyUpHandler(e){
    
}

if(window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", process, false);
  } else {
    // Le navigateur ne supporte pas l'événement devicemotion
  }

  function process(event) {
    var x = Math.round(100*event.accelerationIncludingGravity.x)/100;
    var y = Math.round(100*event.accelerationIncludingGravity.y)/100;
    var z = Math.round(100*event.accelerationIncludingGravity.z)/100;
document.getElementById("x").innerHTML = "x :"+ x;
document.getElementById("y").innerHTML = "y :"+ y;
document.getElementById("z").innerHTML = "z :"+ z;
    
  }