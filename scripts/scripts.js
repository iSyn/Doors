
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

  var hints = {
    levelOne: ['hint1', 'hint2', 'hint3'],
    levelTwo: ['hint1', 'hint2', 'hint3'],
    levelThree: ['hint1', 'hint2', 'hint3']
  }

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
  }
  // Start game
  startGame()

  function startGame() {

    if (gameStarted === false) {
      gameStarted = true;
      console.log('startGame() function firing')
      if (levelText === false) {
        levelText = true;
        $inputLog.prepend('<li class="reply"> Type "start" to start the game! <li>')
      }

      function checkIfCorrectLv0() {
        console.log('checkIfCorrect Lv0 is firing')
        if (currentInput === 'start') {
          console.log('player inputted start')
          console.log('game starting')
          resetValues()
          levelOne()
        }
      }

      getInput0()

      function getInput0() {
        console.log('getInput0() function firing')
         $playerInput.keypress(function(e) {
          if (e.which == 13) {
            currentInput = (document.getElementById('player-input').value).toLowerCase()
            console.log(currentInput + ' is the currentInput value')
            if (currentInput != "") {
              textLog()
              clearInputBox()
              checkIfCorrectLv0()
            }
          }
        })
      }
    }
  }


  function levelOne() {

    level = 1;
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
          if (currentInput === 'open') { // If you typed in open //////////////////////////////////////////////////////////
            $inputLog.prepend('<li class="reply"> you opened the door <li>') // Open the door
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
            isDoorOpen = false;
          }
        }
      }

      getInput1()

      function getInput1() {
        console.log('getInput1() function firing')
        $playerInput.keypress(function(e) {
          if (e.which == 13) {
            currentInput = (document.getElementById('player-input').value).toLowerCase()
            console.log(currentInput + ' is the currentInput value')
            if (currentInput != "") {
              textLog()
              clearInputBox()
              checkIfCorrectLv1()
            }
          }
        })
      }
    }
  }

  function levelTwo() {
    $inputLog.prepend('<li class="reply"> LEVEL TWO <li>')
  }





});
