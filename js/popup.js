'use strict';
(function () {
  var popup = document.querySelector('.popup');
  var closePopup = function () {
    popup.style.visibility = 'hidden';
  };
  window.popup = {
    addPopupCloseHandler: function () {
      var popupCloseBtn = document.querySelector('.popup__close');
      popupCloseBtn.addEventListener('click', function () {
        closePopup();
        document.removeEventListener('keydown', closePopupEsc, {once: true});
      });

      var closePopupEsc = function (evt) {
        window.utils.onEscPress(evt, closePopup);
      };
      document.addEventListener('keydown', closePopupEsc, {once: true});
    },
    closePopup: closePopup,
    popupElement: popup
  };
})();
