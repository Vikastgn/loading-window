(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();const l=`
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
`,d="https://file-upload-server-mc26.onrender.com/api/v1/upload";function p(a,e,t){return new Promise((i,o)=>{const s=new FormData;s.append("file",a),s.append("name",e);const n=new XMLHttpRequest;n.open("POST",d,!0),n.upload.onprogress=r=>{r.lengthComputable&&r.total>0?t(r.loaded,r.total):(console.warn("Невозможно вычислить прогресс: размер файла неизвестен"),t(0,1))},n.onload=()=>{if(n.status===200)i(JSON.parse(n.responseText));else{const r=JSON.parse(n.responseText);o(new Error(r.error||"Ошибка при загрузке файла"))}},n.onerror=()=>{o(new Error("Ошибка сети"))},n.send(s)})}class c extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=l,this.uploadZone=e.getElementById("upload-zone"),this.fileInput=e.getElementById("file-input"),this.nameInput=e.getElementById("name-input"),this.uploadButton=e.getElementById("upload-button"),this.progressBar=e.getElementById("progress-bar"),this.message=e.getElementById("message"),this.loading=e.getElementById("loading"),this.closeButton=e.querySelector(".close-button"),this.clearInputButton=e.querySelector(".clear-input"),this.progressContainer=e.getElementById("progress-container"),this.inputContainer=e.querySelector(".input-container"),this.sizeText=e.getElementById("uploadForm_Size"),this.statusText=e.getElementById("uploadForm_Status"),this.modal=e.getElementById("upload-modal"),this.modalCloseButton=e.getElementById("modal-close-button"),this.uploadButton.disabled=!0,this.nameInput.addEventListener("change",()=>this.validateForm()),this.fileInput.addEventListener("change",()=>this.handleFileSelect(this.fileInput.files[0])),this.uploadButton.addEventListener("click",()=>this.handleUpload()),this.closeButton.addEventListener("click",()=>this.closeUploadWindow()),this.clearInputButton.addEventListener("click",()=>this.clearInput()),this.setupDragAndDrop()}updateProgress(e,t){if(typeof e!="number"||typeof t!="number"||t<=0){console.error("Некорректные значения loaded или total");return}const i=Math.round(e/t*100);this.progressBar.value=i,this.statusText.textContent=`${i}% `}closeUploadWindow(){this.remove()}clearInput(){this.nameInput.value="",this.validateForm()}setupDragAndDrop(){const e=t=>{t.preventDefault(),t.stopPropagation()};this.uploadZone.addEventListener("dragenter",e),this.uploadZone.addEventListener("dragover",e),this.uploadZone.addEventListener("dragleave",e),this.uploadZone.addEventListener("drop",t=>{e(t);const i=t.dataTransfer.files[0];this.handleFileSelect(i)}),this.uploadZone.addEventListener("dragover",t=>{t.preventDefault(),t.stopPropagation();const i=t.dataTransfer.items[0].getAsFile();i&&!this.validateFile(i)?(this.uploadZone.classList.add("invalid"),this.message.textContent="Недопустимый тип файла."):(this.uploadZone.classList.remove("invalid"),this.message.textContent="")})}validateForm(){const e=this.nameInput.value.trim()!=="",t=this.file!==void 0;e&&t&&(this.uploadZone.insertAdjacentElement("afterend",this.inputContainer),this.progressContainer.classList.remove("hidden"),this.progressContainer.classList.add("visible")),this.uploadButton.disabled=!(e&&t)}validateFile(e){return["text/plain","application/json","text/csv"].includes(e.type)?e.size>1024?(this.message.textContent="Файл слишком большой. Максимальный размер: 1 KB.",!1):!0:(this.message.textContent="Недопустимый тип файла. Разрешены только .txt, .json, .csv.",!1)}handleFileSelect(e){this.validateFile(e)&&(this.file=e,this.message.textContent=`Выбран файл: ${e.name}`,this.progressContainer.classList.remove("hidden"),this.validateForm())}async handleUpload(){const e=this.file,t=this.nameInput.value.trim();if(!e||!t){this.message.textContent="Пожалуйста, заполните все поля.";return}this.loading.classList.remove("hidden"),this.progressContainer.classList.remove("hidden"),this.uploadButton.disabled=!0;try{const i=await p(e,t,(o,s)=>this.updateProgress(o,s));this.showModal(i),this.resetForm()}catch(i){this.message.textContent=`Ошибка: ${i.message}`,this.showModal({message:i.message},!0)}finally{this.loading.classList.add("hidden")}}showModal(e,t=!1){const{name:i,filename:o,timestamp:s,message:n}=e,r=o.split(".").pop();this.modal.querySelector("#modal-name").textContent=`Name: ${i}`,this.modal.querySelector("#modal-filename").textContent=`File Extension: .${r}`,this.modal.querySelector("#modal-timestamp").textContent=`Timestamp: ${s}`,this.modal.querySelector("#modal-message").textContent=`Message: ${n}`,t?(this.modal.querySelector("h3").textContent="Ошибка в загрузке файла",this.modal.classList.add("error")):(this.modal.querySelector("h3").textContent="Файл успешно загружен",this.modal.classList.remove("error")),this.modal.classList.remove("hidden"),this.modal.classList.add("active"),this.modalCloseButton=this.modal.querySelector(".close-button"),this.modalCloseButton.addEventListener("click",()=>this.closeModal())}closeModal(){this.modal.classList.remove("active"),this.modal.classList.add("hidden")}resetForm(){this.fileInput.value="",this.nameInput.value="",this.file=void 0,this.progressBar.value=0,this.message.textContent="",this.uploadButton.disabled=!0,this.progressContainer.classList.add("hidden"),this.sizeText.textContent="",this.statusText.textContent=""}}customElements.define("file-upload-component",c);
