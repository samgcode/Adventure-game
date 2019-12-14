const playerImg = '../Images/interactable/move points/Player.png';
const movePointImg = '../Images/interactable/move points/MovePoint.png';
const buttonImg = '../Images/interactable/buttons/Button.png';
const buttonActiveImg = '../Images/interactable/buttons/ButtonPressed.png';

var playerState = 'default';
var level = 1;

var levelNode;
var levelNodes;

//setTimeout(loadNextLevel, 2000);

function loadNextLevel() {
  removeElement(level);
  level++;
}


function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    element.parentNode.removeChild(element);
}

function removeElementByClass(className) {
  var elem = document.getElementsByClassName(className)[0];
  elem.parentNode.removeChild(elem);
}

document.addEventListener('keydown', (event) => {
    var key = event.key || event.keyCode;
    console.log(key);
    if(key === 'w' || key === 'W') {
      alert('we chillin');
    }
  }
);

document.addEventListener('click', (event) => {
    var posX = event.pageX;
    var posY = event.pageY;
    console.log(`x = ${posX}, y = ${posY}`);
    var target = event.target;
    var targetClass = target.className.split(' ')[0];
    if(targetClass === 'player-clickable') {
      movePlayer(target);
    } else if(targetClass === 'button') {
      updateButton(target);
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

function updateButton(button) {
    if(state === 'button') {
      button.src = buttonActiveImg;
      complete = true;
    } else {
      return;
    }
    if(complete === true) {
      removeElementByClass('spike');
      var door = document.getElementsByClassName(`door-${level}`)[0];
      door.className = `${door.className} open`
    }
}





















































//
