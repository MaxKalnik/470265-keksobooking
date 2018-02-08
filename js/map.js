'use strict';

(function () {
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
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 150;
  var LOCATION_Y_MAX = 500;
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 84;

  var getRandomBetween = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var randomizeArray = function (array) {
    var index = getRandomBetween(0, array.length);
    var newArray = array.slice();
    newArray.sort(function () {
      return Math.random() - 0.5;
    });
    if (index === 0) {
      array.splice(index + 1, newArray.length - index);
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
      obj.offer.photos = OFFER_PHOTO_URLS.sort(function () {
        return Math.random() - 0.5;
      });
      obj.location.x = getRandomBetween(LOCATION_X_MIN, LOCATION_X_MAX);
      obj.location.y = getRandomBetween(LOCATION_Y_MIN, LOCATION_Y_MAX);
      obj.offer.address = obj.location.x + ', ' + obj.location.y;
      arr.push(obj);
    }
    return arr;
  };

  var template = document.querySelector('template').content;
  var pinTemplate = template.querySelector('.map__pin');
  var fragmentPin = document.createDocumentFragment();

  var renderPin = function (array) {
    for (var i = 0; i < array.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);

      pinElement.style.left = (array[i].location.x - PIN_WIDTH / 2) + 'px';
      pinElement.style.top = (array[i].location.y - PIN_HEIGHT) + 'px';
      pinElement.querySelector('img').src = array[i].author.avatar;

      fragmentPin.appendChild(pinElement);
    }
    document.querySelector('.map__pins').appendChild(fragmentPin);
  };

  var defineOfferFeature = function (array, parent) {
    var featuresList = parent.querySelectorAll('.feature');
    [].forEach.call(featuresList, function (elm) {
      var featureInClassName = elm.className.split('--')[1];
      if (array.indexOf(featureInClassName) === -1) {
        elm.remove();
      }
    });
  };

  var defineOfferPictures = function (array, parent) {
    var popupPictures = parent.querySelector('.popup__pictures');
    var photoItem = popupPictures.querySelector('li');
    var img = photoItem.querySelector('img');
    for (var j = 0; j < array.length; j++) {
      if (j === 0) {
        img.src = array[j];
        img.width = 100;
        img.height = 70;
      } else {
        var photoItemNew = photoItem.cloneNode(true);
        var imgNew = photoItemNew.querySelector('img');
        imgNew.src = array[j];
        imgNew.width = 100;
        imgNew.height = 70;
        popupPictures.appendChild(photoItemNew);
      }
    }
  };

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapCardTemplate = template.querySelector('.map__card');
  var fragmentCard = document.createDocumentFragment();

  var renderCard = function (array) {
    var offerType = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };

    var i = 0;

    var cardElement = mapCardTemplate.cloneNode(true);

    cardElement.querySelector('h3').textContent = array[i].offer.title;
    cardElement.querySelector('small').textContent = array[i].offer.address;
    cardElement.querySelector('.popup__price').textContent = array[i].offer.price + ' ₽/ночь';
    cardElement.querySelector('h4').textContent = offerType['' + array[i].offer.type];
    cardElement.querySelector('p:nth-of-type(3)').textContent = array[i].offer.rooms + ' комнаты для ' + array[i].offer.guests + ' гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + array[i].offer.checkin + ', выезд до ' + array[i].offer.checkout;

    defineOfferFeature(array[i].offer.features, cardElement);

    cardElement.querySelector('p:nth-of-type(5)').textContent = array[i].offer.description;
    cardElement.querySelector('.popup__avatar').src = array[i].author.avatar;

    defineOfferPictures(array[i].offer.photos, cardElement);

    fragmentCard.appendChild(cardElement);
    map.insertBefore(fragmentCard, mapFiltersContainer);
  };

  var nearAds = generateSimilarAds(8);
  renderPin(nearAds);
  renderCard(nearAds);

  map.classList.remove('map--faded');
})();
