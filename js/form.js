'use strict';

(function () {
  var ADRESS_INITIAL_Y = 375;

  var noticeForm = document.querySelector('.notice__form');
  var adress = noticeForm.querySelector('#address');

  var disableForm = function (boolFlag) {
    var fieldsets = noticeForm.querySelectorAll('fieldset');
    [].forEach.call(fieldsets, function (fieldset) {
      fieldset.disabled = boolFlag;
    });
  };

  var setPriceInputMax = function () {
    var priceInput = noticeForm.querySelector('#price');
    var placeTypeInput = noticeForm.querySelector('#type');
    var type = placeTypeInput.value;
    var price = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };
    priceInput.setAttribute('min', price['' + type]);
    priceInput.setAttribute('placeholder', price['' + type]);
  };

  var syncTiming = function (evt) {
    var timeInInput = document.querySelector('#timein');
    var timeOutInput = document.querySelector('#timeout');
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
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
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
    noticeForm.querySelector('#type').addEventListener('change', setPriceInputMax);
    document.querySelector('.form__element--timing').addEventListener('change', syncTiming, true);
    validateCapacity();
    document.querySelector('#room_number').addEventListener('change', validateCapacity);
  };

  var deactivateFormValidation = function () {
    noticeForm.querySelector('#type').removeEventListener('change', setPriceInputMax);
    document.querySelector('.form__element--timing').removeEventListener('change', syncTiming, true);
    document.querySelector('#room_number').removeEventListener('change', validateCapacity);
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
