'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var placeTypeInput = window.map.noticeForm.querySelector('#type');
  var priceInput = window.map.noticeForm.querySelector('#price');

  var setPriceInputMax = function () {
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

  var timeInInput = document.querySelector('#timein');
  var timeOutInput = document.querySelector('#timeout');

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
    placeTypeInput.addEventListener('change', setPriceInputMax);
    document.querySelector('.form__element--timing').addEventListener('change', syncTiming, true);
    capacityValidate();
    document.querySelector('#room_number').addEventListener('change', capacityValidate);
  };

  formValidation();
})();
