
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
  'enter', 'enter door', 'enter the door', 'enter room', 'enter the room', 'enter the next room',
  'go', 'go door', 'go to door', 'go to the door', 'go through door', 'go through the door'
  ]

  var hints = {
    levelOne: ['hint1', 'hint2', 'hint3'],
    levelTwo: ['hint1', 'hint2', 'hint3'],
    levelThree: ['hint1', 'hint2', 'hint3']
  }

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
    console.log('checkLv1 is firing')

    // NEW SHIT

    var i = 0;
    var foundOpenSynonym = false;
    var foundCloseSynonym = false;
    var foundEnterSynonym = false;

    if (isDoorOpen === false) { // IF DOOR IS CLOSED
      console.log('THE DOOR IS CLOSED')
      while ((foundOpenSynonym === false) && (i < openSynonyms.length)) {
        if (currentInput === openSynonyms[i]) {
          console.log('CORRECT INPUT DETECTED')
          foundOpenSynonym = true;
        }
        i++;
      }
      if (foundOpenSynonym) {
        console.log('YOU OPEN THE DOOR')
        i = 0
        $inputLog.prepend('<li class="reply"> you opened the door <li>')
        $('.img-area').css('background', 'url(assets/L1_open.png)')
        isDoorOpen = true;
      }
    } else { // IF DOOR IS OPEN
      while ((!foundEnterSynonym) && (i < enterSynonyms.length)) {
        if (currentInput === enterSynonyms[i]) {
          foundEnterSynonym = true;
        }
        i++
      }
      if (foundEnterSynonym) {
        i = 0
        $inputLog.prepend('<li class="reply"> you enter the next room <li>')
        levelTwo()
        resetValues()
      }
    }

    //

    // if (!isDoorOpen) { // If door is closed
    //   if (currentInpsut === 'open') { // If you typed in open //////////////////////////////////////////////////////////
    //     $inputLog.prepend('<li class="reply"> you opened the door <li>') // Open the door
    //     isDoorOpen = true;
    //     updateGraphics()
    //   } else if (currentInput === 'close') { // If you typed in close
    //     $inputLog.prepend('<li class="reply"> the door is already closed... <li>')
    //   } else if (currentInput === 'enter') {
    //     $inputLog.prepend('<li class="reply"> the door is closed <li>')
    //   }
    // } else { // If door is open
    //   if (currentInput === 'enter') {
    //     $inputLog.prepend('<li class="reply"> you enter the next room <li>')
    //     levelTwo()
    //     resetValues()
    //   } else if (currentInput === 'open') {
    //     $inputLog.prepend('<li class="reply"> the door is already open... <li>')
    //   } else if (currentInput === 'close') {
    //     $inputLog.prepend('<li class="reply"> you close the door <li>')
    //     isDoorOpen = false;
    //     updateGraphics()
    //   }
    // }
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

      function checkIfCorrectLv1() {
        console.log('checkifCorrect Lv1 is firing')
        if (isDoorOpen === false) { // If door is closed
          if (currentInput === 'open') { // If you typed in open
            $inputLog.prepend('<li class="reply"> you opened the door <li>') // Open the door
            $('.img-area').css('background', 'url(assets/L1_open.png)')
            isDoorOpen = true;
          } else if (currentInput === 'close') { // If you typed in close
            $inputLog.prepend('<li class="reply"> the door is already closed... <li>')
          } else if (currentInput === 'enter') {
            $inputLog.prepend('<li class="reply"> the door is closed <li>')
          }
        } else { // If door is open
          if (currentInput === 'enter') {
            $inputLog.prepend('<li class="reply"> you enter the next room <li>')
            levelTwo()
            resetValues()
          } else if (currentInput === 'open') {
            $inputLog.prepend('<li class="reply"> the door is already open... <li>')
          } else if (currentInput === 'close') {
            $inputLog.prepend('<li class="reply"> you close the door <li>')
            $('.img-area').css('background', 'url(assets/L1_closed.png)')
            isDoorOpen = false;
          }
        }
      }
    }
  }

  function levelTwo() {
    $inputLog.prepend('<li class="reply"> LEVEL TWO <li>')
  }

});
