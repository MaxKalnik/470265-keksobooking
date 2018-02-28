'use strict';
(function () {

  var KEYCODES = {
    ESC: 27,
    ENTER: 13
  };
  var DEBOUNCE_TIMEOUT = 500;
  var lastTimeout;

  window.utils = {
    onEscPress: function (evt, callback) {
      if (evt.keyCode === KEYCODES.ESC) {
        callback();
      }
    },
    onEnterPress: function (evt, callback) {
      if (evt.keyCode === KEYCODES.ENTER) {
        callback();
      }
    },
    debounce: function (func) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(func, DEBOUNCE_TIMEOUT);
    }
  };
})();
