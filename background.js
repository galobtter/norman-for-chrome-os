/*
https://github.com/google/extra-keyboards-for-chrome-os/blob/master/lushootseed/background.js modified by Galobtter

Copyright 2018 The Extra Keyboards for Chrome OS Authors.

Licensed under the Apach License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var contextID = 0;

var nor = {
  "KeyQ": [ "q", "Q" ],
  "KeyW": [ "w", "W" ],
  "KeyE": [ "d", "D" ],
  "KeyR": [ "f", "F" ],
  "KeyT": [ "k", "K" ],
  "KeyY": [ "j", "J" ],
  "KeyU": [ "u", "U" ],
  "KeyI": [ "r", "R" ],
  "KeyO": [ "l", "L"],
  "KeyP": [ ";", ":" ],
  "KeyA": [ "a", "A" ],
  "KeyS": [ "s", "S" ],
  "KeyD": [ "e", "E" ],
  "KeyF": [ "t", "T" ],
  "KeyG": [ "g", "G" ],
  "KeyH": [ "y", "Y" ],
  "KeyJ": [ "n", "N" ],
  "KeyK": [ "i", "I" ],
  "KeyL": [ "o", "O" ],
  "Semicolon": [ "h", "H" ],
  "KeyZ": [ "z", "Z" ],
  "KeyX": [ "x", "X" ],
  "KeyC": [ "c", "C" ],
  "KeyV": [ "v", "V" ],
  "KeyB": [ "b", "B" ],
  "KeyN": [ "p", "P" ],
  "KeyM": [ "m", "M" ]
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})

chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (keyData.type == "keydown") {
        if (nor[keyData.code]) {
          let shifted = keyData.capsLock ^ keyData.shiftKey;
          let emit = nor[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});
