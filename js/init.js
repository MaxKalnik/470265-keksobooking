'use strict';
(function () {

  var makeStateActive = function () {
    window.map.mapElement.classList.remove('map--faded');
    window.form.makeFormActive();
    window.backend.load(function (data) {
      window.pin.renderPin(data);
    }, window.backend.onError);
    window.pin.mainPin.removeEventListener('mouseup', makeStateActive);
    window.form.resetButton.addEventListener('click', makeStateInactive);
    window.form.resetButton.addEventListener('click', window.map.removeAllPins);
  };

  var makeStateInactive = function () {
    window.map.mapElement.classList.add('map--faded');
    window.form.makeFormInActive();
    window.pin.movePinToInitial();
    var cardActiveElement = document.querySelector('.map__card');
    if (cardActiveElement) {
      window.map.mapElement.removeChild(cardActiveElement);
    }
    window.pin.mainPin.addEventListener('mouseup', makeStateActive);
  };

  window.form.setAdressDefaultValue('default');
  window.pin.mainPin.addEventListener('mouseup', makeStateActive);
})();
