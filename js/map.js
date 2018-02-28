'use strict';
(function () {
  var filterStates = {
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
    showMapFilters: function (value) {
      if (value) {
        mapFilters.style.opacity = filterStates.visible;
      } else {
        mapFilters.style.opacity = filterStates.hidden;
      }
    }
  };
})();
