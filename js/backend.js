'use strict';

(function () {
  var SUCESS_STATUS = 200;
  var XHR_RESPONSE_TIME = 1000;

  var createXhr = function (type, url, onLoadFunc, onErrorFunc, formData) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCESS_STATUS) {
        onLoadFunc(xhr.response);
      } else {
        onErrorFunc('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onErrorFunc('Произошла ошибка');
    });

    xhr.addEventListener('timeout', function () {
      onErrorFunc('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.responseTime = XHR_RESPONSE_TIME;
    xhr.open(type, url);
    xhr.send(formData ? formData : null);
  };

  window.backend = {
    load: function (type, url, onLoad, onError) {
      createXhr(type, url, onLoad, onError);
    },
    save: function (type, url, onLoad, onError, formData) {
      createXhr(type, url, onLoad, onError, formData);
    },
    onError: function (errMessage) {
      var errorContainer = document.createElement('div');
      errorContainer.style = 'position: fixed; transition: .35s; top: 10px; background: white; right: 10px; margin: 0; padding: 5px; color: red; font-size: 20px; font-style: italic; border-radius: 4px;';

      errorContainer.textContent = errMessage;
      document.body.appendChild(errorContainer);
      var removeNode = function () {
        errorContainer.style.opacity = '0';
        setTimeout(function () {
          document.body.removeChild(errorContainer);
        }, 400);
      };
      setTimeout(removeNode, 1500);
    },
    url: {
      get: 'https://js.dump.academy/keksobooking/data',
      post: 'https://js.dump.academy/keksobooking'
    }
  };


})();
