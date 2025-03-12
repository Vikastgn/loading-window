(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const l=`
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
`,d="https://file-upload-server-mc26.onrender.com/api/v1/upload";function p(a,e,t){return new Promise((n,s)=>{const o=new FormData;o.append("file",a),o.append("name",e);const i=new XMLHttpRequest;i.open("POST",d,!0),i.upload.onprogress=r=>{r.lengthComputable&&r.total>0?t(r.loaded,r.total):(console.warn("Невозможно вычислить прогресс: размер файла неизвестен"),t(0,1))},i.onload=()=>{if(i.status===200)n(JSON.parse(i.responseText));else{const r=JSON.parse(i.responseText);s(new Error(r.error||"Ошибка при загрузке файла"))}},i.onerror=()=>{s(new Error("Ошибка сети"))},i.send(o)})}class c extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=l,this.elements={uploadZone:e.getElementById("upload-zone"),fileInput:e.getElementById("file-input"),nameInput:e.getElementById("name-input"),uploadButton:e.getElementById("upload-button"),progressBar:e.getElementById("progress-bar"),message:e.getElementById("message"),loading:e.getElementById("loading"),closeButton:e.querySelector(".close-button"),clearInputButton:e.querySelector(".clear-input"),progressContainer:e.getElementById("progress-container"),inputContainer:e.querySelector(".input-container"),sizeText:e.getElementById("uploadForm_Size"),statusText:e.getElementById("uploadForm_Status"),modal:e.getElementById("upload-modal"),modalCloseButton:e.getElementById("modal-close-button")},this.elements.uploadButton.disabled=!0,this.elements.nameInput.addEventListener("change",()=>this.validateForm()),this.elements.fileInput.addEventListener("change",()=>this.handleFileSelect(this.elements.fileInput.files[0])),this.elements.uploadButton.addEventListener("click",()=>this.handleUpload()),this.elements.closeButton.addEventListener("click",()=>this.closeUploadWindow()),this.elements.clearInputButton.addEventListener("click",()=>this.clearInput()),this.setupDragAndDrop()}updateProgress(e,t){if(typeof e!="number"||typeof t!="number"||t<=0){console.error("Некорректные значения loaded или total");return}const n=Math.round(e/t*100);this.elements.progressBar.value=n,this.elements.statusText.textContent=`${n}% `}closeUploadWindow(){this.remove()}clearInput(){this.elements.nameInput.value="",this.validateForm()}setupDragAndDrop(){const e=t=>{t.preventDefault(),t.stopPropagation()};this.elements.uploadZone.addEventListener("dragenter",e),this.elements.uploadZone.addEventListener("dragover",e),this.elements.uploadZone.addEventListener("dragleave",e),this.elements.uploadZone.addEventListener("drop",t=>{e(t);const n=t.dataTransfer.files[0];this.handleFileSelect(n)}),this.elements.uploadZone.addEventListener("dragover",t=>{t.preventDefault(),t.stopPropagation();const n=t.dataTransfer.items[0].getAsFile();n&&!this.validateFile(n)?(this.elements.uploadZone.classList.add("invalid"),this.elements.message.textContent="Недопустимый тип файла."):(this.elements.uploadZone.classList.remove("invalid"),this.elements.message.textContent="")})}validateForm(){const e=this.elements.nameInput.value.trim()!=="",t=this.file!==void 0;e&&t&&(this.elements.uploadZone.insertAdjacentElement("afterend",this.elements.inputContainer),this.elements.progressContainer.classList.remove("hidden"),this.elements.progressContainer.classList.add("visible")),this.elements.uploadButton.disabled=!(e&&t)}validateFile(e){return["text/plain","application/json","text/csv"].includes(e.type)?e.size>1024?(this.elements.message.textContent="Файл слишком большой. Максимальный размер: 1 KB.",!1):!0:(this.elements.message.textContent="Недопустимый тип файла. Разрешены только .txt, .json, .csv.",!1)}handleFileSelect(e){this.validateFile(e)&&(this.file=e,this.elements.message.textContent=`Выбран файл: ${e.name}`,this.elements.progressContainer.classList.remove("hidden"),this.validateForm())}async handleUpload(){const e=this.file,t=this.elements.nameInput.value.trim();if(!e||!t){this.elements.message.textContent="Пожалуйста, заполните все поля.";return}this.elements.loading.classList.remove("hidden"),this.elements.progressContainer.classList.remove("hidden"),this.elements.uploadButton.disabled=!0;try{const n=await p(e,t,(s,o)=>this.updateProgress(s,o));this.showModal(n),this.resetForm()}catch(n){this.elements.message.textContent=`Ошибка: ${n.message}`,this.showModal({message:n.message},!0)}finally{this.elements.loading.classList.add("hidden")}}showModal(e,t=!1){const{name:n,filename:s,timestamp:o,message:i}=e,r=s.split(".").pop();this.elements.modal.querySelector("#modal-name").textContent=`Name: ${n}`,this.elements.modal.querySelector("#modal-filename").textContent=`File Extension: .${r}`,this.elements.modal.querySelector("#modal-timestamp").textContent=`Timestamp: ${o}`,this.elements.modal.querySelector("#modal-message").textContent=`Message: ${i}`,t?(this.elements.modal.querySelector("h3").textContent="Ошибка в загрузке файла",this.elements.modal.classList.add("error")):(this.elements.modal.querySelector("h3").textContent="Файл успешно загружен",this.elements.modal.classList.remove("error")),this.elements.modal.classList.remove("hidden"),this.elements.modal.classList.add("active"),this.elements.modalCloseButton=this.elements.modal.querySelector(".close-button"),this.elements.modalCloseButton.addEventListener("click",()=>this.closeModal())}closeModal(){this.elements.modal.classList.remove("active"),this.elements.modal.classList.add("hidden")}resetForm(){this.elements.fileInput.value="",this.elements.nameInput.value="",this.file=void 0,this.elements.progressBar.value=0,this.elements.message.textContent="",this.elements.uploadButton.disabled=!0,this.elements.progressContainer.classList.add("hidden"),this.elements.sizeText.textContent="",this.elements.statusText.textContent=""}}customElements.define("file-upload-component",c);
