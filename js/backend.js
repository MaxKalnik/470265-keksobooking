'use strict';

(function () {
  var URL = {
    get: 'https://js.dump.academy/keksobooking/data',
    post: 'https://js.dump.academy/keksobooking'
  };

  var createXhr = function (formData, onLoadFunc, onErrorFunc) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

    xhr.responseTime = 1000;
    if (formData) {
      xhr.open('POST', URL.post);
      xhr.send(formData);
    } else {
      xhr.open('GET', URL.get);
      xhr.send();
    }
  };

  window.backend = {
    load: function (onLoad, onError) {
      createXhr(false, onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      createXhr(data, onLoad, onError);
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
    }
  };


})();
