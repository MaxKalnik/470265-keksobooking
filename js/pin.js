'use strict';

(function () {
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;
  var INITIAL_PIN_X = window.data.INITIAL_X - PIN_WIDTH / 2;
  var INITIAL_PIN_Y = window.data.INITIAL_Y - PIN_HEIGHT;

  var template = document.querySelector('template').content;
  var mainPin = document.querySelector('.map__pin--main');

  var definePinPosition = function () {
    var x = INITIAL_PIN_X;
    var y = INITIAL_PIN_Y;
    return (x + ', ' + y);
  };

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
    definePinPosition: definePinPosition,
    renderPin: renderPin,
    mainPin: mainPin
  };
})();
