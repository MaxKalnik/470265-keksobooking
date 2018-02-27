'use strict';
(function () {
  var onMainPinMousedown = function () {
    var onMainPinMousemove = function () {
      makeStateActive();
      document.removeEventListener('mousemove', onMainPinMousemove);
    };
    document.addEventListener('mousemove', onMainPinMousemove);

    window.pin.mainPin.addEventListener('mouseup', function () {
      makeStateActive();
      document.removeEventListener('mousemove', onMainPinMousemove);
    });
  };

  var makeStateActive = function () {
    window.map.mapElement.classList.remove('map--faded');
    window.form.makeFormActive();
    window.backend.load(function (data) {
      window.pin.renderPin(data);
    }, window.backend.onError);
    window.popup.closePopupHandler();
    window.pin.mainPin.removeEventListener('mousedown', onMainPinMousedown);
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
    window.pin.mainPin.addEventListener('mousedown', onMainPinMousedown);
  };

  var initialize = function () {
    window.form.disableForm(true);
    window.form.setAdressDefaultValue('default');
    window.pin.mainPin.addEventListener('mousedown', onMainPinMousedown);
    window.pin.mainPin.addEventListener('keydown', function (keydownEvt) {
      window.utils.onEnterPress(keydownEvt, makeStateActive);
    });
  };
  initialize();
})();
