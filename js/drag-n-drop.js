'use strict';
(function () {
  window.dragNDrop = {
    popupImages: function () {
      var popupPictures = document.querySelector('.popup__pictures');
      var dragEl;

      var onDragstart = function (evt) {
        dragEl = evt.target.parentNode;
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('text/plain', dragEl.textContent);
        setTimeout(function () {
          dragEl.style.opacity = '0.4';
        }, 0);
      };

      var onDragOver = function (evt) {
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
        var target = evt.target.parentNode;
        if (target && target !== dragEl && target.tagName.toLowerCase() === 'li') {
          popupPictures.insertBefore(dragEl, popupPictures.children[0] !== target && target.nextSibling || target);
        }
      };

      var onDragEnd = function (evt) {
        evt.preventDefault();
        dragEl.style.opacity = '1';
      };

      if (popupPictures) {
        popupPictures.addEventListener('dragstart', onDragstart);
        popupPictures.addEventListener('dragover', onDragOver, false);
        popupPictures.addEventListener('dragend', onDragEnd, false);
      }
    }
  };
})();
