'use strict';

(function () {
  var URL = {
    get: 'https://js.dump.academy/keksobooking/data',
    post: 'https://js.dump.academy/keksobooking'
  };

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.responseTime = 1000;
      xhr.open('GET', URL.get);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 1000;
      xhr.open('POST', URL.post);
      xhr.send(data);
    },
    onError: function (errMessage) {
      var node = document.createElement('div');
      node.style = 'position: fixed; transition: .35s; top: 10px; background: white; right: 10px; margin: 0; padding: 5px; color: red; font-size: 20px; font-style: italic; border-radius: 4px;';

      node.textContent = errMessage;
      document.body.appendChild(node);
      var removeNode = function () {
        node.style.opacity = '0';
        setTimeout(function () {
          document.body.removeChild(node);
        }, 400);
      };
      setTimeout(removeNode, 1500);
    }
  };


})();
