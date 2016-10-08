
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
    'start', 'start game', 'start the game'
  ]

  var openSynonyms = [
    'open', 'open door', 'open the door'
  ]

  var pushSynonyms = [
    'push', 'push door', 'push the door', 'push the door open'
  ]

  var pullSynonyms = [
    'pull', 'pull door', 'pull the door', 'pull the door open'
  ]

  var closeSynonyms = [
    'close', 'close door', 'close the door',
    'shut', 'shut door', 'shut the door'
  ]

  var enterSynonyms = [
    'enter', 'enter door', 'enter the door', 'enter room', 'enter the room', 'enter the next room', 'enter next room',
    'go', 'go door', 'go to door', 'go to the door', 'go through door', 'go through the door', 'go through',
    'go to next level', 'go to the next level', 'go in'
  ]

  var unlockSynonyms = [
    'unlock', 'unlock door', 'unlock the door', 'turn the lock', 'twist the lock'
  ]

  var lockSynonyms = [
    'lock', 'lock door', 'lock the door'
  ]

  var pickUpSynonyms = [
    'key',
    'pick up', 'pick up key', 'pick key up', 'pick up the key', 'pick the key up', 'pick up key from floor',
    'pick up the key from the floor', 'pick up the key on the floor',
    'take it', 'take the key', 'take key', 'take the key from the floor', 'take the key on the floor'
  ]

  var useKeySynonyms = [
    'key the door',
    'use key','use the key', 'use key on door', 'use key on the door', 'use the key on door', 'use the key on the door',
    'unlock the door with key', 'unlock the door with the key',
    'open door with key', 'open door with the key', 'open the door with key', 'open the door with the key'
  ]

  var checkMatSynonyms = [
    'mat',
    'check mat', 'check the mat', 'check under mat', 'check under the mat',
    'look mat', 'look at mat', 'look at the mat', 'look under mat', 'look under the mat',
    'remove mat', 'remove the mat'
  ]

  var hints = {
    levelOne: ['do you really need this?', 'type in: open door', 'then type: "enter"'],
    levelTwo: ['the door is locked... what do you do', 'are you sure...', '"unlock door"'],
    levelThree: ['What type of door does it look like?', 'opposite of push', '"pull"'],
    levelFour: ['hint1', 'hint2', 'hint3']
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

  var closeDoor = document.createElement("audio");
  var openDoor = document.createElement("audio");
  var lockSound = document.createElement("audio")


  closeDoor.src="assets/sfx/closeDoor.mp3";
  closeDoor.preLoad=true;
  openDoor.src="assets/sfx/openDoor.mp3";
  openDoor.preLoad=true;   
  lockSound.src='assets/sfx/lock.mp3';
  lockSound.preLoad=true;
 


  function preloadImages(arrayOfImages) {
    $(arrayOfImages).each(function() {
      $('<img/>')[0].src = this;
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
    isDoorLocked = true;
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
          } else if (level === 3) {
            checkLv3()
          } else if (level === 4) {
            checkLv4()
          }
        }
      }
    })
  }

  function updateGraphics() {
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
            $('.img-area').css('background', 'url(assets/L4_keyGone.png')
          }
        } else {
          $('.img-area').css('background', 'url(assets/L4_usedKey.png')
        }
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
        $inputLog.prepend('<li class="reply"> You approach the next door. <li>')
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

  function checkLv2() {

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
      } else if (currentInput != 'help' && currentInput != 'hint') {
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
      } else if (currentInput != 'hint' && currentInput != 'help') {
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
      } else if (currentInput != 'hint' && currentInput != 'help') {
        $inputLog.prepend('<li class="error"> command "' + currentInput + '" not recognized. Type "help" for a list of commands. <li>')
      }
    }
  }

  function checkLv3() {
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
      } else if (currentInput != 'hint' && currentInput != 'help') {
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
      }
    }
  }

  function checkLv4() {
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
              $inputLog.prepend('<li class="reply"> You remove the mat. </li>')
            } else if (currentInput != 'hint' && currentInput != "help"){
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
              updateGraphics();
              $inputLog.prepend('<li class="reply"> You pick up the key. </li>')
            } else if (foundUseKeySynonym) {
              k = 0;
              $inputLog.prepend('<li class="reply"> You dont have the key </li>')
            } else if (foundCheckMatSynonym) {
              m = 0;
              $inputLog.prepend('<li class="reply"> The mat is already off. </li>')
            } else if (currentInput != 'help' && currentInput != 'hint') {
              $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
            }
          }
        } else { // KEY IS FOUND
          console.log('key is found')
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
            $inputLog.prepend('<li class="reply"> Use the key to unlock the door! </li>')
          } else if (foundLockSynonym) {
            l = 0;
            $inputLog.prepend('<li class="reply"> The door is already locked. </li>')
          } else if (foundPickUpSynonym) {
            p = 0;
            $inputLog.prepend('<li class="reply"> You already have the key! </li>')
          } else if (foundUseKeySynonym) {
            k = 0;
            isDoorLocked = false;
            updateGraphics();
            $inputLog.prepend('<li class="reply"> You unlock the door!</li>')
          } else if (foundCheckMatSynonym) {
            m = 0;
            $inputLog.prepend('<li class="reply"> The mat is already off. </li>')
          } else if (currentInput != 'hint' && currentInput != 'help') {
            $inputLog.prepend('<li class="error"> Command "' + currentInput + '" not recognized. Type "help" for a list of commands. </li>')
          }
        }
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
        $inputLog.prepend('<li class="reply"> Type "start" to start the game! </li>')
      }
    }
  }

  function levelOne() {
    level = 1;
    updateGraphics()
    resetValues()
    $inputLog.prepend('<li class="reply"> ------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL ONE - Just a regular door </li>')
    $inputLog.prepend('<li class="reply"> ------------------------------- </li>')
  }

  function levelTwo() {
    level = 2;
    resetValues()
    updateGraphics()
    $inputLog.prepend('<li class="reply"> -------------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL TWO - Just a regular locked door </li>')
    $inputLog.prepend('<li class="reply"> -------------------------------------- </li>')
  }

  function levelThree() {
    level = 3;
    resetValues()
    updateGraphics()
    $inputLog.prepend('<li class="reply"> -------------------------------------------- </li>')
    $inputLog.prepend('<li class="reply"> LEVEL THREE - Just your average one way door </li>')
    $inputLog.prepend('<li class="reply"> -------------------------------------------- </li>')
  }

  function levelFour() {
    level = 4;
    resetValues()
    updateGraphics()
    $inputLog.prepend('<li class="reply"> ------------------------------------------ </li>')
    $inputLog.prepend('<li class="reply"> LEVEL FOUR - Just your average locked door </li>')
    $inputLog.prepend('<li class="reply"> ------------------------------------------ </li>')
  }
});
