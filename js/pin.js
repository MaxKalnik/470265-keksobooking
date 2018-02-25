'use strict';

(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var PIN_POINTER_HEIGHT = 22;
  var PIN_LEFT_INITIAL = '50%';
  var PIN_TOP_INITIAL = '375px';

  var template = document.querySelector('template').content;
  var mainPin = document.querySelector('.map__pin--main');

  var getRestrictedCoords = function (targetEvt, parent) {
    var obj = parent.getBoundingClientRect();
    var coords = {
      x: targetEvt.clientX + pageXOffset,
      y: targetEvt.clientY + pageYOffset
    };

    if (targetEvt.clientX >= obj.right - PIN_WIDTH) {
      coords.x = obj.right - PIN_WIDTH + pageXOffset;
    }
    if (targetEvt.clientX <= obj.left + PIN_WIDTH) {
      coords.x = obj.left + PIN_WIDTH + pageXOffset;
    }
    if (targetEvt.clientY >= obj.bottom - PIN_HEIGHT) {
      coords.y = obj.bottom - PIN_HEIGHT + pageYOffset;
    }
    if (targetEvt.clientY <= obj.top + PIN_HEIGHT) {
      coords.y = obj.top + PIN_HEIGHT + pageYOffset;
    }
    return coords;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX + pageXOffset,
      y: evt.clientY + pageYOffset
    };
    var parentNode = document.querySelector('.map__pins');

    var onMouseMove = function (moveEvt) {
      var moveCoords = getRestrictedCoords(moveEvt, parentNode);
      var shifted = {
        x: startCoords.x - moveCoords.x,
        y: startCoords.y - moveCoords.y
      };

      mainPin.style.left = (mainPin.offsetLeft - shifted.x) + 'px';
      mainPin.style.top = (mainPin.offsetTop - shifted.y) + 'px';

      if (document.querySelector('.map').classList.contains('map--faded')) {
        window.form.defineAdressValue((mainPin.offsetLeft - shifted.x), (mainPin.offsetTop - shifted.y));
      } else {
        window.form.defineAdressValue((mainPin.offsetLeft - shifted.x), (mainPin.offsetTop - shifted.y + PIN_POINTER_HEIGHT));
      }

      startCoords = {
        x: moveCoords.x,
        y: moveCoords.y
      };
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
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
    for (var i = 0; i < pins.length; i++) {
      fragmentPin.appendChild(pins[i]);
    }
    document.querySelector('.map__pins').appendChild(fragmentPin);
  };

  var renderPin = function (pinData) {
    var pins = pinData.map(function (pinDataElement) {
      // create pin
      var pinTemplate = createPin();
      // fill created pin
      var pin = fillPin(pinDataElement, pinTemplate);
      pin.addEventListener('click', function () {
        window.card.renderCard(pinDataElement);
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
      mainPin.style.left = PIN_LEFT_INITIAL;
      mainPin.style.top = PIN_TOP_INITIAL;
    }
  };
})();
