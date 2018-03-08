'use strict';

(function () {
  var closePopup = function () {
    var popup = document.querySelector('.popup');
    if (popup) {
      popup.style.visibility = 'hidden';
    }
  };

  var addPopupCloseHandler = function () {
    var popupCloseBtn = document.querySelector('.popup__close');
    popupCloseBtn.addEventListener('click', function () {
      closePopup();
      document.removeEventListener('keydown', closePopupEsc);
    });

    var closePopupEsc = function (evt) {
      window.utils.onEscPress(evt, closePopup);
      document.removeEventListener('keydown', closePopupEsc);
    };
    document.addEventListener('keydown', closePopupEsc);
  };

  window.popup = {
    addPopupCloseHandler: addPopupCloseHandler,
    closePopup: closePopup
  };
})();
