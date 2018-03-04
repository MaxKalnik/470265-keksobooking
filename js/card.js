'use strict';

(function () {
  var OFFER_PIC_WIDTH = 95;
  var OFFER_PIC_HEIGHT = 70;
  var OFFER_TYPE = {
    flat: 'Квартира',
    bungalo: 'Сарай',
    house: 'Дом'
  };

  var template = document.querySelector('template').content;

  var checkElement = function (element, elementContainer) {
    if (!element) {
      elementContainer.parentNode.removeChild(elementContainer);
      return false;
    }
    return true;
  };

  var defineOfferFeature = function (element, elementParent) {
    var features = elementParent.querySelector('.popup__features');
    checkElement(element.length, features);
    var featuresList = elementParent.querySelectorAll('.feature');
    [].forEach.call(featuresList, function (elem) {
      var featureInClassName = elem.className.split('--')[1];
      if (element.indexOf(featureInClassName) === -1) {
        elem.remove();
      }
    });
  };

  var defineOfferPictures = function (element, elementParent) {
    var popupPictures = elementParent.querySelector('.popup__pictures');
    checkElement(element.length, popupPictures);
    if (element.length > 4) {
      popupPictures.style = 'height: 145px; overflow-y: scroll';
    }
    var setImgAttr = function (inputImg, inputSrc) {
      inputImg.src = inputSrc;
      inputImg.width = OFFER_PIC_WIDTH;
      inputImg.height = OFFER_PIC_HEIGHT;
      inputImg.draggable = true;
    };
    var fragment = document.createDocumentFragment();
    var photoItem = popupPictures.querySelector('li');
    var img = photoItem.querySelector('img');
    for (var j = 0; j < element.length; j++) {
      if (j === 0) {
        setImgAttr(img, element[j]);
      } else {
        var photoItemNew = photoItem.cloneNode(true);
        var imgNew = photoItemNew.querySelector('img');
        setImgAttr(imgNew, element[j]);
        fragment.appendChild(photoItemNew);
      }
    }
    popupPictures.appendChild(fragment);
  };

  var createCard = function () {
    var mapCardTemplate = template.querySelector('.map__card');
    return mapCardTemplate.cloneNode(true);
  };

  var fillCard = function (cardData, cardTemplate) {
    cardTemplate.querySelector('h3').textContent = cardData.offer.title;
    cardTemplate.querySelector('small').textContent = cardData.offer.address;
    cardTemplate.querySelector('.popup__price').textContent = cardData.offer.price + ' ₽/ночь';
    cardTemplate.querySelector('h4').textContent = OFFER_TYPE['' + cardData.offer.type];
    cardTemplate.querySelector('p:nth-of-type(3)').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardTemplate.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;

    defineOfferFeature(cardData.offer.features, cardTemplate);

    if (checkElement(cardData.offer.description, cardTemplate.querySelector('p:nth-of-type(5)'))) {
      cardTemplate.querySelector('p:nth-of-type(5)').textContent = cardData.offer.description;
    }
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
    renderCard: function (cardData) {
      var cardElement = createCard();
      var card = fillCard(cardData, cardElement);
      appendCard(card);
    }
  };
})();
