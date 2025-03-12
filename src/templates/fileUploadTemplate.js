export const fileUploadTemplate = `
  <style>
   .upload-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh; /* Занимает всю высоту экрана */
      background: rgba(0, 0, 0, 0.5); /* Полупрозрачный фон (опционально) */
    }
    .upload-container {
      position: relative;
      width: 302px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 12px 13px;
      border-radius: 22px;
      background: linear-gradient(180deg, rgb(95, 92, 240), rgb(221, 220, 252) 42.5%, rgb(255, 255, 255) 100%);
    }

    .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      height: 34px;
      cursor: pointer;
    }

    .title {
      font-family: Inter, sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: rgb(255, 255, 255);
      margin: 0;
      padding: 7px 0 0 0;
    }

    .upload-subtitle {
      font-size: 14px;
      font-weight: 300;
      color: rgb(255, 255, 255);
      margin: 0;
      padding: 10px 0 0 0;
    }

    .input-container {
      position: relative;
      width: 277px;
      margin: 10px 0;
    }

    input[type="text"] {
      width: 100%;
      height: 35px;
      padding: 6px 9px;
      box-sizing: border-box;
      border: 1px solid rgb(165, 165, 165);
      border-radius: 10px;
      background: rgb(241, 241, 241);
      font-size: 16px;
      color: rgb(165, 165, 165);
      outline: none;
    }

    .upload-zone {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      margin: 10px 0;
      padding: 20px;
      border: 2px dashed rgb(165, 165, 165);
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.8);
    }

    .upload-zone_dragover {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }

    #preview {
      margin-top: 10px;
      max-width: 100%;
      height: auto;
    }
    
    .progress-container {
      position: absolute;
      bottom: 5px;
      left: 40px;
      width: 100%;
      display: none;
    }

    .progress-container.visible {
      display: block;
    }

    progress {
          height: 5px;
          margin-top: 25px;
          border: none;
          background-color: rgb(255, 255, 255);;
        }

        progress::-webkit-progress-bar {
          border: none;
          background-color: rgb(255, 255, 255);
        }

        progress::-webkit-progress-value {
          background-color: rgb(95, 92, 240);;
          transition: width 0.5s ease-in-out;
        }

        progress::-moz-progress-bar {
          border: none;
          background-color: rgb(95, 92, 240);;
        }

        .form-upload__container {
          margin-top: 10px;
          font-size: 16px;
        }

    .cancel-upload {
      width: 20px;
      height: 20px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.3s;
    }

    .cancel-upload:hover {
      opacity: 1;
    }

    .clear-input {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      cursor: pointer;
      opacity: 0.7;
      transition: opacity 0.3s;
    }

    .clear-input:hover {
      opacity: 1;
    }

    .button {
      width: 277px;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 16px 0;
      border: none;
      border-radius: 30px;
      background: rgb(95, 92, 240);
      color: white;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 20px;
    }

    .button:hover {
      background-color: rgba(165, 165, 165, 0.8);
    }

    .button:disabled {
      background-color: rgb(200, 200, 200);
      cursor: not-allowed;
    }

    input[type="file"] {
      display: none;
    }

    #message {
      margin-top: 10px;
      color: rgb(165, 165, 165);
    }

    #loading {
      margin-top: 10px;
      color: rgb(0, 123, 255);
    }

    /* Стили для модального окна */
    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(180deg, rgb(95, 92, 240), rgb(143, 141, 244) 100%);
      padding: 40px;
      border-radius: 10px;
      z-index: 1000;
      display: none;
    }

    .modal.active {
      display: block;
    }

    .modal h3 {
      margin: 0 0 10px 0;
      color: rgb(255, 255, 255);
    }

    .modal p {
      margin: 5px 0;
      color: rgb(255, 255, 255);
    }

    .modal .close-button {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 34px;
      height: 34px;
      cursor: pointer;
      border-radius: 17px;
      background: rgba(204, 204, 206, 0.28);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 3px;
    }

    .modal.error {
      background: linear-gradient(180deg, rgb(240, 92, 92), rgb(143, 141, 244) 100%);
      border-radius: 22px;
    }

    .hidden {
      display: none;
    }
  </style>
<div class="upload-wrapper">
  <div class="upload-container">
    <img class="close-button" src="/loading-window/cross%20button.svg" alt="Закрыть окно"/>
    <h1 class="title">Загрузочное окно</h1>
    <h2 class="upload-subtitle">Перенесите ваш файл в область ниже</h2>

    <!-- Инпут для названия файла -->
    <div class="input-container">
      <input type="text" id="name-input" placeholder="Название файла" required>
      <img class="clear-input" src="/loading-window/+.svg" alt="Очистить поле" onclick="clearInput()"/>
      <div class="progress-container hidden" id="progress-container">
        <progress id="progress-bar" value="0" max="100"></progress>
        <span id="uploadForm_Status"></span>
        <span id="uploadForm_Size"></span>
      </div>
    </div>

    <!-- Область для переноса файла -->
    <div id="upload-zone" class="upload-zone">
      <label for="file-input" class="upload-zone_dragover">
        <img src="/loading-window/docs%20pic.svg" alt="Загрузочное окно" id="preview" height="120px" />
        <p>Перенесите ваш файл в область ниже</p>
      </label>
      <input class="hidden" id="file-input" type="file" accept=".txt,.json,.csv" aria-describedby="hint">
    </div>

    <button id="upload-button" class="button">Загрузить</button>

    <div id="message"></div>
    <div id="loading"></div>

    <!-- Модальное окно -->
    <div class="modal" id="upload-modal">
      <img class="close-button" src="/loading-window/cross%20button.svg" alt="Закрыть окно"/>
      <h3>Файл успешно загружен</h3>
      <p id="modal-name"></p>
      <p id="modal-filename"></p>
      <p id="modal-timestamp"></p>
      <p id="modal-message"></p>
    </div>
  </div>
   </div>
`;