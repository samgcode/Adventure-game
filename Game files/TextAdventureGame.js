const playerImg = '../Images/interactable/move points/Player.png';
const movePointImg = '../Images/interactable/move points/MovePoint.png';
const buttonImg = '../Images/interactable/buttons/Button.png';
const buttonActiveImg = '../Images/interactable/buttons/ButtonPressed.png';
const timer = document.getElementsByClassName('timer')[0];

var playerState = 'default';
var level = 1;
var levelCount = document.getElementsByClassName('level').length;
var state;

var playerStage = 1;

var startTime;

var enemyBeat = true;

setup();

function setup() {
  hideLevels();

  var combatScreen = document.getElementById('enemy-combat');
  combatScreen.style.visibility = 'hidden';
}

function startGame() {
  startTimer();
  var levels = document.getElementsByClassName('level');
  for (var i = 0; i < levels.length; i++) {
    levels[i].style.visibility = '';
  }

  timer.style.visibility = '';

  var titleScreen = document.getElementsByClassName('title-screen')[0];
  titleScreen.style.visibility = 'hidden';

  var combatScreen = document.getElementById('enemy-combat');
  combatScreen.style.visibility = 'hidden';

  sizing();
}

function hideLevels() {
  var levels = document.getElementsByClassName('level');
  for (var i = 0; i < levels.length; i++) {
    levels[i].style.visibility = 'hidden';
  }
}


var timerInterval;
var timerStarted = false;
function startTimer() {
  if(timerStarted != true) {
    startTime = new Date().getTime();
    timerInterval = setInterval(calcTime, 1);
  }
  timerStarted = true;
}

var currentTime;
function calcTime() {
  currentTime = new Date().getTime();
  var time = (currentTime - startTime)/1000;
  timer.textContent = `Time: ${time}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function loadNextLevel() {
  playerStage = 1;
  enemyBeat = false;
  removeElementById(level);
  level++;
  if(level === levelCount) {
    stopTimer();
  }
}

document.addEventListener('keydown', (event) => {
    var key = event.key || event.keyCode;
    console.log(key);
    if(key === 'w' || key === 'W') {
      alert('we chillin');
    }
    if(key === 'Shift') {
      window.location.reload();
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
    } else if(targetClass === 'enemy') {
      startCombat(target);
    }
});

function movePlayer(target) {
  var div = document.getElementById(`${level}`);
  var movePoints = div.getElementsByClassName('player-clickable');
  for(var i = 0; i < movePoints.length; i++) {
    movePoints[i].src = movePointImg;
  }
  target.src = playerImg;

  getState(target);
}

function getState(point) {
  buttonClass = point.className.split(' ')[1];

  if(buttonClass == 'button-point') {
    state = 'button';

  } else if(buttonClass === 'door-point') {
    state = 'door';
    checkComplete();

  } else {
    state = 'default';
  }
}

var complete = false;

function updateButton(button, movePointStage) {
  var stageDiv = button.parentNode;
  var stage = stageDiv.className.split(' ')[1];
  var levelDiv = stageDiv.parentNode;
  var buttonLvl = levelDiv.id;

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

function sizing(){
  var amount = document.getElementsByClassName('wall-vertical-780');
  for(var i = 0; i < amount.length; i++){
    document.getElementsByClassName('wall-vertical-780')[i].style.width = '30px';
    document.getElementsByClassName('wall-vertical-780')[i].style.height = '780px';
  }
  amount = document.getElementsByClassName('wall-vertical-200');
  for(var i = 0; i < amount.length; i++){
    document.getElementsByClassName('wall-vertical-200')[i].style.width = '30px';
    document.getElementsByClassName('wall-vertical-200')[i].style.height = '200px';
  }
  amount = document.getElementsByClassName('wall-horizontal-200');
  for(var i = 0; i < amount.length; i++){
    document.getElementsByClassName('wall-horizontal-200')[i].style.width = '200px';
    document.getElementsByClassName('wall-horizontal-200')[i].style.height = '30px';
  }
  amount = document.getElementsByClassName('wall-horizontal-780');
  for(var i = 0; i < amount.length; i++){
    document.getElementsByClassName('wall-horizontal-780')[i].style.width = '780px';
    document.getElementsByClassName('wall-horizontal-780')[i].style.height = '30px';
  }
  amount = document.getElementsByClassName('spike-180');
  for(var i = 0; i < amount.length; i++){
    document.getElementsByClassName('spike-180')[i].style.width = '180px';
    document.getElementsByClassName('spike-180')[i].style.height = '50px';
  }
  amount = document.getElementsByClassName('spike-down-180');
  for(var i = 0; i < amount.length; i++){
    document.getElementsByClassName('spike-down-180')[i].style.width = '180px';
    document.getElementsByClassName('spike-down-180')[i].style.height = '25px';
  }
}





var enemyHealth;
var enemyStage;

function startCombat(target) {
  var stageDiv = target.parentNode;
  enemyStage = stageDiv.className.split(' ')[1];

  if(enemyStage <= playerStage) {
    hideLevels();
    var combatScreen = document.getElementById('enemy-combat');
    combatScreen.style.visibility = '';
    enemyHealth = randomNum(2, 4);
    combat();
  }
}

var qteTimer = document.getElementById('qte-timer');

var button = document.getElementById('qte-btn');
var bufferX = 800;
var bufferY = 400;
var randomX = randomNum(bufferX, 1920-bufferX);
var randomY = randomNum(bufferY, 1080-bufferY);

var qteTime = 3;

var qteInterval;

function combat() {
  button.style = `margin-left: ${randomX}px; margin-top: ${randomY}px`;
  qteInterval = setInterval(countDown, 1000);
}

function countDown() {
  qteTime--;
  updateTimer();
  if(qteTime <= 0) {
    window.location.reload();
  }
}

function updateTimer() {
    qteTimer.textContent = `Time: ${qteTime}`;
}

//get a random number
function randomNum(min, max) {
   return Math.floor(Math.random() * (max + 1 - min) + min);
}

function moveBtn() {
  qteTime = 3;
  updateTimer()
  randomX = randomNum(bufferX, 1920-bufferX);
  randomY = randomNum(bufferY, 1080-bufferY);
  button.style = `margin-left: ${randomX}px; margin-top: ${randomY}px`;
  enemyHealth--;
  if(enemyHealth <= 0) {
    stopCombat();
  }
}

function stopCombat() {
  enemyBeat = true;
  clearInterval(qteInterval);
  var stageDiv = document.getElementsByClassName(`stage ${enemyStage}`)[0];
  var enemyImg = stageDiv.getElementsByClassName('enemy')[0];
  stageDiv.removeChild(enemyImg);
  startGame();
  checkComplete();
}

function checkComplete() {
  var door = document.getElementsByClassName(`door-${level}`)[0];
  if(door.className.split(' ')[2] == 'open' && enemyBeat === true && state === 'door') {
    loadNextLevel();
  }
}


















































//
