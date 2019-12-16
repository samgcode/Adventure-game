const playerImg = '../Images/interactable/move points/Player.png';
const movePointImg = '../Images/interactable/move points/MovePoint.png';
const buttonImg = '../Images/interactable/buttons/Button.png';
const buttonActiveImg = '../Images/interactable/buttons/ButtonPressed.png';
const timer = document.getElementsByClassName('timer')[0];

var playerState = 'default';
var level = 1;
var state;

var levelNode;
var levelNodes;

var playerStage = 1;

var startTime;

start();
function  start() {
  startTimer();
}

var timerInterval;
function startTimer() {
  startTime = new Date().getTime();
  timerInterval = setInterval(calcTime, 1);
}

var currentTime;
function calcTime() {
  currentTime = new Date().getTime();
  var time = (currentTime - startTime)/1000;
  timer.textContent = time;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function loadNextLevel() {
  playerStage = 1;
  removeElementById(level);
  level++;
  if(level === 3) {
    stopTimer();
  }
}

document.addEventListener('keydown', (event) => {
    var key = event.key || event.keyCode;
    console.log(key);
    if(key === 'w' || key === 'W') {
      alert('we chillin');
    }
  }
);

var moveStage = 0;

document.addEventListener('click', (event) => {
    var posX = event.pageX;
    var posY = event.pageY;
    console.log(`x = ${posX}, y = ${posY}`);
    var target = event.target;
    var targetClass = target.className.split(' ')[0];
    if(targetClass === 'player-clickable') {
      var targetDiv = target.parentNode;
      var targetStage = targetDiv.className.split(' ')[1];
      if(parseInt(targetStage) <= playerStage) {
        moveStage = targetStage;
        movePlayer(target);
      }
    } else if(targetClass === 'button') {
      updateButton(target, moveStage);
    }
});

function getPlayer(target) {
  var levelDiv = target.parentNode.parentNode;
  var movePoints = levelDiv.getElementsByClassName('player-clickable');

  for(var i = 0; i < movePoints.length; i++) {
    if(movePoints[i].src === "file:///Users/samgaudet/Documents/TextGame/Adventure-game/Images/interactable/move%20points/Player.png") {
      return movePoints[i];
    }
  }
}

function movePlayer(target) {
  var div = document.getElementById(`${level}`);
  var movePoints = div.getElementsByClassName('player-clickable');
  for(var i = 0; i < movePoints.length; i++) {
    movePoints[i].src = movePointImg;
  }
  target.src = playerImg;

  getState(target);
}

function  getState(point) {
  buttonClass = point.className.split(' ')[1];

  if(buttonClass == 'button-point') {
    state = 'button';

  } else if(buttonClass === 'door-point') {
    state = 'door';
    var door = document.getElementsByClassName(`door-${level}`)[0];
    if(door.className.split(' ')[1] == 'open') {
      console.log('test');
      loadNextLevel();
    }
  } else {
    state = 'default';
  }
  console.log(state);
}

var complete = false;

function updateButton(button, movePointStage) {
  var stageDiv = button.parentNode;
  var stage = stageDiv.className.split(' ')[1];
  var levelDiv = stageDiv.parentNode;
  var buttonLvl = levelDiv.id;

  console.log(stage);
  console.log(playerStage);
  console.log(movePointStage);

  if(state === 'button') {
    if(parseInt(stage) === playerStage && playerStage === parseInt(movePointStage)) {
      button.src = buttonActiveImg;

      var spike = stageDiv.getElementsByClassName('spike')[0];

      removeElement(spike);

      var spikes = levelDiv.getElementsByClassName('spike');
      var spikeCount = spikes.length;

      playerStage++;
      if(spikeCount <= 0) {
        var door = levelDiv.getElementsByClassName(`door-${level}`)[0];
        door.className = `${door.className} open`;
      }
    }
  }
}

function removeElement(element) {
  element.parentNode.removeChild(element);
}

function removeElementById(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function removeElementByClass(className) {
  var elem = document.getElementsByClassName(className)[0];
  elem.parentNode.removeChild(elem);
}













































//
