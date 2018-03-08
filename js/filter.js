'use strict';

(function () {
  var PRICE_VALUES = {
    LOW_MIN: 0,
    LOW_MAX: 10000,
    MIDDLE_MAX: 50000,
    low: 'low',
    middle: 'middle',
    high: 'high'
  };

  var features = document.querySelector('#housing-features');
  var filterValues = {
    'type': '',
    'price': '',
    'rooms': '',
    'guest': '',
    'featuresList': [],
    'typeFlag': true,
    'priceFlag': true,
    'roomsFlag': true,
    'guestsFlag': true
  };
  var minRank = 0;

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
      rank += 1;
    }
    if (checkPrice(elem.offer.price) === filterValues.price) {
      rank += 1;
    }
    if (elem.offer.rooms === +filterValues.rooms && +filterValues.rooms !== 0) {
      rank += 1;
    }
    if (elem.offer.guests === +filterValues.guests && +filterValues.guests !== 0) {
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
    var arr = window.filter.adsData.slice();
    window.map.removeAllPins();

    window.pin.renderPin(arr.filter(function (elem) {
      return getRank(elem) >= minRank;
    }));
  };

  var toggleSelectOnChange = function (arg, boolFlag) {
    var node = document.querySelector('#housing-' + arg);
    var onChange = function () {
      if (node.value === 'any') {
        filterValues[arg + ''] = 'any';
        minRank -= 1;
        filterValues[arg + 'Flag'] = true;
      } else {
        filterValues[arg + ''] = node.value;
        if (filterValues[arg + 'Flag']) {
          minRank += 1;
          filterValues[arg + 'Flag'] = false;
        }
      }
      window.utils.debounce(update);
    };
    if (boolFlag) {
      node.addEventListener('change', onChange);
    } else {
      node.removeEventListener('change', onChange);
    }
  };

  var featuresOnChange = function (evt) {
    if (evt.target.type === 'checkbox') {
      if (evt.target.checked) {
        filterValues.featuresList.push(evt.target.value);
        minRank += 1;
      } else {
        filterValues.featuresList.splice(filterValues.featuresList.indexOf(evt.target.value), 1);
        minRank -= 1;
      }
    }
    window.utils.debounce(update);
  };

  var activateFiltering = function () {
    toggleSelectOnChange('type', true);
    toggleSelectOnChange('price', true);
    toggleSelectOnChange('rooms', true);
    toggleSelectOnChange('guests', true);
    features.addEventListener('change', featuresOnChange);
  };

  var deactivateFiltering = function () {
    toggleSelectOnChange('type', false);
    toggleSelectOnChange('price', false);
    toggleSelectOnChange('rooms', false);
    toggleSelectOnChange('guests', false);
    features.removeEventListener('change', featuresOnChange);
    window.map.resetMapFilters();
    minRank = 0;
    filterValues = {
      'type': '',
      'price': '',
      'rooms': '',
      'guest': '',
      'featuresList': [],
      'typeFlag': true,
      'priceFlag': true,
      'roomsFlag': true,
      'guestsFlag': true
    };
  };
  window.filter = {
    adsData: [],
    activateFiltering: activateFiltering,
    deactivateFiltering: deactivateFiltering
  };
})();
