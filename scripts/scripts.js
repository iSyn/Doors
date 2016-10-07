
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

  // $('.img-area').css('background-size', '100% 100%')

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
    'go', 'go door', 'go to door', 'go to the door', 'go through door', 'go through the door', 'go through',
    'go to next level', 'go to the next level'
  ]

  var unlockSynonyms = [
    'unlock', 'unlock door', 'unlock the door', 'turn the lock', 'twist the lock'
    //
  ]

  var hints = {
    levelOne: ['do you really need this?', 'type in: open door', 'then type: "enter"'],
    levelTwo: ['hint1', 'hint2', 'hint3'],
    levelThree: ['hint1', 'hint2', 'hint3']
  }


  function displayHint() {
    if (level === 1) {
      if (hint === 0) {
        $inputLog.prepend('<li class="reply">' + (hints.levelOne[0]) + '</li>')
        hint++
      } else if (hint === 1) {
        $inputLog.prepend('<li class="reply">' + (hints.levelOne[1]) + '</li>')
        hint++
      } else if (hint === 2) {
        $inputLog.prepend('<li class="reply">' + (hints.levelOne[2]) + '</li>')
        hint = 0
      }
    } else if (level === 2) {
      if (hint === 0) {
        $inputLog.prepend('<li class="reply">' + (hints.leveltwo[0]) + '</li>')
        hint++
      } else if (hint === 1) {
        $inputLog.prepend('<li class="reply">' + (hints.leveltwo[1]) + '</li>')
        hint++
      } else if (hint === 2) {
        $inputLog.prepend('<li class="reply">' + (hints.leveltwo[2]) + '</li>')
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

  preloadImages(['assets/L1_closed.png','assets/L1_open.png','assets/L2_closed.png'])

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
    o = 0; // Open
    c = 0; // Close
    e = 0; // Enter
    hint = 0;
  }

  function helpText() {
    $inputLog.prepend('<li class="reply"> If you need a little boost, type: "hint" </li>')
    $inputLog.prepend('<li class="reply"> These are not all of the commands! Experiment! </li>')
    $inputLog.prepend('<li class="reply"> "open", "close", "enter", etc. </li>')
    $inputLog.prepend('<li class="reply"> -------------- </li>')
    $inputLog.prepend('<li class="reply"> BASIC COMMANDS </li>')
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
    if (level === 0) {
      console.log('updated graphics for lv0')
      $('.img-area').css('background', 'url(assets/menuDoor.png)')
    }
    if (level === 1) {
      if (isDoorOpen === false) {
        console.log('updated graphics for lv1')
        $('.img-area').css('background', 'url(assets/L1_closed.png)')
      } else {
        $('.img-area').css('background', 'url(assets/L1_open.png)')
      }
    }
    if (level === 2) {
      console.log('updated graphics for lv2')
      if (isDoorOpen === false) {
        $('.img-area').css('background', 'url(assets/L2_closed.png)')
      } else {
        $('.img-area').css('background', 'url(assets/L2_open.png)')
      }
    }
  }

  updateGraphics()
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
      $inputLog.prepend('<li class="error"> Just type "start" or "start game"... </li>')
    }
  }

  function checkLv1() {
    var o = 0;
    var c = 0;
    var e = 0;
    var foundOpenSynonym = false;
    var foundCloseSynonym = false;
    var foundEnterSynonym = false;

    if (currentInput === 'help') {
      helpText()
    } else if (currentInput === 'hint') {
      displayHint()
    }


    if (isDoorOpen === false) { // IF DOOR IS CLOSED
      while ((foundOpenSynonym === false) && (o < openSynonyms.length)) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      while ((foundEnterSynonym === false) && (e < enterSynonyms.length)) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      while ((foundCloseSynonym === false) && (c < closeSynonyms.length)) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
        }
        c++;
      }
      if (foundOpenSynonym) {
        openDoor.play()
        o = 0;
        $inputLog.prepend('<li class="reply"> you opened the door </li>')
        $('.img-area').css('background', 'url(assets/L1_open.png)')
        isDoorOpen = true;
      } else if (foundCloseSynonym) {
        $inputLog.prepend('<li class="reply">The door is already closed...... </li>')
        c = 0;
      } else if (foundEnterSynonym) {
        $inputLog.prepend('<li class="reply">How does one enter a closed door... </li>')
      } else if ((currentInput != 'help') && (currentInput != 'hint')) {
        $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
      }
    } else { // IF DOOR IS OPEN
      while ((!foundEnterSynonym) && (e < enterSynonyms.length)) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      while ((!foundCloseSynonym) && (c < closeSynonyms.length)) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
          $('.img-area').css('background', 'url(assets/L1_closed.png)')
        }
        c++;
      }
      while ((!foundOpenSynonym) && (o < openSynonyms.length)) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      if (foundOpenSynonym) {
        o = 0;
        $inputLog.prepend('<li class="reply"> The door is already open... <li>')
      } else if (foundEnterSynonym) {
        e = 0;
        $inputLog.prepend('<li class="reply"> you enter the next room <li>')
        levelTwo()
        resetValues()
      } else if (foundCloseSynonym) {
        c = 0;
        $inputLog.prepend('<li class="reply"> you close the door <li>')
        closeDoor.play()
        isDoorOpen = false;
      } else if ((currentInput != 'help') && (currentInput != 'hint')) {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" not recognized. Type "help" for a list of commands. <li>')
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
    resetValues()
    if (level === 1) {
      if (levelText === false) {
        levelText = true;
        $inputLog.prepend('<li class="reply"> ------------------------------- <li>')
        $inputLog.prepend('<li class="reply"> LEVEL ONE - Just a regular door <li>')
        $inputLog.prepend('<li class="reply"> ------------------------------- <li>')
      }
    }
  }

  function levelTwo() {
    $inputLog.prepend('<li class="reply"> LEVEL TWO <li>')
    level = 2;
    resetValues()
    updateGraphics()
    if (levelText === false) {
      levelText = true;
      $inputLog.prepend('<li class="reply"> -------------------------------------- <li>')
      $inputLog.prepend('<li class="reply"> LEVEL TWO - Just a regular locked door <li>')
      $inputLog.prepend('<li class="reply"> -------------------------------------- <li>')
    }
  }

});
