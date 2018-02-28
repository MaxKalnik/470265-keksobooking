'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_POINTER_HEIGHT = 22;
  var PIN_TOP_LIMIT = 150;
  var PIN_BOTTOM_LIMIT = 650;

  var template = document.querySelector('template').content;
  var mainPin = document.querySelector('.map__pin--main');

  var getRestrictedCoords = function (targetEvt, parent) {
    var obj = parent.getBoundingClientRect();
    var coords = {
      x: targetEvt.clientX + pageXOffset,
      y: targetEvt.clientY + pageYOffset
    };

    if (targetEvt.clientX + pageXOffset >= obj.right - PIN_WIDTH / 2) {
      coords.x = obj.right - PIN_WIDTH / 2 + pageXOffset;
    }
    if (targetEvt.clientX + pageXOffset <= obj.left + PIN_WIDTH / 2) {
      coords.x = obj.left + PIN_WIDTH / 2 + pageXOffset;
    }

    if (targetEvt.clientY + pageYOffset >= PIN_BOTTOM_LIMIT - PIN_POINTER_HEIGHT) {
      coords.y = PIN_BOTTOM_LIMIT - PIN_POINTER_HEIGHT;
    }
    if (targetEvt.clientY + pageYOffset <= PIN_TOP_LIMIT - PIN_POINTER_HEIGHT) {
      coords.y = PIN_TOP_LIMIT - PIN_POINTER_HEIGHT;
    }
    return coords;
  };

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      width: box.width,
      height: box.height
    };
  };

  var mapPins = document.querySelector('.map__pins');

  mainPin.addEventListener('mousedown', function (evt) {
    var shiftX = evt.clientX + pageXOffset - (getCoords(mainPin).left + getCoords(mainPin).width / 2);
    var shiftY = evt.clientY + pageYOffset - (getCoords(mainPin).top + getCoords(mainPin).height / 2);

    var startCoords = {
      x: evt.clientX + pageXOffset - shiftX,
      y: evt.clientY + pageYOffset - shiftY
    };

    var defineShiftedCoords = function (targetEvt, parent) {
      var moveCoords = getRestrictedCoords(targetEvt, parent);
      return {
        x: startCoords.x - moveCoords.x,
        y: startCoords.y - moveCoords.y
      };
    };

    var onMouseMove = function (moveEvt) {
      var shifted = defineShiftedCoords(moveEvt, mapPins);

      mainPin.style.left = (mainPin.offsetLeft - shifted.x) + 'px';
      mainPin.style.top = (mainPin.offsetTop - shifted.y) + 'px';

      window.form.defineAdressValue(mainPin.offsetLeft - shifted.x, mainPin.offsetTop - shifted.y);

      startCoords = getRestrictedCoords(moveEvt, mapPins);
    };

    var onMouseUp = function (upEvt) {
      var shiftedUp = defineShiftedCoords(upEvt, mapPins);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.defineAdressValue(mainPin.offsetLeft - shiftedUp.x, mainPin.offsetTop - shiftedUp.y);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var createPin = function () {
    var pinTemplate = template.querySelector('.map__pin');
    return pinTemplate.cloneNode(true);
  };

  var fillPin = function (obj, pinTemplate) {
    pinTemplate.style.left = (obj.location.x - PIN_WIDTH / 2) + 'px';
    pinTemplate.style.top = (obj.location.y - PIN_HEIGHT) + 'px';
    pinTemplate.querySelector('img').src = obj.author.avatar;
    return pinTemplate;
  };

  var appendPin = function (pins) {
    var fragmentPin = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragmentPin.appendChild(pins[i]);
    }
    document.querySelector('.map__pins').appendChild(fragmentPin);
  };

  var renderPin = function (pinData) {
    var pins = pinData.map(function (pinDataElement) {
      var pinTemplate = createPin();
      var pin = fillPin(pinDataElement, pinTemplate);
      pin.addEventListener('click', function () {
        window.card.renderCard(pinDataElement);
        window.popup.addPopupCloseHandler();
      });
      return pin;
    });
    appendPin(pins);
  };

  window.pin = {
    renderPin: renderPin,
    mainPin: mainPin,
    PIN_POINTER_HEIGHT: PIN_POINTER_HEIGHT,
    movePinToInitial: function () {
      mainPin.style.left = '';
      mainPin.style.top = '';
    },
    mapPins: mapPins
  };
})();
