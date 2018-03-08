'use strict';

(function () {
  var ADRESS_INITIAL_Y = 375;
  var Price = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  var noticeForm = document.querySelector('.notice__form');
  var adress = noticeForm.querySelector('#address');
  var placeTypeInput = noticeForm.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var timingFieldset = document.querySelector('.form__element--timing');
  var fieldsets = noticeForm.querySelectorAll('fieldset');
  var priceInput = noticeForm.querySelector('#price');
  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');

  var disableForm = function (boolFlag) {
    [].forEach.call(fieldsets, function (fieldset) {
      fieldset.disabled = boolFlag;
    });
  };

  var setPriceInputMax = function () {
    var type = placeTypeInput.value;
    priceInput.setAttribute('min', Price['' + type.toUpperCase()]);
    priceInput.setAttribute('placeholder', Price['' + type.toUpperCase()]);
  };

  var syncTiming = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'select') {
      var value = evt.target.value;
      if (evt.target.id === 'timein') {
        timeOutInput.value = value;
      } else {
        timeInInput.value = value;
      }
    }
  };

  var validateCapacity = function () {
    var guests = capacity.querySelectorAll('option');
    var noGuests = capacity.querySelector('option[value="0"]');
    noGuests.disabled = true;

    [].forEach.call(guests, function (elem) {
      if (+roomNumber.value === 100) {
        elem.disabled = true;
        noGuests.disabled = false;
      } else if (+roomNumber.value < elem.value && +elem.value !== 0) {
        elem.disabled = true;
        elem.selected = false;
      } else {
        elem.disabled = false;
        noGuests.disabled = true;
      }
      if (capacity.querySelector('option:not(:disabled)')) {
        capacity.querySelector('option:not(:disabled)').selected = true;
      }
    });
  };

  var resetNoticeForm = function () {
    noticeForm.reset();
    window.form.setAdressDefaultValue('default');
    activateFormValidation();
    window.map.showMapFilters(false);
    window.avatar.clearPreview();
    window.avatar.clearPhotos();
  };

  var activateFormValidation = function () {
    setPriceInputMax();
    placeTypeInput.addEventListener('change', setPriceInputMax);
    timingFieldset.addEventListener('change', syncTiming, true);
    validateCapacity();
    roomNumber.addEventListener('change', validateCapacity);
  };

  var deactivateFormValidation = function () {
    placeTypeInput.removeEventListener('change', setPriceInputMax);
    timingFieldset.removeEventListener('change', syncTiming, true);
    roomNumber.removeEventListener('change', validateCapacity);
  };

  window.form = {
    noticeForm: noticeForm,
    resetButton: noticeForm.querySelector('.form__reset'),
    adress: adress,
    resetNoticeForm: resetNoticeForm,
    defineAdressValue: function (x, y) {
      adress.value = Math.round(x) + ', ' + (Math.round(y) + window.pin.PIN_POINTER_HEIGHT + Math.ceil(window.pin.PIN_HEIGHT / 2));
    },
    setAdressDefaultValue: function (value) {
      if (value === 'active') {
        adress.value = Math.floor(window.pin.mapPins.getBoundingClientRect().width / 2 + window.pin.PIN_WIDTH / 2) + ', ' + (ADRESS_INITIAL_Y + window.pin.PIN_POINTER_HEIGHT + window.pin.PIN_HEIGHT);
      } else if (value === 'default') {
        adress.value = Math.floor(window.pin.mapPins.getBoundingClientRect().width / 2) + ', ' + ADRESS_INITIAL_Y;
      }
    },
    disableForm: disableForm,
    makeFormActive: function () {
      noticeForm.classList.remove('notice__form--disabled');
      window.form.setAdressDefaultValue('active');
      disableForm(false);
      activateFormValidation();
    },
    makeFormInActive: function () {
      noticeForm.classList.add('notice__form--disabled');
      resetNoticeForm();
      disableForm(true);
      deactivateFormValidation();
    }
  };
})();
