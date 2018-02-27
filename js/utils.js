'use strict';
(function () {

  var KEYCODES = {
    ESC: 27,
    ENTER: 13
  };
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
    }
  };
})();
