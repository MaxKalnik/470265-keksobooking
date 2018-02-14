'use strict';
(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;
  var INITIAL_X = (window.data.LOCATION_X_MAX - window.data.LOCATION_X_MIN) / 2;
  var INITIAL_Y = (window.data.LOCATION_Y_MAX - window.data.LOCATION_Y_MIN) / 2;
  var INITIAL_PIN_X = INITIAL_X - PIN_WIDTH / 2;
  var INITIAL_PIN_Y = INITIAL_Y - PIN_HEIGHT;

  var disableForm = function (value) {
    var fieldset = noticeForm.querySelectorAll('fieldset');
    for (var i = 1; i < fieldset.length; i++) {
      fieldset[i].disabled = value;
    }
  };

  var map = document.querySelector('.map');

  var makeStateActive = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    disableForm(false);
    window.pin.renderPin(window.data.nearAds);
    mainPin.removeEventListener('mouseup', makeStateActive);
    resetButton.addEventListener('click', makeStateInactive);
    resetButton.addEventListener('click', removeAllPins);
  };

  var adress = noticeForm.querySelector('#address');
  adress.value = INITIAL_X + ', ' + INITIAL_Y;

  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mouseup', makeStateActive);
  mainPin.addEventListener('mouseup', window.pin.definePinPosition);

  var resetButton = noticeForm.querySelector('.form__reset');

  var removeAllPins = function () {
    var parent = document.querySelector('.map__pins');
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = allPins.length - 1; i >= 0; i--) {
      parent.removeChild(allPins[i]);
    }
  };

  var makeStateInactive = function () {
    map.classList.add('map--faded');
    noticeForm.classList.add('notice__form--disabled');
    disableForm(true);
    adress.value = '';
    var cardActiveElement = document.querySelector('.map__card');
    if (cardActiveElement) {
      map.removeChild(cardActiveElement);
    }
    mainPin.addEventListener('mouseup', makeStateActive);
  };

  window.map = {

  };
})();

