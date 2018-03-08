'use strict';

(function () {
  var dragUploadedImages = function () {
    var pictures = document.querySelector('.form__uploaded-container');
    var dragEl;
    var onDragstart = function (evt) {
      dragEl = evt.target;
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', dragEl.textContent);
      setTimeout(function () {
        dragEl.style.opacity = '0.4';
      }, 0);
    };

    var onDragOver = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';
      var target = evt.target;
      if (target && target !== dragEl && target.tagName.toLowerCase() === 'img') {
        pictures.insertBefore(dragEl, pictures.children[0] !== target && target.nextSibling || target);
      } else if (dragEl === pictures.children[0]) {
        try {
          target.insertAdjacentElement('beforeend', dragEl);
        } catch (error) {
          return;
        }
      }
    };

    var onDragEnd = function (evt) {
      evt.preventDefault();
      dragEl.style.opacity = '1';
    };

    if (pictures) {
      pictures.addEventListener('dragstart', onDragstart);
      pictures.addEventListener('dragover', onDragOver, false);
      pictures.addEventListener('dragend', onDragEnd, false);
    }
  };
  window.dragNDrop = {
    dragUploadedImages: dragUploadedImages
  };
})();
