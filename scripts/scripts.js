
$(function() { // On document ready

  console.log('//////////////////////////////////////////////////////')
  console.log('/     *                 DOORS                  *     /')
  console.log('/         *        by Synclair Wang       *          /')
  console.log('//////////////////////////////////////////////////////')


  var $playerInput = $('#player-input');
  var gameStarted = false;
  var currentInput = "";
  var levelText = false;
  var $inputLog = $('.history-area')
  var spacer = $('<br>')
  var level = 0
  var hint = 0
  var isDoorOpen = false;
  var isDoorLocked = true;
  var isKeyFound = false;
  var isMatRemoved = false;

  var startSynonyms = [
    'start',
    'start game',
    'start the game'
  ]

  var openSynonyms = [
    'open',
    'open door',
    'open the door'
  ]

  var pushSynonyms = [
    'push',
    'push door',
    'push the door',
    'push the door open'
  ]

  var pullSynonyms = [
    'pull',
    'pull door',
    'pull the door',
    'pull the door open'
  ]

  var closeSynonyms = [
    'close',
    'close door',
    'close the door',
    'shut',
    'shut door',
    'shut the door'
  ]

  var enterSynonyms = [
    'enter',
    'enter door',
    'enter the door',
    'enter room',
    'enter the room',
    'enter the next room',
    'enter next room',
    'go',
    'go door',
    'go to door',
    'go to the door',
    'go through door',
    'go through the door',
    'go through',
    'go to next level',
    'go to the next level',
    'go in'
  ]

  var unlockSynonyms = [
    'unlock',
    'unlock door',
    'unlock the door',
    'turn the lock',
    'twist the lock'
  ]

  var lockSynonyms = [
    'lock',
    'lock door',
    'lock the door'
  ]

  var pickUpSynonyms = [
    'key',
    'pick up',
    'pick up key',
    'pick key up',
    'pick up the key',
    'pick the key up',
    'pick up key from floor',
    'pick up the key from the floor',
    'pick up the key on the floor',
    'take it',
    'take the key',
    'take key',
    'take the key from the floor',
    'take the key on the floor'
  ]

  var useKeySynonyms = [
    'key the door',
    'use key',
    'use the key',
    'use key on door',
    'use key on the door',
    'use the key on door',
    'use the key on the door',
    'unlock the door with key',
    'unlock the door with the key',
    'unlock door with key',
    'unlock door with the key',
    'put key in door',
    'put the key in door',
    'put the key in the door',
    'put key in the door',
    'put key in lock',
    'put the key in lock',
    'put the key in lock',
    'put the key in the lock',

  ]

  var checkMatSynonyms = [
    'mat',
    'check mat',
    'check the mat',
    'check under mat',
    'check under the mat',
    'look mat',
    'look at mat',
    'look at the mat',
    'look under mat',
    'look under the mat',
    'remove mat',
    'remove the mat',
    'move mat',
    'move the mat',
    'lift mat'

  ]

  var hints = {
    levelOne: ['do you really need this?', 'type in: open door', 'then type: "enter"'],
    levelTwo: ['the door is locked... what do you do', 'are you sure...', '"unlock door"'],
    levelThree: ['What type of door does it look like?', 'opposite of push', '"pull"'],
    levelFour: ['that mat looks suspicious', 'check under the mat', 'get the key from under the mat, then unlock the door!']
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
        $inputLog.prepend('<li class="reply">' + (hints.levelTwo[0]) + '</li>')
        hint++
      } else if (hint === 1) {
        $inputLog.prepend('<li class="reply">' + (hints.levelTwo[1]) + '</li>')
        hint++
      } else if (hint === 2) {
        $inputLog.prepend('<li class="reply">' + (hints.levelTwo[2]) + '</li>')
        hint = 0
      }
    } else if (level === 3) {
      if (hint === 0) {
        $inputLog.prepend('<li class="reply">' + (hints.levelThree[0]) + '</li>')
        hint++
      } else if (hint === 1) {
        $inputLog.prepend('<li class="reply">' + (hints.levelThree[1]) + '</li>')
        hint++
      } else if (hint === 2) {
        $inputLog.prepend('<li class="reply">' + (hints.levelThree[2]) + '</li>')
        hint = 0
      }
    } else if (level === 4) {
      if (hint === 0) {
        $inputLog.prepend('<li class="reply">' + (hints.levelFour[0]) + '</li>')
        hint++
      } else if (hint === 1) {
        $inputLog.prepend('<li class="reply">' + (hints.levelFour[1]) + '</li>')
        hint++
      } else if (hint === 2) {
        $inputLog.prepend('<li class="reply">' + (hints.levelFour[2]) + '</li>')
        hint = 0
      }
    }
  }

  var closeDoor = document.createElement("audio")
  var openDoor = document.createElement("audio")
  var lockSound = document.createElement("audio")
  var shootSound = document.createElement('audio')
  var bgm_main = document.createElement('audio')
  var carpet_shuffle = document.createElement('audio')
  var keyJingle = document.createElement('audio')

  closeDoor.src="assets/sfx/closeDoor.mp3";
  closeDoor.preLoad=true;
  openDoor.src="assets/sfx/openDoor.mp3";
  openDoor.preLoad=true;   
  lockSound.src='assets/sfx/lock.mp3';
  lockSound.preLoad=true;
  shootSound.src='assets/sfx/shoot.wav';
  shootSound.preLoad=true;
  shootSound.volume=0.5;
  bgm_main.src='assets/sfx/bgm_main.wav'
  bgm_main.preLoad=true;
  bgm_main.loop=true;
  bgm_main.volume=0.2;
  carpet_shuffle.src='assets/sfx/carpet_shuffle.wav'
  carpet_shuffle.preLoad=true;
  keyJingle.src='assets/sfx/pickupKey.wav'
  keyJingle.preLoad=true;

 
  bgm_main.play()

  function preloadImages(img) { // This preloads all images
    $(img).each(function() { // For each image
      $('<img/>')[0].src = this; // Preload it
    })
  }

  preloadImages([
    //level one images
    'assets/L1_closed.png','assets/L1_open.png',
    //level two images
    'assets/L2_closedLocked.png', 'assets/L2_closedUnlocked.png', 'assets/L2_open.png',
    //level three images
    'assets/L3_closed.png', 'assets/L3_open.png',
    //level four images
    'assets/L4_keyGone.png', 'assets/L4_matOff.png', 'assets/L4_matOn.png', 'assets/L4_open.png', 'assets/L4_usedKey.png'
    ])

  function clearInputBox() {
    document.getElementById('player-input').value = ""; // Sets the player input to "" after enter press
  }

  function textLog() { // This function deals with putting what the player types into the command section into the history section
    var $historyArea = $('.history-area')
    var $inputHistory = $('<li>').text('> ' + currentInput) // puts what the player inputed into a variable
    $historyArea.prepend($inputHistory) // appends the variable into the history area
  }

  function resetValues() { // Resets the values whenever called
    levelText = false;
    isDoorOpen = false;
    isDoorLocked = true;
    currentInput = "";
    o = 0; // Open
    c = 0; // Close
    e = 0; // Enter
    hint = 0;
  }

  function helpText() {
    $inputLog.prepend('<li class="reply"> These are not all of the commands! Experiment! </li>')
    $inputLog.prepend('<li class="reply"> "open", "close", "enter", etc. </li>')
    $inputLog.prepend('<li class="reply"> If you need a little boost, type: "<span class="yellow">hint </span>" </li>')
    $inputLog.prepend('<li class="reply"> -------------- </li>')
    $inputLog.prepend('<li class="reply"> BASIC COMMANDS </li>')
  }

  function getInput() {
    $playerInput.keypress(function(e) {
      if (e.which == 13) { // Whenever player hits enter
        currentInput = (document.getElementById('player-input').value).toLowerCase() // Changes player input to lower case
        if (currentInput != "") { // If current input isnt empty
          textLog() // Log whatever the player wrote into history area
          clearInputBox() // Clears input
          if (level === 0) {
            checkLv0()
          } else if (level === 1) {
            checkLv1()
          } else if (level === 2) {
            checkLv2()
          } else if (level === 3) {
            checkLv3()
          } else if (level === 4) {
            checkLv4()
          }
        }
        if (currentInput === 'hire me please') {
          level = 'secret';
          secretLevel();
        }
      }
    })
  }

  function updateGraphics() { // This function updates the graphics
    if (level === 0) {
      $('.img-area').css('background', 'url(assets/menuDoor.png)')
    }
    if (level === 1) {
      if (isDoorOpen === false) {
        $('.img-area').css('background', 'url(assets/L1_closed.png)')
      } else {
        $('.img-area').css('background', 'url(assets/L1_open.png)')
      }
    }
    if (level === 2) {
      if (isDoorOpen === false) {
        if (isDoorLocked === true) {
          $('.img-area').css('background', 'url(assets/L2_closedLocked.png)')
        } else {
          $('.img-area').css('background', 'url(assets/L2_closedUnlocked.png)')
        }
      } else {
        $('.img-area').css('background', 'url(assets/L2_open.png)')
      }
    }
    if (level === 3) {
      if (isDoorOpen === false) {
        $('.img-area').css('background', 'url(assets/L3_closed.png)')
      } else {
        $('.img-area').css('background', 'url(assets/L3_open.png)')
      }
    }
    if (level === 4) {
      if (!isDoorOpen) {
        if (isDoorLocked) {
          if (!isKeyFound) {
            if (!isMatRemoved) {
              $('.img-area').css('background', 'url(assets/L4_matOn.png)')
            } else {
              $('.img-area').css('background', 'url(assets/L4_matOff.png)')
            }
          } else {
            $('.img-area').css('background', 'url(assets/L4_keyGone.png)')
          }
        } else {
          $('.img-area').css('background', 'url(assets/L4_usedKey.png)')
        }
      } else {
        $('.img-area').css('background', 'url(assets/L4_open.png)')
      }
    }
    if (level === 'secret') {
      console.log('updated graphics to secret')
      $('.img-area').css('background', 'url(https://media.giphy.com/media/Z7BAIKRznBmPC/giphy.gif)')
    }
  }

  updateGraphics()
  getInput()

  function checkLv0() {
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
    } else if (currentInput != 'hire me please'){
      $inputLog.prepend('<li class="error"> Just type "start" or "start game"... </li>')
    }
  }

  function checkLv1() { // Checks the level one player inputs
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
      } else if ((currentInput != 'help') && (currentInput != 'hint') && (currentInput != 'hire me please')) {
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
        $inputLog.prepend('<li class="reply"> You approach the next door. <li>')
        levelTwo()
        resetValues()
      } else if (foundCloseSynonym) {
        c = 0;
        $inputLog.prepend('<li class="reply"> you close the door <li>')
        closeDoor.play()
        isDoorOpen = false;
      } else if ((currentInput != 'help') && (currentInput != 'hint') && (currentInput != 'hire me please')) {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" not recognized. Type "help" for a list of commands. <li>')
      }
    }
  }

  function checkLv2() { // Checks the level two player inputs

    var o = 0;
    var c = 0;
    var e = 0;
    var u = 0;
    var l = 0;

    var foundOpenSynonym = false;
    var foundCloseSynonym = false;
    var foundEnterSynonym = false;
    var foundUnlockSynonym = false;
    var foundLockSynonym = false;

    if (currentInput === 'help') {
      helpText()
    } else if (currentInput === 'hint') {
      displayHint()
    }

    if (!isDoorOpen && isDoorLocked === true) { // CLOSED AND LOCKED
      while (!foundOpenSynonym && o < openSynonyms.length) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      while (!foundCloseSynonym && c < closeSynonyms.length) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
        }
        c++;
      }
      while (!foundLockSynonym && l < lockSynonyms.length) {
        if (currentInput === lockSynonyms[l]) {
          foundLockSynonym = true;
        }
        l++;
      }
      while (!foundUnlockSynonym && u < unlockSynonyms.length) {
        if (currentInput === unlockSynonyms[u]) {
          foundUnlockSynonym = true;
        }
        u++;
      } while (!foundEnterSynonym && e < enterSynonyms.length) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      if (foundOpenSynonym) {
        o = 0;
        $inputLog.prepend('<li class="reply"> The door is locked! <li>')
      } else if (foundCloseSynonym) {
        c = 0;
        $inputLog.prepend('<li class="reply"> You can\'t close an already closed door... <li>')
      } else if (foundLockSynonym) {
        l = 0;
        $inputLog.prepend('<li class="reply"> Why? The door is already locked anyways... <li>')
      } else if (foundUnlockSynonym) {
        u = 0;
        isDoorLocked = false;
        updateGraphics();
        lockSound.play();
        $inputLog.prepend('<li class="reply"> you unlocked the door <li>')
      } else if (foundEnterSynonym) {
        e = 0;
        $inputLog.prepend('<li class="reply"> How does one enter a closed door... ARE YOU A GHOST? <li>')
      } else if (currentInput != 'help' && currentInput != 'hint' && currentInput != 'hire me please') {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" not recognized. Type "help" for a list of commands. <li>')
      }
    } else if (!isDoorOpen && !isDoorLocked) { // CLOSED AND UNLOCKED
      while (!foundOpenSynonym && o < openSynonyms.length) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      while (!foundCloseSynonym && c < closeSynonyms.length) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
        }
        c++;
      }
      while (!foundLockSynonym && l < lockSynonyms.length) {
        if (currentInput === lockSynonyms[l]) {
          foundLockSynonym = true;
        }
        l++;
      }
      while (!foundUnlockSynonym && u < unlockSynonyms.length) {
        if (currentInput === unlockSynonyms[u]) {
          foundUnlockSynonym = true;
        }
        u++;
      }
      while (!foundEnterSynonym && e < enterSynonyms.length) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      if (foundOpenSynonym) {
        o = 0;
        isDoorOpen = true;
        updateGraphics();
        openDoor.play();
        $inputLog.prepend('<li class="reply"> You opened the door <li>')
      } else if (foundCloseSynonym) {
        c = 0;
        $inputLog.prepend('<li class="reply"> Use your eyes... the door is already closed. <li>')
      } else if (foundLockSynonym) {
        l = 0;
        isDoorLocked = true;
        updateGraphics();
        lockSound.play();
        $inputLog.prepend('<li class="reply"> You locked the door... for some reason... <li>')
      } else if (foundUnlockSynonym) {
        u = 0;
        $inputLog.prepend('<li class="reply"> The door was already unlocked but ill say it again. The door is unlocked. <li>')
      } else if (foundEnterSynonym) {
        e = 0;
        $inputLog.prepend('<li class="reply"> You can\'t enter a closed door! Open it first. <li>')
      } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" not recognized. Type "help" for a list of commands. <li>')
      }
    } else if (isDoorOpen === true && !isDoorLocked) { // UNLOCKED AND OPEN
      while (!foundOpenSynonym && o < openSynonyms.length) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      while (!foundCloseSynonym && c < closeSynonyms.length) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
        }
        c++;
      }
      while (!foundLockSynonym && l < lockSynonyms.length) {
        if (currentInput === lockSynonyms[l]) {
          foundLockSynonym = true;
        }
        l++;
      }
      while (!foundUnlockSynonym && u < unlockSynonyms.length) {
        if (currentInput === unlockSynonyms[u]) {
          foundUnlockSynonym = true;
        }
        u++;
      }
      while (!foundEnterSynonym && e < enterSynonyms.length) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      if (foundOpenSynonym) {
        o = 0;
        $inputLog.prepend('<li class="reply"> The door is already open! You\'re so close! <li>')
      } else if (foundCloseSynonym) {
        c = 0;
        isDoorOpen = false;
        updateGraphics();
        closeDoor.play()
        $inputLog.prepend('<li class="reply"> Why are you going backwards! <li>')
      } else if (foundLockSynonym) {
        l = 0;
        $inputLog.prepend('<li class="reply"> Why wold you even want to lock it... Too bad you can\'t since the door is open. <li>')
      } else if (foundUnlockSynonym) {
        u = 0;
        $inputLog.prepend('<li class="reply"> The door is already unlocked. And it\'s open. Only one more thing to do. <li>')
      } else if (foundEnterSynonym) {
        e = 0;
        resetValues();
        $inputLog.prepend('<li class="reply"> You approach the next door. <li>')
        levelThree();
      } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" not recognized. Type "help" for a list of commands. <li>')
      }
    }
  }

  function checkLv3() { // Checks the level three player inputs
    var o = 0;
    var c = 0;
    var e = 0;
    var u = 0;
    var l = 0;
    var pull = 0;
    var push = 0;

    var foundOpenSynonym = false;
    var foundPullSynonym = false;
    var foundPushSynonym = false;
    var foundCloseSynonym = false;
    var foundEnterSynonym = false;
    var foundUnlockSynonym = false;
    var foundLockSynonym = false;

    console.log('checkLv3 is running')

    if (currentInput === 'help') {
      helpText()
    } else if (currentInput === 'hint') {
      displayHint()
    }

    if (!isDoorOpen) { // DOOR IS CLOSED
      while (!foundOpenSynonym && o < openSynonyms.length) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      while (!foundPushSynonym && push < pushSynonyms.length) {
        if (currentInput === pushSynonyms[push]) {
          foundPushSynonym = true;
        }
        push++;
      }
      while (!foundPullSynonym && pull < pullSynonyms.length) {
        if (currentInput === pullSynonyms[pull]) {
          foundPullSynonym = true;
        }
        pull++;
      }
      while (!foundCloseSynonym && c < closeSynonyms.length) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
        }
        c++;
      }
      while (!foundEnterSynonym && e < enterSynonyms.length) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      if (foundOpenSynonym) {
        o = 0;
        $inputLog.prepend('<li class="reply"> you try PUSHING the door but it wouldn\'t budge <li>')
      } else if (foundPushSynonym) {
        console.log('foundPush')
        push = 0;
        $inputLog.prepend('<li class="reply"> you try PUSHING the door but it wouldn\'t budge <li>')
      } else if (foundPullSynonym) {
        console.log('foundPull')
        pull = 0;
        $inputLog.prepend('<li class="reply"> You pull the door open <li>')
        isDoorOpen = true;
        updateGraphics();
        openDoor.play();
      } else if (foundCloseSynonym) {
        c = 0;
        $inputLog.prepend('<li class="reply"> The door is already closed... Use your eyes. <li>')
      } else if (foundEnterSynonym) {
        e = 0;
        $inputLog.prepend('<li class="reply"> The door is shut for gods sake... <li>')
      } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
        $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
      }
    } else { // DOOR IS OPEN
      while (!foundOpenSynonym && o < openSynonyms.length) {
        if (currentInput === openSynonyms[o]) {
          foundOpenSynonym = true;
        }
        o++;
      }
      while (!foundCloseSynonym && c < closeSynonyms.length) {
        if (currentInput === closeSynonyms[c]) {
          foundCloseSynonym = true;
        }
        c++;
      }
      while (!foundEnterSynonym && e < enterSynonyms.length) {
        if (currentInput === enterSynonyms[e]) {
          foundEnterSynonym = true;
        }
        e++;
      }
      if (foundOpenSynonym) {
        o = 0;
        $inputLog.prepend('<li class="reply"> The door is already open jeez... <li>')
      } else if (foundCloseSynonym) {
        c = 0;
        isDoorOpen = false;
        updateGraphics();
        closeDoor.play();
        $inputLog.prepend('<li class="reply"> You... closed the door... <li>')
      } else if (foundEnterSynonym) {
        e = 0;
        resetValues();
        levelFour();
        $inputLog.prepend('<li class="reply"> You approach the next door. <li>')
      } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
        $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
      }
    }
  }

  function checkLv4() { // Checks the level four player inputs
    var o = 0;
    var c = 0;
    var e = 0;
    var u = 0;
    var l = 0;
    var p = 0;
    var k = 0;
    var m = 0;

    var foundOpenSynonym = false;
    var foundCloseSynonym = false;
    var foundEnterSynonym = false;
    var foundUnlockSynonym = false;
    var foundLockSynonym = false;
    var foundPickUpSynonym = false;
    var foundUseKeySynonym = false;
    var foundCheckMatSynonym = false;

    if (currentInput === 'help') {
      helpText()
    } else if (currentInput === 'hint') {
      displayHint()
    }

    if (!isDoorOpen) {
      if (isDoorLocked) {
        if (!isKeyFound) {
          if (!isMatRemoved) {
            while (!foundOpenSynonym && o < openSynonyms.length) {
              if (currentInput === openSynonyms[o]) {
                foundOpenSynonym = true;
              }
              o++;
            }
            while (!foundCloseSynonym && c < closeSynonyms.length) {
              if (currentInput === closeSynonyms[c]) {
                foundCloseSynonym = true;
              }
              c++;
            }
            while (!foundEnterSynonym && e < enterSynonyms.length) {
              if (currentInput === enterSynonyms[e]) {
                foundEnterSynonym = true;
              }
              e++;
            }
            while (!foundUnlockSynonym && u < unlockSynonyms.length) {
              if (currentInput === unlockSynonyms[u]) {
                foundUnlockSynonym = true;
              }
              u++;
            }
            while (!foundLockSynonym && l < lockSynonyms.length) {
              if (currentInput === lockSynonyms[l]) {
                foundLockSynonym = true;
              }
              l++;
            }
            while (!foundPickUpSynonym && p < pickUpSynonyms.length) {
              if (currentInput === pickUpSynonyms[p]) {
                foundPickUpSynonym = true;
              }
              p++;
            }
            while(!foundUseKeySynonym && k < useKeySynonyms.length) {
              if (currentInput === useKeySynonyms[k]) {
                foundUseKeySynonym = true;
              }
              k++;
            }
            while(!foundCheckMatSynonym && m < checkMatSynonyms.length) {
              if (currentInput === checkMatSynonyms[m]) {
                foundCheckMatSynonym = true;
              }
              m++;
            }

            if (foundOpenSynonym) {
              o = 0;
              $inputLog.prepend('<li class="reply"> The door is locked. You need a key! </li>')
            } else if (foundCloseSynonym) {
              c = 0;
              $inputLog.prepend('<li class="reply"> The door is already closed... </li>')
            } else if (foundEnterSynonym) {
              e = 0;
              $inputLog.prepend('<li class="reply"> How you gon enter a closed AND locked door... </li>')
            } else if (foundUnlockSynonym) {
              u = 0;
              $inputLog.prepend('<li class="reply"> You need a key to unlock this door. </li>')
            } else if (foundLockSynonym) {
              l = o;
              $inputLog.prepend('<li class="reply"> No key to lock the door fam. </li>')
            } else if (foundPickUpSynonym) {
              p = 0;
              $inputLog.prepend('<li class="reply"> Where? I don\'t see anything </li>')
            } else if (foundUseKeySynonym) {
              k = 0;
              $inputLog.prepend('<li class="reply"> You dont have a key! </li>')
            } else if (foundCheckMatSynonym) {
              m = 0;
              isMatRemoved = true;
              updateGraphics();
              carpet_shuffle.play();
              $inputLog.prepend('<li class="reply"> You remove the mat. </li>')
            } else if (currentInput != 'hint' && currentInput != "help" && currentInput != 'hire me please'){
              $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
            }
          } else { // IF MAT IS OFF
            while (!foundOpenSynonym && o < openSynonyms.length) {
              if (currentInput === openSynonyms[o]) {
                foundOpenSynonym = true;
              }
              o++;
            }
            while (!foundCloseSynonym && c < closeSynonyms.length) {
              if (currentInput === closeSynonyms[c]) {
                foundCloseSynonym = true;
              }
              c++;
            }
            while (!foundEnterSynonym && e < enterSynonyms.length) {
              if (currentInput === enterSynonyms[e]) {
                foundEnterSynonym = true;
              }
              e++;
            }
            while (!foundUnlockSynonym && u < unlockSynonyms.length) {
              if (currentInput === unlockSynonyms[u]) {
                foundUnlockSynonym = true;
              }
              u++;
            }
            while (!foundLockSynonym && l < lockSynonyms.length) {
              if (currentInput === lockSynonyms[l]) {
                foundLockSynonym = true;
              }
              l++;
            }
            while (!foundPickUpSynonym && p < pickUpSynonyms.length) {
              if (currentInput === pickUpSynonyms[p]) {
                foundPickUpSynonym = true;
              }
              p++;
            }
            while(!foundUseKeySynonym && k < useKeySynonyms.length) {
              if (currentInput === useKeySynonyms[k]) {
                foundUseKeySynonym = true;
              }
              k++;
            }
            while(!foundCheckMatSynonym && m < checkMatSynonyms.length) {
              if (currentInput === checkMatSynonyms[m]) {
                foundCheckMatSynonym = true;
              }
              m++;
            }
            if (foundOpenSynonym) {
              o = 0;
              $inputLog.prepend('<li class="reply"> The door is locked. </li>')
            } else if (foundCloseSynonym) {
              c = 0;
              $inputLog.prepend('<li class="reply"> The door is already closed. </li>')
            } else if (foundEnterSynonym) {
              e = 0;
              $inputLog.prepend('<li class="reply"> The door is still closed... Find a way to open it. </li>')
            } else if (foundUnlockSynonym) {
              u = 0;
              $inputLog.prepend('<li class="reply"> You don\'t have the key! You need to unlock the door first. </li>')
            } else if (foundLockSynonym) {
              l = 0;
              $inputLog.prepend('<li class="reply"> You don\'t have a key. Why do you want to lock the door anyways. </li>')
            } else if (foundPickUpSynonym) {
              p = 0;
              isKeyFound = true;
              keyJingle.play();
              updateGraphics();
              $inputLog.prepend('<li class="reply"> You pick up the key. </li>')
            } else if (foundUseKeySynonym) {
              k = 0;
              $inputLog.prepend('<li class="reply"> You dont have the key </li>')
            } else if (foundCheckMatSynonym) {
              m = 0;
              $inputLog.prepend('<li class="reply"> The mat is already off. </li>')
            } else if (currentInput != 'help' && currentInput != 'hint' && currentInput != 'hire me please') {
              $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
            }
          }
        } else { // KEY IS FOUND
          while (!foundOpenSynonym && o < openSynonyms.length) {
            if (currentInput === openSynonyms[o]) {
              foundOpenSynonym = true;
            }
            o++;
          }
          while (!foundCloseSynonym && c < closeSynonyms.length) {
            if (currentInput === closeSynonyms[c]) {
              foundCloseSynonym = true;
            }
            c++;
          }
          while (!foundEnterSynonym && e < enterSynonyms.length) {
            if (currentInput === enterSynonyms[e]) {
              foundEnterSynonym = true;
            }
            e++;
          }
          while (!foundUnlockSynonym && u < unlockSynonyms.length) {
            if (currentInput === unlockSynonyms[u]) {
              foundUnlockSynonym = true;
            }
            u++;
          }
          while (!foundLockSynonym && l < lockSynonyms.length) {
            if (currentInput === lockSynonyms[l]) {
              foundLockSynonym = true;
            }
            l++;
          }
          while (!foundPickUpSynonym && p < pickUpSynonyms.length) {
            if (currentInput === pickUpSynonyms[p]) {
              foundPickUpSynonym = true;
            }
            p++;
          }
          while(!foundUseKeySynonym && k < useKeySynonyms.length) {
            if (currentInput === useKeySynonyms[k]) {
              foundUseKeySynonym = true;
            }
            k++;
          }
          while(!foundCheckMatSynonym && m < checkMatSynonyms.length) {
            if (currentInput === checkMatSynonyms[m]) {
              foundCheckMatSynonym = true;
            }
            m++;
          }
          if (foundOpenSynonym) {
            o = 0;
            $inputLog.prepend('<li class="reply"> Unlock the door first! Jeeez... </li>')
          } else if (foundCloseSynonym) {
            c = 0;
            $inputLog.prepend('<li class="reply"> The door is already closed. </li>')
          } else if (foundEnterSynonym) {
            e = 0;
            $inputLog.prepend('<li class="reply"> The door is closed. Open it first! </li>')
          } else if (foundUnlockSynonym) {
            u = 0;
            isDoorLocked = false;
            lockSound.play();
            updateGraphics();
            $inputLog.prepend('<li class="reply"> You unlocked the door with the key!</li>')
          } else if (foundLockSynonym) {
            l = 0;
            $inputLog.prepend('<li class="reply"> The door is already locked. </li>')
          } else if (foundPickUpSynonym) {
            p = 0;
            $inputLog.prepend('<li class="reply"> You already have the key! </li>')
          } else if (foundUseKeySynonym) {
            k = 0;
            isDoorLocked = false;
            lockSound.play();
            updateGraphics();
            $inputLog.prepend('<li class="reply"> You unlocked the door with the key!</li>')
          } else if (foundCheckMatSynonym) {
            m = 0;
            $inputLog.prepend('<li class="reply"> The mat is already off. </li>')
          } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
            $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
          }
        }
      } else { // DOOR IS UNLOCKED
        while (!foundOpenSynonym && o < openSynonyms.length) {
            if (currentInput === openSynonyms[o]) {
              foundOpenSynonym = true;
            }
            o++;
          }
          while (!foundCloseSynonym && c < closeSynonyms.length) {
            if (currentInput === closeSynonyms[c]) {
              foundCloseSynonym = true;
            }
            c++;
          }
          while (!foundEnterSynonym && e < enterSynonyms.length) {
            if (currentInput === enterSynonyms[e]) {
              foundEnterSynonym = true;
            }
            e++;
          }
          while (!foundUnlockSynonym && u < unlockSynonyms.length) {
            if (currentInput === unlockSynonyms[u]) {
              foundUnlockSynonym = true;
            }
            u++;
          }
          while (!foundLockSynonym && l < lockSynonyms.length) {
            if (currentInput === lockSynonyms[l]) {
              foundLockSynonym = true;
            }
            l++;
          }
          while (!foundPickUpSynonym && p < pickUpSynonyms.length) {
            if (currentInput === pickUpSynonyms[p]) {
              foundPickUpSynonym = true;
            }
            p++;
          }
          while(!foundUseKeySynonym && k < useKeySynonyms.length) {
            if (currentInput === useKeySynonyms[k]) {
              foundUseKeySynonym = true;
            }
            k++;
          }
          while(!foundCheckMatSynonym && m < checkMatSynonyms.length) {
            if (currentInput === checkMatSynonyms[m]) {
              foundCheckMatSynonym = true;
            }
            m++;
          }
          if (foundOpenSynonym) {
            o = 0;
            isDoorOpen = true;
            updateGraphics();
            openDoor.play();
            $inputLog.prepend('<li class="reply"> You open the door </li>')
          } else if (foundCloseSynonym) {
            c = 0;
            $inputLog.prepend('<li class="reply"> The door is closed human. Open it first </li>')
          } else if (foundEnterSynonym) {
            e = 0;
            $inputLog.prepend('<li class="reply"> The door is closed. Just open it now! </li>')
          } else if (foundUnlockSynonym) {
            u = 0;
            $inputLog.prepend('<li class="reply"> The door is already unlocked. Just open it now! </li>')
          } else if (foundLockSynonym) {
            l = 0;
            isDoorLocked = true;
            updateGraphics();
            $inputLog.prepend('<li class="reply"> You lock the door... Why? I have no idea... </li>')
          } else if (foundPickUpSynonym) {
            p = 0;
            $inputLog.prepend('<li class="reply"> There is nothing left to pick up </li>')
          } else if (foundUseKeySynonym) {
            k = 0;
            $inputLog.prepend('<li class="reply"> The door is already unlocked! </li>')
          } else if (foundCheckMatSynonym) {
            m = 0;
            $inputLog.prepend('<li class="reply"> The mat is already off. </li>')
          } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
            $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
          }
        }
      } else { // DOOR IS OPEN
        console.log('the door is now open')
        while (!foundOpenSynonym && o < openSynonyms.length) {
          if (currentInput === openSynonyms[o]) {
            foundOpenSynonym = true;
          }
          o++;
        }
        while (!foundCloseSynonym && c < closeSynonyms.length) {
          if (currentInput === closeSynonyms[c]) {
            foundCloseSynonym = true;
          }
          c++;
        }
        while (!foundEnterSynonym && e < enterSynonyms.length) {
          if (currentInput === enterSynonyms[e]) {
            foundEnterSynonym = true;
          }
          e++;
        }
        while (!foundUnlockSynonym && u < unlockSynonyms.length) {
          if (currentInput === unlockSynonyms[u]) {
            foundUnlockSynonym = true;
          }
          u++;
        }
        while (!foundLockSynonym && l < lockSynonyms.length) {
          if (currentInput === lockSynonyms[l]) {
            foundLockSynonym = true;
          }
          l++;
        }
        while (!foundPickUpSynonym && p < pickUpSynonyms.length) {
          if (currentInput === pickUpSynonyms[p]) {
            foundPickUpSynonym = true;
          }
          p++;
        }
        while(!foundUseKeySynonym && k < useKeySynonyms.length) {
          if (currentInput === useKeySynonyms[k]) {
            foundUseKeySynonym = true;
          }
          k++;
        }
        while(!foundCheckMatSynonym && m < checkMatSynonyms.length) {
          if (currentInput === checkMatSynonyms[m]) {
            foundCheckMatSynonym = true;
          }
          m++;
        }
        if (foundOpenSynonym) {
          o = 0;
          $inputLog.prepend('<li class="reply"> The door is already open man! </li>')
        } else if (foundCloseSynonym) {
          c = 0;
          isDoorOpen = false;
          updateGraphics();
          closeDoor.play();
          $inputLog.prepend('<li class="reply"> Ugh... you close the door. </li>')
        } else if (foundEnterSynonym) {
          e = 0;
          level = 0;
          updateGraphics();
          $inputLog.prepend('<li class="error"> -------------------------------- </li>')
          $inputLog.prepend('<li class="error"> TYPE FOR SECRET LEVEL: <span class="yellow">"hire me please" </span> </li>')
          $inputLog.prepend('<li class="error"> -------------------------------- </li>')
          $inputLog.prepend('<li class="reply"> YOU BEAT THE GAME! WOOOOOO </li>')
        } else if (foundUnlockSynonym) {
          u = 0;
          $inputLog.prepend('<li class="reply"> The door is already unlocked... And it\'s open too... </li>')
        } else if (foundLockSynonym) {
          l = 0;
          $inputLog.prepend('<li class="reply"> Ya gotta close the door first to lock it! </li>')
        } else if (foundPickUpSynonym) {
          p = 0;
          $inputLog.prepend('<li class="reply"> There is nothing left to pick up </li>')
        } else if (foundUseKeySynonym) {
          k = 0;
          $inputLog.prepend('<li class="reply"> The door is already unlocked! JUST GO THROUGH THE DOOR!</li>')
        } else if (foundCheckMatSynonym) {
          m = 0;
          $inputLog.prepend('<li class="reply"> The mat is already off. </li>')
        } else if (currentInput != 'hint' && currentInput != 'help' && currentInput != 'hire me please') {
          $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
        }
      }
    }

  // Start game
  startGame()

  function startGame() {
    level = 0;
    updateGraphics();
    console.log('START GAME')
    if (gameStarted === false) {
      gameStarted = true;
      console.log('startGame() function firing')
      if (levelText === false) {
        levelText = true;
        $inputLog.prepend('<li class="error"> Make sure the volume is turned on! </li>')
        $inputLog.prepend('<li class="reply"> BEAT <span class="underline">LEVEL 4</span> TO GET ACCESS TO THE SECRET LEVEL! </li>')
        $inputLog.prepend('<li class="reply"> Type "start" to start the game! </li>')
      }
    }
  }

  function levelOne() {
    $('li').empty()
    level = 1;
    updateGraphics()
    resetValues()
    $inputLog.prepend('<li class="reply"> ------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL ONE - Just a regular door </li>')
    $inputLog.prepend('<li class="reply"> ------------------------------- </li>')
  }

  function levelTwo() {
    $('li').empty()
    level = 2;
    resetValues()
    updateGraphics()
    $inputLog.prepend('<li class="reply"> -------------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL TWO - Just a regular locked door </li>')
    $inputLog.prepend('<li class="reply"> -------------------------------------- </li>')
  }

  function levelThree() {
    $('li').empty()
    level = 3;
    resetValues()
    updateGraphics()
    $inputLog.prepend('<li class="reply"> -------------------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL THREE - Just your average one way door </li>')
    $inputLog.prepend('<li class="reply"> -------------------------------------------- </li>')
  }

  function levelFour() {
    $('li').empty()
    level = 4;
    resetValues()
    updateGraphics()
    $inputLog.prepend('<li class="reply"> ------------------------------------------ </li>')
    $inputLog.prepend('<li class="reply"> LEVEL FOUR - Just your average locked door </li>')
    $inputLog.prepend('<li class="reply"> ------------------------------------------ </li>')
  }

  /*
  //////////////////////////////////////////////////////////////////////
  SECRET LEVEL SHIT
  //////////////////////////////////////////////////////////////////////
  */

  var livesText = $('.lives')
  var scoreText = $('.score')
  var amountOfLives = 3;
  var scorePoint = 0;
  var gameScreen = $('.img-area')
  var newWidth = 120;
  var newHeight = 180;
  var spawnTimer = 2500;
  var currentLevel = 0;


  var boomSound1 = document.createElement('audio')
  var boomSound2 = document.createElement('audio')
  var boomSound3 = document.createElement('audio')
  var bgm_secret = document.createElement('audio')

  boomSound1.src='assets/sfx/boom1.wav'
  boomSound1.preLoad=true;
  boomSound2.src='assets/sfx/boom2.wav'
  boomSound2.preLoad=true;
  boomSound3.src='assets/sfx/boom3.wav'
  boomSound3.preLoad=true;
  bgm_secret.src='assets/sfx/bgm_secret.wav'
  bgm_secret.preload=true;
  bgm_secret.loop=true;

  livesText.hide()
  scoreText.hide()

  function damageTaken() { // If player loses a life
    if (level === 'secret') {
      var newDiv = $('<div>') // Create a div that covers the whole img screen
      newDiv.addClass('damage-taken')
      $('.img-area').append(newDiv)
      setTimeout(function(){ // In .1 second, remove the div
        newDiv.remove()
      },100)
    }
  }

  function spawnShips() {
    if (level === 'secret'){

      currentLevel += 1;
      $inputLog.prepend('<li class="reply"> LEVEL ' + currentLevel + ' </li>') // Logs the current level into the history area

      setInterval(function(){ // Every 5 seconds, double the spawn rate exponentially

        // PICK RANDOM LOCATION
        var windowWidth = $('.img-area').width()
        var windowHeight = $('.img-area').height()
        var randWidth = Math.floor((Math.random()*windowWidth)) // Random window width
        var randHeight = Math.floor((Math.random()*windowHeight)) // Random window height

        // MAKING THE DOORS
        if (level === 'secret'){
          var ship = $('<div>')
          ship.addClass('attacking-door')
          ship.css({
            top: randHeight,
            left: randWidth,
            position: 'absolute'
          })
        }

        // CHECKING IF SHIP WAS DESTORYED BY CLICK OR REMOVED WITH TIMER
        ship.alive = true; // All ships start with alive = true
        ship.mousedown(function(){ // If clicked
          ship.remove(); // Remove it

          ship.alive = false; // Alive = false
        })

        $('.img-area').append(ship)

        if (level === 'secret') {
          ship.animate({ // Makes the ship grow to full size in 4.5 seconds
            width: newWidth,
            height: newHeight
          }, 4500,  function(){ // At the end of the animation
            if (ship.alive === true){ // If the current ship was still alive at the time
              amountOfLives--; // Lose life
              ship.remove(); // Remove itself
              damageTaken(); // Flash screen
            }
            livesText.text('Lives: ' + amountOfLives) // Update lives text

            if (amountOfLives === 0) { // If no more lives
              $inputLog.prepend('<li class="reply"> YOUR FINAL SCORE IS: ' + scorePoint + ' </li>')
              $inputLog.prepend('<li class="reply"> YOU LOSE! </li>')
              var gameOverScreen = $('div')
              gameOverScreen.text('GAME OVER! YOUR FINAL SCORE IS: ' + scorePoint)
              gameOverScreen.addClass('game-over')

              setTimeout(function(){ // Reload page after 5 seconds
                location.reload()
              },5000)
            }
          })
        }

        // $('.attacking-door').click(function(){ // If door is clicked (AFTER RE READING CODE, A LOT OF MY CODE IS SHIT. GOTTA REDO)
        //   this.remove() // Remove it
        //   scorePoint += 10; // Add points
        //   console.log('adding 10')
        //   scoreText.text('Score: ' + (scorePoint)) // Update score
        //   var randomNumber = (Math.floor(Math.random() * 3) + 1) // Picks a random number from 1-3
        //   if (randomNumber === 1) { // If 1, play this sound
        //     boomSound1.play()
        //   } else if (randomNumber === 2) { // If 2, play this sound
        //     boomSound2.play()
        //   } else { // If 3, play this sound
        //     boomSound3.play()
        //   }
        // })
      }, spawnTimer) // Original spawn timer is 2.5secs
    } setTimeout(function(){ // Every 5 seconds, double spawn rate
      spawnShips()
      secretLevel++;
    },5000)
  }

  function secretLevel() {

    bgm_main.pause()
    bgm_secret.play()

    var header = $('.header')
    var headerText = $('.header-text')
    var background = $('.game-container')
    var playerInputArea = $('#player-input')
    var caret = $('.caret')
    var legalShit = $('.legal-shit')

    header.css('text-decoration', 'line-through')
    header.css('color', 'red')
    headerText.text('KILL EM ALL!!!! KILL THEM ALLLLLLL')
    headerText.css('color', '#be003f')
    background.css('background-color', '#1a0008')
    background.css('border', '1px solid maroon')
    legalShit.css('color', 'white')
    $('.img-area').css('border', '1px solid maroon')

    playerInputArea.hide()
    caret.hide()

    $('li').empty()
    level = 'secret';
    updateGraphics()
    livesText.show()
    scoreText.show()
    console.log('YOU ARE NOW IN THE SECRET LEVEL')

    $inputLog.prepend('<li class="reply"> -------------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL ??? - BEWARE OF THE RABID DOORS! </li>')
    $inputLog.prepend('<li class="reply"> -------------------------------------- </li>')

    setTimeout(function(){
      $inputLog.prepend('<li class="error"> GET READY FOR <span class="aliens">DANGEROUS ALIEN DOORS! </span> CLICK THEM TO DESTROY THEM! DONT LET THEM REACH YOU!</li>');
    }, 500);
    setTimeout(function(){
      $inputLog.prepend('<li class="error"> 3... </li>');
    }, 2000);
    setTimeout(function(){
      $inputLog.prepend('<li class="error"> 2... </li>');
    }, 3000);
    setTimeout(function(){
      $inputLog.prepend('<li class="error"> 1... </li>');
    }, 4000);
    setTimeout(function(){
      $inputLog.prepend('<li class="error"> GO! GO! GO! </li>');
      spawnShips();
    }, 5000);

    livesText.text('Lives: ' + amountOfLives)
    scoreText.text('Score: ' + scorePoint)

    $('.img-area').click(function(){
      shootSound.play()
    })
  }

  // WOOHOO I FINISHED!!!

});
