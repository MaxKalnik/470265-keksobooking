'use strict';

(function () {
  var onMainPinMousedown = function () {
    var active = false;
    var onMainPinMousemove = function () {
      makeStateActive();
      active = true;
      document.removeEventListener('mousemove', onMainPinMousemove);
    };
    document.addEventListener('mousemove', onMainPinMousemove);

    window.pin.mainPin.addEventListener('mouseup', function () {
      if (!active) {
        makeStateActive();
      }
    });
  };

  var adsData = [];
  var filterValues = {
    'type': '',
    'price': '',
    'rooms': '',
    'guest': '',
    'featuresList': []
  };

  var PRICE_VALUES = {
    LOW_MIN: 0,
    LOW_MAX: 10000,
    MIDDLE_MAX: 50000,
    low: 'low',
    middle: 'middle',
    high: 'high'
  };

  var checkPrice = function (val) {
    if (val >= PRICE_VALUES.LOW_MIN && val < PRICE_VALUES.LOW_MAX) {
      return PRICE_VALUES.low;
    } else if (val >= PRICE_VALUES.LOW_MAX && val < PRICE_VALUES.MIDDLE_MAX) {
      return PRICE_VALUES.middle;
    } else if (val >= PRICE_VALUES.MIDDLE_MAX) {
      return PRICE_VALUES.high;
    }
    return true;
  };

  var getRank = function (elem) {
    var rank = 0;
    if (elem.offer.type === filterValues.type) {
      rank += 2;
    }
    if (checkPrice(elem.offer.price) === filterValues.price) {
      rank += 2;
    }
    if (elem.offer.rooms === +filterValues.rooms) {
      rank += 1;
    }
    if (elem.offer.guests === +filterValues.guests) {
      rank += 1;
    }
    for (var i = 0; i < filterValues.featuresList.length; i++) {
      if (elem.offer.features.some(function (it) {
        return it === filterValues.featuresList[i];
      })) {
        rank += 1;
      }
    }
    return rank;
  };

  var update = function () {
    window.popup.closePopup();
    var arr = adsData.slice();
    var deleteAds = function () {
      var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      [].forEach.call(pins, function (elem) {
        elem.remove();
      });
    };
    deleteAds();

    window.pin.renderPin(arr.sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  var addSelectOnChange = function (arg) {
    var node = document.querySelector('#housing-' + arg);
    node.addEventListener('change', function () {
      if (node.value === 'any') {
        filterValues[arg + ''] = true;
      } else {
        filterValues[arg + ''] = node.value;
      }
      window.utils.debounce(update);
    });
  };

  addSelectOnChange('type');
  addSelectOnChange('price');
  addSelectOnChange('rooms');
  addSelectOnChange('guests');

  var features = document.querySelector('#housing-features');
  features.addEventListener('change', function (evt) {
    if (evt.target.type === 'checkbox') {
      if (evt.target.checked) {
        filterValues.featuresList.push(evt.target.value);
      } else {
        filterValues.featuresList.splice(filterValues.featuresList.indexOf(evt.target.value), 1);
      }
    }
    window.utils.debounce(update);
  });

  var onSuccessLoad = function (data) {
    adsData = data.slice();
    window.pin.renderPin(adsData);
    window.map.showMapFilters(true);
  };

  var makeStateActive = function () {
    window.map.mapElement.classList.remove('map--faded');
    window.form.makeFormActive();
    window.backend.load(onSuccessLoad, window.backend.onError);
    window.pin.mainPin.removeEventListener('mousedown', onMainPinMousedown);
    window.form.resetButton.addEventListener('click', makeStateInactive);
    window.form.resetButton.addEventListener('click', window.map.removeAllPins);
  };

  var makeStateInactive = function () {
    window.map.mapElement.classList.add('map--faded');
    window.map.removeAllPins();
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
      window.backend.save(new FormData(window.form.noticeForm), function () {
        window.form.resetNoticeForm();
        makeStateInactive();
      }, window.backend.onError);
      evt.preventDefault();
    });
  };
  initialize();
})();
