'use strict';

(function () {
  var FILTER_STATES = {
    visible: '1',
    hidden: '0'
  };
  var mapFilters = document.querySelector('.map__filters');
  window.map = {
    mapElement: document.querySelector('.map'),
    removeAllPins: function () {
      var parent = document.querySelector('.map__pins');
      var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = allPins.length - 1; i >= 0; i--) {
        parent.removeChild(allPins[i]);
      }
    },
    showMapFilters: function (boolFlag) {
      if (boolFlag) {
        mapFilters.style.opacity = FILTER_STATES.visible;
      } else {
        mapFilters.style.opacity = FILTER_STATES.hidden;
      }
    },
    resetMapFilters: function () {
      mapFilters.reset();
    }
  };
})();
