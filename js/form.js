'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var adress = noticeForm.querySelector('#address');

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

  // при разбитии на модули переделать на вариант с массивами
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

  var formValidation = function () {
    setPriceInputMax();
    noticeForm.querySelector('#type').addEventListener('change', setPriceInputMax);
    document.querySelector('.form__element--timing').addEventListener('change', syncTiming, true);
    capacityValidate();
    document.querySelector('#room_number').addEventListener('change', capacityValidate);
  };
  formValidation();

  window.form = {
    noticeForm: noticeForm,
    adress: adress,
    defineAdressValue: function () {
      adress.value = window.pin.definePinPosition();
    },
    setAdressDefaultValue: function () {
      adress.value = window.data.INITIAL_PIN_X + ', ' + window.data.INITIAL_PIN_Y;
    },
    disableForm: function (value) {
      var fieldset = window.form.noticeForm.querySelectorAll('fieldset');
      for (var i = 1; i < fieldset.length; i++) {
        fieldset[i].disabled = value;
      }
    }
  };
})();
