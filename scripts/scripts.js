
$(function() { // On document ready

  console.log('//////////////////////////////////////////////////////')
  console.log('/     *                 DOORS                  *     /')
  console.log('/         *        by Synclair Wang       *          /')
  console.log('//////////////////////////////////////////////////////')

  var $playerInput = $('#player-input');
  var gameStarted = false;
  var currentInput = "";
  var levelText = false;
  var isDoorOpen = false;
  var $inputLog = $('.history-area')
  var spacer = $('<br>')
  var level = 0
  var hint = 0

  $('.img-area').css('background-size', '100% 100%')

  var startSynonyms = [
    'start', 'start game', 'start the game'
  ]

  var openSynonyms = [
    'open', 'open door', 'open the door',
    'pull', 'pull door', 'pull the door', 'pull the door open'
  ]

  var closeSynonyms = [
    'close', 'close door', 'close the door',
    'shut', 'shut door', 'shut the door'
  ]

  var enterSynonyms = [
    'enter', 'enter door', 'enter the door', 'enter room', 'enter the room', 'enter the next room', 'enter next room',
    'go', 'go door', 'go to door', 'go to the door', 'go through door', 'go through the door',
    'go to next level', 'go to the next level'
  ]

  var hints = {
    levelOne: ['do you really need this?', 'type in: open door', 'then type: "go"'],
    levelTwo: ['hint1', 'hint2', 'hint3'],
    levelThree: ['hint1', 'hint2', 'hint3']
  }

  function displayHint() {
    if (level === 1) {
      if (hint === 0) {
        $inputLog.prepend('<li class="reply">' + (hints.levelOne[0]) + '<li>')
        hint++
      } else if (hint === 1) {
        $inputLog.prepend('<li class="reply">' + (hints.levelOne[1]) + '<li>')
        hint++
      } else if (hint === 2) {
        $inputLog.prepend('<li class="reply">' + (hints.levelOne[2]) + '<li>')
        hint = 0
      }
    }
  }

  var closeDoor = document.createElement("audio");
  var openDoor = document.createElement("audio");



  closeDoor.src="assets/closeDoor.mp3";
  closeDoor.autoPlay=false;
  closeDoor.preLoad=true;

  openDoor.src="assets/openDoor.mp3"
  openDoor.autoPlay=false;
  openDoor.preLoad=true;      
 


  function preloadImages(arrayOfImages) {
    $(arrayOfImages).each(function() {
      $('<img/>')[0].src = this;
    })
  }

  preloadImages(['assets/L1_closed.png','assets/L1_open.png'])

  function clearInputBox() {
    document.getElementById('player-input').value = "";
    // $playerInput.value = ""; // <--- ask about this. /////////////////////////////////////////////////////////////
  }

  function textLog() {
    var $historyArea = $('.history-area')
    var $inputHistory = $('<li>').text('> ' + currentInput)
    $historyArea.prepend($inputHistory)
  }

  function resetValues() {
    levelText = false;
    isDoorOpen = false;
    currentInput = "";
    i=0;
    x=0;
  }

  function getInput() {
    console.log('getInput function firing')
    $playerInput.keypress(function(e) {
      if (e.which == 13) {
        currentInput = (document.getElementById('player-input').value).toLowerCase()
        console.log(currentInput + ' is the currentInput value')
        if (currentInput != "") {
          textLog()
          clearInputBox()
          if (level === 0) {
            checkLv0()
          } else if (level === 1) {
            checkLv1()
          } else if (level === 2) {
            checkLv2()
          }
        }
      }
    })
  }

  function updateGraphics() {
    if (level === 1) {
      if (isDoorOpen === false) {
        $('.img-area').css('background', 'url(assets/L1_closed.png)')
      } else {
        $('.img-area').css('background', 'url(assets/L1_open.png)')
      }
    }
  }

  getInput()

  function checkLv0() {
    console.log('checkLv0 is firing')
    var i = 0;
    var foundInput = false;

    while((!foundInput) && (i < startSynonyms.length)) {
      if (currentInput === startSynonyms[i]) {
        foundInput = true;
      }
      i++;
    }
    if (foundInput) {
      console.log('game starting')
      resetValues()
      levelOne()
    } else {
      $inputLog.prepend('<li class="error"> command "' + currentInput + '" is not recognized <li>')
    }
  }

  function checkLv1() {
    var o = 0;
    var c = 0;
    var e = 0;
    var foundOpenSynonym = false;
    var foundCloseSynonym = false;
    var foundEnterSynonym = false;

    if (currentInput === 'hint') {
      displayHint()
    }

    if (isDoorOpen === false) { // IF DOOR IS CLOSED
      console.log('THE DOOR IS CLOSED')
      while ((foundOpenSynonym === false) && (o < openSynonyms.length)) {
        if (currentInput === openSynonyms[o]) {
          console.log('CORRECT INPUT DETECTED')
          foundOpenSynonym = true;
        }
        o++;
      }
      if (foundOpenSynonym) {
        console.log('YOU OPEN THE DOOR')
        openDoor.play()
        o = 0
        $inputLog.prepend('<li class="reply"> you opened the door <li>')
        $('.img-area').css('background', 'url(assets/L1_open.png)')
        isDoorOpen = true;
      } else {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" is not recognized <li>')
      }
      while ((foundEnterSynonym === false) && (e < enterSynonyms.length)) {
        if (currentInput === enterSynonyms[e]) {
          $inputLog.prepend('<li class="reply">how does one go through a closed door... <li>')
          e = 0;
          foundEnterSynonym = true
        }
        e++
      }
    } else { // IF DOOR IS OPEN
      while ((!foundEnterSynonym) && (e < enterSynonyms.length)) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++
      }
      while ((!foundCloseSynonym) && (c < closeSynonyms.length)) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
          $('.img-area').css('background', 'url(assets/L1_closed.png)')
        }
        c++
      }
      if (foundEnterSynonym) {
        e = 0
        $inputLog.prepend('<li class="reply"> you enter the next room <li>')
        levelTwo()
        resetValues()
      }
      if (foundCloseSynonym) {
        c=0;
        $inputLog.prepend('<li class="reply"> you close the door <li>')
        closeDoor.play()
        isDoorOpen = false;
      } else {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" is not recognized <li>')
      }
    }
  }

  // Start game
  startGame()

  function startGame() {
    console.log('START GAME')
    if (gameStarted === false) {
      gameStarted = true;
      console.log('startGame() function firing')
      if (levelText === false) {
        levelText = true;
        $inputLog.prepend('<li class="reply"> Type "start" to start the game! <li>')
      }
    }
  }


  function levelOne() {
    console.log('LEVEL ONE')
    level = 1;
    updateGraphics()
    if (level === 1) {
      if (levelText === false) {
        levelText = true;
        $inputLog.prepend('<li class="reply"> type open door <li>')
        $inputLog.prepend('<li class="reply"> Welcome to the tutorial level <li>')
        $inputLog.prepend('<li class="reply"> LEVEL ONE <li>')
      }
    }
  }

  function levelTwo() {
    $inputLog.prepend('<li class="reply"> LEVEL TWO <li>')
  }

});
