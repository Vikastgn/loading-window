import {fileUploadTemplate} from "../templates/fileUploadTemplate.js";
import {uploadFile} from "../utils/api.js";

export class FileUploadComponent extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = fileUploadTemplate;

        // Элементы
        this.uploadZone = shadow.getElementById('upload-zone');
        this.fileInput = shadow.getElementById('file-input');
        this.nameInput = shadow.getElementById('name-input');
        this.uploadButton = shadow.getElementById('upload-button');
        this.progressBar = shadow.getElementById('progress-bar');
        this.message = shadow.getElementById('message');
        this.loading = shadow.getElementById('loading');
        this.closeButton = shadow.querySelector('.close-button');
        this.clearInputButton = shadow.querySelector('.clear-input');
        this.progressContainer = shadow.getElementById('progress-container');
        this.inputContainer = shadow.querySelector('.input-container');
        this.sizeText = shadow.getElementById('uploadForm_Size'); // Элемент для отображения размера
        this.statusText = shadow.getElementById('uploadForm_Status');

        this.uploadButton.disabled = true;

        // Обработчики событий
        this.nameInput.addEventListener('input', () => this.validateForm());
        this.fileInput.addEventListener('change', () => this.handleFileSelect(this.fileInput.files[0]));
        this.uploadButton.addEventListener('click', () => this.handleUpload());
        this.closeButton.addEventListener('click', () => this.closeUploadWindow());
        this.clearInputButton.addEventListener('click', () => this.clearInput());
        this.setupDragAndDrop();
    }

    updateProgress(percentComplete) {
        if (percentComplete === null) {
            this.statusText.textContent = 'Загружается...';
            this.sizeText.textContent = '';
            this.progressBar.value = 0;
            return;
        }

        this.progressBar.value = percentComplete;
        this.statusText.textContent = `Загружено ${Math.round(percentComplete)}% | `;
    }

    // Закрытие окна
    closeUploadWindow() {
        this.remove();
    }

    // Очистка инпута
    clearInput() {
        this.nameInput.value = '';
        this.validateForm();
    }

    // Настройка Drag and Drop
    setupDragAndDrop() {
        const preventDefault = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        this.uploadZone.addEventListener('dragenter', preventDefault);
        this.uploadZone.addEventListener('dragover', preventDefault);
        this.uploadZone.addEventListener('dragleave', preventDefault);

        this.uploadZone.addEventListener('drop', (e) => {
            preventDefault(e);
            const file = e.dataTransfer.files[0];
            this.handleFileSelect(file);
        });
    }

    // Валидация формы
    validateForm() {
        const isNameValid = this.nameInput.value.trim() !== '';
        const isFileValid = this.file !== undefined;

        if (isNameValid && isFileValid) {
            this.uploadZone.insertAdjacentElement('afterend', this.inputContainer);
            this.progressContainer.classList.remove('hidden');
            this.progressContainer.classList.add('visible');
        }

        this.uploadButton.disabled = !(isNameValid && isFileValid);
    }

    // Проверка файла
    validateFile(file) {
        const allowedTypes = ['text/plain', 'application/json', 'text/csv'];
        if (!allowedTypes.includes(file.type)) {
            this.message.textContent = 'Недопустимый тип файла. Разрешены только .txt, .json, .csv.';
            return false;
        }
        if (file.size > 1024) {
            this.message.textContent = 'Файл слишком большой. Максимальный размер: 1 KB.';
            return false;
        }
        return true;
    }

    // Обработка выбора файла
    handleFileSelect(file) {
        if (this.validateFile(file)) {
            this.file = file;
            this.message.textContent = `Выбран файл: ${file.name}`;
            this.validateForm(); // Проверяем условия после выбора файла
        }
    }

    // Загрузка файла
    async handleUpload() {
        const file = this.file;
        const name = this.nameInput.value.trim();

        if (!file || !name) {
            this.message.textContent = 'Пожалуйста, заполните все поля.';
            return;
        }

        this.loading.classList.remove('hidden');
        this.progressContainer.classList.remove('hidden');
        this.uploadButton.disabled = true;

        try {
            await uploadFile(
                file,
                name,
                (percentComplete) => {
                    this.updateProgress(percentComplete); // Обновляем прогресс
                    if (percentComplete === 100) {
                        this.uploadButton.disabled = false; // Активируем кнопку после завершения
                    }
                }
            );

            this.message.textContent = 'Файл успешно загружен!';
            this.resetForm();
        } catch (error) {
            this.message.textContent = `Ошибка: ${error.message}`;
        } finally {
            this.loading.classList.add('hidden');
        }
    }

    // Сброс формы
    resetForm() {
        this.fileInput.value = '';
        this.nameInput.value = '';
        this.file = undefined;
        this.progressBar.value = 0;
        this.message.textContent = '';
        this.uploadButton.disabled = true;
        this.progressContainer.classList.add('hidden');
        this.sizeText.textContent = '';
        this.statusText.textContent = '';
    }
}