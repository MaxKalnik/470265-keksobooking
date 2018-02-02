'use strict';

var nearAds = [];
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

var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content;
var fragmentPin = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

var getRandomNumber = function () {
  return Math.round(Math.random() * 100);
};

var getRandomBetween = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Функция является аргументом для метода работы с массивами 'sort'
var sortRandom = function () {
  return Math.random() - 0.5;
};

var randomizeArray = function (array) {
  var index = getRandomBetween(0, array.length);
  var newArray = array.slice();
  newArray.sort(sortRandom);
  if (index === 0) {
    array.splice(index + 1, newArray.length - index);
  } else {
    newArray.splice(index, newArray.length - index);
  }
  return newArray;
};

var generateSimilarAds = function (targetArray, quantity) {
  for (var i = 0; i < quantity; i++) {
    targetArray[i] = {'author': {}, 'offer': {}, 'location': {}};
    targetArray[i].author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    targetArray[i].offer.title = OFFER_TITLES[getRandomBetween(0, OFFER_TITLES.length - 1)];
    targetArray[i].offer.price = getRandomBetween(OFFER_PRICE_MIN, OFFER_PRICE_MAX);
    targetArray[i].offer.type = OFFER_TYPES[getRandomBetween(0, OFFER_TYPES.length - 1)];
    targetArray[i].offer.rooms = getRandomBetween(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX);
    targetArray[i].offer.guests = getRandomNumber();
    targetArray[i].offer.checkin = OFFER_CHECKINS[getRandomBetween(0, OFFER_CHECKINS.length - 1)];
    targetArray[i].offer.checkout = OFFER_CHECKOUTS[getRandomBetween(0, OFFER_CHECKOUTS.length - 1)];
    targetArray[i].offer.features = randomizeArray(OFFER_FEATURES);
    targetArray[i].offer.description = '';
    targetArray[i].offer.photos = OFFER_PHOTO_URLS.sort(sortRandom);
    targetArray[i].location.x = getRandomBetween(LOCATION_X_MIN, LOCATION_X_MAX);
    targetArray[i].location.y = getRandomBetween(LOCATION_Y_MIN, LOCATION_Y_MAX);
    targetArray[i].offer.address = targetArray[i].location.x + ', ' + targetArray[i].location.y;
  }
};

var renderPin = function (array) {
  for (var i = 0; i < array.length; i++) {
    var pinElement = document.querySelector('.map__pin').cloneNode(true);

    pinElement.style.left = (array[i].location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (array[i].location.y - PIN_HEIGHT) + 'px';
    pinElement. querySelector('img').src = array[i].author.avatar;

    fragmentPin.appendChild(pinElement);
  }
  mapPins.appendChild(fragmentPin);
};

var defineOfferFeature = function (array, parent) {
  parent.innerHTML = '';
  for (var j = 0; j < array.length; j++) {
    var feature = document.createElement('li');
    feature.classList.add('feature');
    feature.classList.add('feature--' + array[j]);
    parent.appendChild(feature);
  }
};

var defineOfferPictures = function (array, parent) {
  for (var j = 0; j < array.length; j++) {
    var photo = document.createElement('li');
    photo.innerHTML = '<img src="' + array[j] + '" width="100" height="70">';
    parent.appendChild(photo);
  }
};

var defineOfferType = function (element) {
  var offerType;
  switch (element) {
    case 'flat':
      offerType = 'Квартира';
      break;

    case 'bungalo':
      offerType = 'Бунгало';
      break;

    case 'house':
      offerType = 'Дом';
      break;

    default:
      offerType = 'Квартира';
  }
  return offerType;
};

var renderCard = function (array) {
  for (var i = 0; i < array.length; i++) {
    var cardElement = mapCardTemplate.cloneNode(true);
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupPictures = cardElement.querySelector('.popup__pictures');

    cardElement.querySelector('h3').textContent = array[i].offer.title;
    cardElement.querySelector('small').textContent = array[i].offer.address;
    cardElement.querySelector('.popup__price').textContent = array[i].offer.price + ' $/ночь';
    cardElement.querySelector('h4').textContent = defineOfferType(array[i].offer.type);
    cardElement.querySelector('h4 + p').textContent = array[i].offer.rooms + ' комнаты для ' + array[i].offer.guests + ' гостей';
    cardElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + array[i].offer.checkin + ', выезд до ' + array[i].offer.checkout;

    defineOfferFeature(array[i].offer.features, popupFeatures);

    cardElement.querySelector('ul + p').textContent = array[i].offer.description;
    cardElement.querySelector('.popup__avatar').src = array[i].author.avatar;

    defineOfferPictures(array[i].offer.photos, popupPictures);

    fragmentCard.appendChild(cardElement);
  }
  map.insertBefore(fragmentCard, mapFiltersContainer);
};

generateSimilarAds(nearAds, 8);
renderPin(nearAds);
renderCard(nearAds);

map.classList.remove('map--faded');
