'use strict';
(function () {
  var map = document.querySelector('.map');

  var makeStateActive = function () {
    map.classList.remove('map--faded');
    window.form.makeFormActive();
    window.pin.renderPin(window.data.nearAds);
    window.pin.mainPin.removeEventListener('mouseup', makeStateActive);
    window.form.resetButton.addEventListener('click', makeStateInactive);
    window.form.resetButton.addEventListener('click', removeAllPins);
  };

  var removeAllPins = function () {
    var parent = document.querySelector('.map__pins');
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = allPins.length - 1; i >= 0; i--) {
      parent.removeChild(allPins[i]);
    }
  };

  var makeStateInactive = function () {
    map.classList.add('map--faded');
    window.form.makeFormInActive();
    var cardActiveElement = document.querySelector('.map__card');
    if (cardActiveElement) {
      map.removeChild(cardActiveElement);
    }
    window.pin.mainPin.addEventListener('mouseup', makeStateActive);
  };

  window.map = {
    makeStateActive: makeStateActive
  };
})();
