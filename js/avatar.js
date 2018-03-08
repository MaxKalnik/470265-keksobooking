'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
  var PREVIEW_DEFAULT_SRC = 'img/muffin.png';
  var IMAGE_WIDTH = 65;
  var IMAGE_HEIGHT = 65;

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');
  var photoFileChooser = document.querySelector('#images');
  var photoContainer = document.querySelector('.form__photo-container');

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.map(function (imgFormat) {
      return fileName.endsWith(imgFormat);
    });
    if (matches.length) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var createImg = function (imgSrc) {
    var img = document.createElement('img');
    img.src = imgSrc;
    img.width = IMAGE_WIDTH;
    img.height = IMAGE_HEIGHT;
    img.draggable = true;
    img.style = 'margin: 2px;';
    img.style.display = 'inline-block';
    return img;
  };

  var imgContainer = document.createElement('div');
  imgContainer.classList.add('form__uploaded-container');

  photoFileChooser.addEventListener('change', function () {
    var photos = photoFileChooser.files;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      var fileName = photos[i].name.toLowerCase();
      var matches = FILE_TYPES.map(function (imgFormat) {
        return fileName.endsWith(imgFormat);
      });

      if (matches.length) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          var newImg = createImg(reader.result);
          fragment.appendChild(newImg);
          imgContainer.appendChild(fragment);
        });
        reader.readAsDataURL(photos[i]);
      }
    }
    photoContainer.appendChild(imgContainer);
    window.dragNDrop.dragUploadedImages();
  });

  window.avatar = {
    clearPreview: function () {
      preview.src = PREVIEW_DEFAULT_SRC;
    },
    clearPhotos: function () {
      var imgs = document.querySelectorAll('.form__uploaded-container img');
      [].forEach.call(imgs, function (elem) {
        elem.remove();
      });
    }
  };
})();
