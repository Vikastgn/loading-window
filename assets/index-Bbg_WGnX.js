(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();const d=`
  <style>
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
      position: relative;
      width: 277px;
      margin: 10px 0;
      display: none; 
    }

    .progress-container.visible {
       position: absolute;
       bottom: -5px;
        left: 50%; 
        transform: translateX(-50%); 
        display: flex;
        width: 30%; 
        align-items: center; 
        padding: 5px 10px; 
        box-sizing: border-box; 
}
   
    .progress-container progress {
    flex-grow: 1;
    height: 10px;
    border-radius: 5px;
    background: rgb(241, 241, 241);
}


   .progress-container progress::-webkit-progress-bar {
    background: rgb(33,93,173);
    border-radius: 5px;
}

   .progress-container progress::-webkit-progress-value {
    background: rgb(95, 92, 240);
    border-radius: 5px;
}

    .progress-container.hidden {
      opacity: 0;
      pointer-events: none;
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

    .hidden {
      display: none;
    }
    
  </style>

  <div class="upload-container">
    <img class="close-button" src="../../public/cross%20button.svg" alt="Закрыть окно"/>
    <h1 class="title">Загрузочное окно</h1>
    <h2 class="upload-subtitle">Перенесите ваш файл в область ниже</h2>

    <!-- Инпут для названия файла -->
    <div class="input-container">
      <input type="text" id="name-input" placeholder="Название файла" required>
      <img class="clear-input" src="../../public/+.svg" alt="Очистить поле" onclick="clearInput()"/>
          <div class="progress-container hidden" id="progress-container">
      <progress id="progress-bar" value="0" max="100"></progress>
       <span id="uploadForm_Status"></span>
       <span id="uploadForm_Size"></span>
    </div>
    </div>

    <!-- Область для переноса файла -->
    <div id="upload-zone" class="upload-zone">
      <label for="file-input" class="upload-zone_dragover">
        <img src="../../public/docs%20pic.svg" alt="Загрузочное окно" id="preview" height="120px" />
        <p>Перенесите ваш файл в область ниже</p>
      </label>
      <input class="hidden" id="file-input" type="file" accept=".txt,.json,.csv" aria-describedby="hint">
    </div>
   
    <button id="upload-button" class="button">Загрузить</button>

    <div id="message"></div>
    <div id="loading"></div>
  </div>
`,p="https://file-upload-server-mc26.onrender.com/api/v1/upload";function u(a,e,i){return new Promise((o,t)=>{const n=new FormData;n.append("file",a),n.append("name",e);const s=new XMLHttpRequest;s.open("POST",p,!0),s.upload.onprogress=r=>{if(r.lengthComputable&&r.total>0){const l=r.loaded/r.total*100;i(l)}else console.warn("Невозможно вычислить прогресс: размер файла неизвестен"),i(null)},s.onload=()=>{if(s.status===200)o(JSON.parse(s.responseText));else{const r=JSON.parse(s.responseText);t(new Error(r.error||"Ошибка при загрузке файла"))}},s.onerror=()=>{t(new Error("Ошибка сети"))},s.send(n)})}class c extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=d,this.uploadZone=e.getElementById("upload-zone"),this.fileInput=e.getElementById("file-input"),this.nameInput=e.getElementById("name-input"),this.uploadButton=e.getElementById("upload-button"),this.progressBar=e.getElementById("progress-bar"),this.message=e.getElementById("message"),this.loading=e.getElementById("loading"),this.closeButton=e.querySelector(".close-button"),this.clearInputButton=e.querySelector(".clear-input"),this.progressContainer=e.getElementById("progress-container"),this.inputContainer=e.querySelector(".input-container"),this.sizeText=e.getElementById("uploadForm_Size"),this.statusText=e.getElementById("uploadForm_Status"),this.uploadButton.disabled=!0,this.nameInput.addEventListener("input",()=>this.validateForm()),this.fileInput.addEventListener("change",()=>this.handleFileSelect(this.fileInput.files[0])),this.uploadButton.addEventListener("click",()=>this.handleUpload()),this.closeButton.addEventListener("click",()=>this.closeUploadWindow()),this.clearInputButton.addEventListener("click",()=>this.clearInput()),this.setupDragAndDrop()}updateProgress(e){if(e===null){this.statusText.textContent="Загружается...",this.sizeText.textContent="",this.progressBar.value=0;return}this.progressBar.value=e,this.statusText.textContent=`Загружено ${Math.round(e)}% | `}closeUploadWindow(){this.remove()}clearInput(){this.nameInput.value="",this.validateForm()}setupDragAndDrop(){const e=i=>{i.preventDefault(),i.stopPropagation()};this.uploadZone.addEventListener("dragenter",e),this.uploadZone.addEventListener("dragover",e),this.uploadZone.addEventListener("dragleave",e),this.uploadZone.addEventListener("drop",i=>{e(i);const o=i.dataTransfer.files[0];this.handleFileSelect(o)})}validateForm(){const e=this.nameInput.value.trim()!=="",i=this.file!==void 0;e&&i&&(this.uploadZone.insertAdjacentElement("afterend",this.inputContainer),this.progressContainer.classList.remove("hidden"),this.progressContainer.classList.add("visible")),this.uploadButton.disabled=!(e&&i)}validateFile(e){return["text/plain","application/json","text/csv"].includes(e.type)?e.size>1024?(this.message.textContent="Файл слишком большой. Максимальный размер: 1 KB.",!1):!0:(this.message.textContent="Недопустимый тип файла. Разрешены только .txt, .json, .csv.",!1)}handleFileSelect(e){this.validateFile(e)&&(this.file=e,this.message.textContent=`Выбран файл: ${e.name}`,this.validateForm())}async handleUpload(){const e=this.file,i=this.nameInput.value.trim();if(!e||!i){this.message.textContent="Пожалуйста, заполните все поля.";return}this.loading.classList.remove("hidden"),this.progressContainer.classList.remove("hidden"),this.uploadButton.disabled=!0;try{await u(e,i,o=>{this.updateProgress(o),o===100&&(this.uploadButton.disabled=!1)}),this.message.textContent="Файл успешно загружен!",this.resetForm()}catch(o){this.message.textContent=`Ошибка: ${o.message}`}finally{this.loading.classList.add("hidden")}}resetForm(){this.fileInput.value="",this.nameInput.value="",this.file=void 0,this.progressBar.value=0,this.message.textContent="",this.uploadButton.disabled=!0,this.progressContainer.classList.add("hidden"),this.sizeText.textContent="",this.statusText.textContent=""}}customElements.define("file-upload-component",c);
