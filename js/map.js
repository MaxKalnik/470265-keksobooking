'use strict';
(function () {
  var map = document.querySelector('.map');

  var makeStateActive = function () {
    var resetButton = window.form.noticeForm.querySelector('.form__reset');
    map.classList.remove('map--faded');
    window.form.noticeForm.classList.remove('notice__form--disabled');
    window.form.disableForm(false);
    window.pin.renderPin(window.data.nearAds);
    mainPin.removeEventListener('mouseup', makeStateActive);
    resetButton.addEventListener('click', makeStateInactive);
    resetButton.addEventListener('click', removeAllPins);
  };

  window.form.setAdressDefaultValue();
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('mouseup', makeStateActive);
  mainPin.addEventListener('mouseup', window.form.defineAdressValue);

  var removeAllPins = function () {
    var parent = document.querySelector('.map__pins');
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = allPins.length - 1; i >= 0; i--) {
      parent.removeChild(allPins[i]);
    }
  };

  var makeStateInactive = function () {
    map.classList.add('map--faded');
    window.form.noticeForm.classList.add('notice__form--disabled');
    window.form.disableForm(true);
    window.form.setAdressDefaultValue();
    var cardActiveElement = document.querySelector('.map__card');
    if (cardActiveElement) {
      map.removeChild(cardActiveElement);
    }
    mainPin.addEventListener('mouseup', makeStateActive);
  };
})();

