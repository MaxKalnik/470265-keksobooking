'use strict';

(function () {
  var onMainPinMousedown = function () {
    var active = false;
    var onMainPinMousemove = function () {
      document.removeEventListener('mousemove', onMainPinMousemove);
      if (!active) {
        makeStateActive();
      }
      active = true;
    };
    document.addEventListener('mousemove', onMainPinMousemove);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', onMainPinMousemove);
    });
  };

  var onSuccessLoad = function (data) {
    window.filter.adsData = data.slice();
    window.pin.renderPin(window.filter.adsData);
    window.filter.activateFiltering(window.filter.adsData);
    window.map.showMapFilters(true);
  };

  var makeStateActive = function () {
    window.map.mapElement.classList.remove('map--faded');
    window.form.makeFormActive();
    window.backend.load(window.backend.Methods.get, window.backend.Url.get, onSuccessLoad, window.backend.onError);
    window.pin.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.form.resetButton.addEventListener('click', makeStateInactive);
    window.form.resetButton.addEventListener('click', window.map.removeAllPins);
  };

  var makeStateInactive = function () {
    window.map.mapElement.classList.add('map--faded');
    window.map.removeAllPins();
    window.filter.deactivateFiltering(window.filter.adsData);
    window.form.makeFormInActive();
    window.pin.movePinToInitial();
    var cardActiveElement = document.querySelector('.map__card');
    if (cardActiveElement) {
      window.map.mapElement.removeChild(cardActiveElement);
    }
    window.pin.mainPin.addEventListener('mousedown', onMainPinMousedown);
  };

  var initialize = function () {
    window.map.showMapFilters(false);
    window.form.disableForm(true);
    window.form.setAdressDefaultValue('default');
    window.pin.mainPin.addEventListener('mousedown', onMainPinMousedown);
    window.pin.mainPin.addEventListener('keydown', function (keydownEvt) {
      window.utils.onEnterPress(keydownEvt, makeStateActive);
    });
    window.form.noticeForm.addEventListener('submit', function (evt) {
      window.backend.save(window.backend.Methods.post, window.backend.Url.post, function () {
        window.form.resetNoticeForm();
        makeStateInactive();
      }, window.backend.onError, new FormData(window.form.noticeForm));
      evt.preventDefault();
    });
  };
  initialize();
})();
