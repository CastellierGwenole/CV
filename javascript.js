var prenom = "toto";
document.getElementById("test").innerHTML = prenom;

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
    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;
document.getElementById("test").innerHTML = "x :"+ x + "y :" + y + "z :" + z;
    
  }