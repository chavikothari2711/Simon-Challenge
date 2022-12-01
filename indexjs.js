var colour = ["red","blue","green","yellow"];
var userClickedPattern=[];
var userPressedPattern=[];
var gamePattern = [];
var level = 0;
var started = false;
$(document).click(function(event){
  if(!started){
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSounds(userChosenColour+".mp3");
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1)
});



function startOver(){
  gamePattern = [];
  level = 0;
  started = false;
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSounds("wrong.mp3");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Click Anywhere to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function playSounds(name){
  var audio = new Audio("sounds/"+name);
  audio.play();
}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var x = Math.floor(Math.random()*4);
  var randomChosenColour = colour[x];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSounds(randomChosenColour+".mp3");
}
