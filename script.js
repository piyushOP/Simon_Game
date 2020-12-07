
let buttonColors = ["red","green","yellow","blue"];

let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function(){
    if(!started){
        document.querySelector("#level-title").innerHTML="LEVEL "+level;
        started = true;
        nextSequence();
    }
});


$(".btn").click(function(){
    let userChooseColor = $(this).attr("id");
    userClickedPattern.push(userChooseColor);

    playSound(userChooseColor);
    buttonAnimation(userChooseColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
      document.querySelector("body").classList.add("game-over");
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    document.querySelector("#level-title").innerHTML="LEVEL "+level;
    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = buttonColors[randomNumber];

    gamePattern.push(randomColor);
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function startOver(){
    level  =0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

function buttonAnimation(id){
    let animateBtn = document.querySelector("."+id);
    animateBtn.classList.add("pressed");
    setTimeout(function(){
        animateBtn.classList.remove("pressed");
    },100)
}

function playSound(id){
    let sound = new Audio("sounds/"+id+".mp3");
    sound.play();
}