'use strict';
(function () {
  window.map = {
    mapElement: document.querySelector('.map'),
    removeAllPins: function () {
      var parent = document.querySelector('.map__pins');
      var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = allPins.length - 1; i >= 0; i--) {
        parent.removeChild(allPins[i]);
      }
    }
  };
})();
