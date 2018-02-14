'use strict';

(function () {
  var template = document.querySelector('template').content;

  var defineOfferFeature = function (array, parent) {
    var features = parent.querySelector('.popup__features');
    if (array.length > 0) {
      var featuresList = parent.querySelectorAll('.feature');
      [].forEach.call(featuresList, function (elm) {
        var featureInClassName = elm.className.split('--')[1];
        if (array.indexOf(featureInClassName) === -1) {
          elm.remove();
        }
      });
    } else {
      parent.removeChild(features);
    }
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

  var createCard = function () {
    var mapCardTemplate = template.querySelector('.map__card');
    return mapCardTemplate.cloneNode(true);
  };

  var fillCard = function (cardData, cardTemplate) {
    var offerType = {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    };

    cardTemplate.querySelector('h3').textContent = cardData.offer.title;
    cardTemplate.querySelector('small').textContent = cardData.offer.address;
    cardTemplate.querySelector('.popup__price').textContent = cardData.offer.price + ' ₽/ночь';
    cardTemplate.querySelector('h4').textContent = offerType['' + cardData.offer.type];
    cardTemplate.querySelector('p:nth-of-type(3)').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTemplate.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    defineOfferFeature(cardData.offer.features, cardTemplate);

    cardTemplate.querySelector('p:nth-of-type(5)').textContent = cardData.offer.description;
    cardTemplate.querySelector('.popup__avatar').src = cardData.author.avatar;

    defineOfferPictures(cardData.offer.photos, cardTemplate);

    return cardTemplate;
  };

  var appendCard = function (card) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    var fragmentCard = document.createDocumentFragment();
    var mapCards = document.querySelectorAll('.map__card');
    fragmentCard.appendChild(card);

    if (mapCards.length > 0) {
      document.querySelector('.map').replaceChild(fragmentCard, mapCards[0]);
    }
    document.querySelector('.map').insertBefore(fragmentCard, mapFiltersContainer);
  };

  window.card = {
    renderCard: function (obj) {
      // create card
      var cardElement = createCard();
      // fill created Card
      var card = fillCard(obj, cardElement);
      // append filled card in DOM
      appendCard(card);
    }
  };
})();
