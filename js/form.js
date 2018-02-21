'use strict';

(function () {
  var ADRESS_INITIAL_X = 528;
  var ADRESS_INITIAL_Y = 375;
  var noticeForm = document.querySelector('.notice__form');
  var adress = noticeForm.querySelector('#address');

  var disableForm = function (value) {
    var fieldset = noticeForm.querySelectorAll('fieldset');
    for (var i = 1; i < fieldset.length; i++) {
      fieldset[i].disabled = value;
    }
  };

  var setPriceInputMax = function () {
    var priceInput = noticeForm.querySelector('#price');
    var placeTypeInput = noticeForm.querySelector('#type');
    var type = placeTypeInput.value;
    var prices = {
      bungalo: 0,
      flat: 1000,
      house: 5000,
      palace: 10000
    };
    priceInput.setAttribute('min', prices['' + type]);
    priceInput.setAttribute('placeholder', prices['' + type]);
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

  var capacityValidate = function () {
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var guests = capacity.querySelectorAll('option');
    var noGuests = capacity.querySelector('option[value="0"]');
    noGuests.disabled = true;

    for (var i = 0; i < guests.length; i++) {
      if (+roomNumber.value === 100) {
        guests[i].disabled = true;
        noGuests.disabled = false;
      } else if (+roomNumber.value < guests[i].value && +guests[i].value !== 0) {
        guests[i].disabled = true;
        guests[i].selected = false;
      } else {
        guests[i].disabled = false;
        noGuests.disabled = true;
      }
      capacity.querySelector('option:not(:disabled)').selected = true;
    }
  };

  var activateFormValidation = function () {
    setPriceInputMax();
    noticeForm.querySelector('#type').addEventListener('change', setPriceInputMax);
    document.querySelector('.form__element--timing').addEventListener('change', syncTiming, true);
    capacityValidate();
    document.querySelector('#room_number').addEventListener('change', capacityValidate);
  };

  window.form = {
    resetButton: noticeForm.querySelector('.form__reset'),
    adress: adress,
    defineAdressValue: function (x, y) {
      adress.value = Math.round(x) + ', ' + Math.round(y);
    },
    setAdressDefaultValue: function (value) {
      if (value === 'active') {
        adress.value = ADRESS_INITIAL_X + ', ' + (ADRESS_INITIAL_Y + window.pin.PIN_POINTER_HEIGHT);
      } else if (value === 'default') {
        adress.value = ADRESS_INITIAL_X + ', ' + ADRESS_INITIAL_Y;
      }
    },
    makeFormActive: function () {
      noticeForm.classList.remove('notice__form--disabled');
      window.form.setAdressDefaultValue('active');
      disableForm(false);
      activateFormValidation();
    },
    makeFormInActive: function () {
      noticeForm.classList.add('notice__form--disabled');
      disableForm(true);
      window.form.setAdressDefaultValue('default');
    }
  };
})();
