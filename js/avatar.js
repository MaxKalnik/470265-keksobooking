'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];
  var PREVIEW_DEFAULT_SRC = 'img/muffin.png';

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');

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

  window.avatar = {
    clearPreview: function () {
      preview.src = PREVIEW_DEFAULT_SRC;
    }
  };
})();
