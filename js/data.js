'use strict';

(function () {
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 150;
  var LOCATION_Y_MAX = 500;
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_PRICE_MIN = 1000;
  var OFFER_PRICE_MAX = 1000000;
  var OFFER_ROOMS_MIN = 1;
  var OFFER_ROOMS_MAX = 5;
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_PHOTO_URLS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var getRandomBetween = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var shuffleArray = function (array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i >= 0; i--) {
      var j = getRandomBetween(0, newArray.length - 1);
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  };

  var randomizeArray = function (array) {
    var index = getRandomBetween(0, array.length);
    var newArray = shuffleArray(array.slice());

    if (index === 0) {
      newArray.splice(index + 1, newArray.length - index);
    } else {
      newArray.splice(index, newArray.length - index);
    }
    return newArray;
  };

  var generateSimilarAds = function (quantity) {
    var arr = [];
    var titles = OFFER_TITLES.slice();
    titles.sort(function () {
      return Math.random() - 0.5;
    });
    for (var i = 0; i < quantity; i++) {
      var obj = {'author': {}, 'offer': {}, 'location': {}};
      if (i >= 9) {
        obj.author.avatar = 'img/avatars/user' + (i + 1) + '.png';
      }
      obj.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
      obj.offer.title = titles[i];
      obj.offer.price = getRandomBetween(OFFER_PRICE_MIN, OFFER_PRICE_MAX);
      obj.offer.type = OFFER_TYPES[getRandomBetween(0, OFFER_TYPES.length - 1)];
      obj.offer.rooms = getRandomBetween(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX);
      obj.offer.guests = Math.round(Math.random() * 100);
      obj.offer.checkin = OFFER_CHECKINS[getRandomBetween(0, OFFER_CHECKINS.length - 1)];
      obj.offer.checkout = OFFER_CHECKOUTS[getRandomBetween(0, OFFER_CHECKOUTS.length - 1)];
      obj.offer.features = randomizeArray(OFFER_FEATURES);
      obj.offer.description = '';
      obj.offer.photos = shuffleArray(OFFER_PHOTO_URLS);
      obj.location.x = getRandomBetween(LOCATION_X_MIN, LOCATION_X_MAX);
      obj.location.y = getRandomBetween(LOCATION_Y_MIN, LOCATION_Y_MAX);
      obj.offer.address = obj.location.x + ', ' + obj.location.y;
      arr.push(obj);
    }
    return arr;
  };

  window.data = {
    nearAds: generateSimilarAds(8)
  };
})();
