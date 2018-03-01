'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

  var fileChooser = document.querySelector('#avatar');
  var preview = document.querySelector('.notice__preview img');
  var previewDafaultSrc = preview.src;

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.map(function (elem) {
      return fileName.endsWith(elem);
    });
    if (matches.length) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }

    window.avatar = {
      clearPreview: function () {
        preview.src = previewDafaultSrc;
      }
    };
  });
})();
