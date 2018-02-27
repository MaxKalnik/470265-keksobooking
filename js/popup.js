'use strict';
(function () {
  window.popup = {
    closePopupHandler: function () {
      var popupCloseBtn = document.querySelector('.popup__close');
      var onPopupCloseClick = function () {
        var popup = document.querySelector('.popup');
        popup.style.visibility = 'hidden';
      };
      popupCloseBtn.addEventListener('click', onPopupCloseClick);
    }
  };
})();
