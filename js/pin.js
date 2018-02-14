'use strict';

(function () {
  var template = document.querySelector('template').content;

  var definePinPosition = function () {
    var x = window.data.INITIAL_PIN_X;
    var y = window.data.INITIAL_PIN_Y;
    return (x + ', ' + y);
  };

  var createPin = function () {
    var pinTemplate = template.querySelector('.map__pin');
    return pinTemplate.cloneNode(true);
  };

  var fillPin = function (obj, pinTemplate) {
    pinTemplate.style.left = (obj.location.x - window.data.PIN_WIDTH / 2) + 'px';
    pinTemplate.style.top = (obj.location.y - window.data.PIN_HEIGHT) + 'px';
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

    // append pins to DOM
    appendPin(pins);
  };
  window.pin = {
    definePinPosition: definePinPosition,
    renderPin: renderPin
  };
})();
