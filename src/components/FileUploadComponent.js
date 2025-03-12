import {fileUploadTemplate} from "../templates/fileUploadTemplate.js";
import {uploadFile} from "../utils/api.js";

export class FileUploadComponent extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({mode: 'open'});

        shadow.innerHTML = fileUploadTemplate;

        // Элементы
        this.elements = {
            uploadZone: shadow.getElementById("upload-zone"),
            fileInput: shadow.getElementById("file-input"),
            nameInput: shadow.getElementById("name-input"),
            uploadButton: shadow.getElementById("upload-button"),
            progressBar: shadow.getElementById("progress-bar"),
            message: shadow.getElementById("message"),
            loading: shadow.getElementById("loading"),
            closeButton: shadow.querySelector(".close-button"),
            clearInputButton: shadow.querySelector(".clear-input"),
            progressContainer: shadow.getElementById("progress-container"),
            inputContainer: shadow.querySelector(".input-container"),
            sizeText: shadow.getElementById("uploadForm_Size"),
            statusText: shadow.getElementById("uploadForm_Status"),
            modal: shadow.getElementById("upload-modal"),
            modalCloseButton: shadow.getElementById("modal-close-button"),
        };

        this.elements.uploadButton.disabled = true;

        // Обработчики событий
        this.elements.nameInput.addEventListener("change", () => this.validateForm());
        this.elements.fileInput.addEventListener("change", () =>
            this.handleFileSelect(this.elements.fileInput.files[0])
        );
        this.elements.uploadButton.addEventListener("click", () => this.handleUpload());
        this.elements.closeButton.addEventListener("click", () =>
            this.closeUploadWindow()
        );
        this.elements.clearInputButton.addEventListener("click", () => this.clearInput());
        this.setupDragAndDrop();
    }

    // Обновление прогресса
    updateProgress(loaded, total) {
        if (typeof loaded !== "number" || typeof total !== "number" || total <= 0) {
            console.error("Некорректные значения loaded или total");
            return;
        }

        const percentComplete = Math.round((loaded / total) * 100);
        this.elements.progressBar.value = percentComplete;
        this.elements.statusText.textContent = `${percentComplete}% `;
    }

    // Закрытие окна
    closeUploadWindow() {
        this.remove();
    }

    // Очистка инпута
    clearInput() {
        this.elements.nameInput.value = "";
        this.validateForm();
    }

    // Настройка Drag and Drop
    setupDragAndDrop() {
        const preventDefault = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        this.elements.uploadZone.addEventListener("dragenter", preventDefault);
        this.elements.uploadZone.addEventListener("dragover", preventDefault);
        this.elements.uploadZone.addEventListener("dragleave", preventDefault);

        this.elements.uploadZone.addEventListener("drop", (e) => {
            preventDefault(e);
            const file = e.dataTransfer.files[0];
            this.handleFileSelect(file);
        });

        this.elements.uploadZone.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.stopPropagation();

            const file = e.dataTransfer.items[0].getAsFile();
            if (file && !this.validateFile(file)) {
                this.elements.uploadZone.classList.add("invalid");
                this.elements.message.textContent = "Недопустимый тип файла.";
            } else {
                this.elements.uploadZone.classList.remove("invalid");
                this.elements.message.textContent = "";
            }
        });
    }

    // Валидация формы
    validateForm() {
        const isNameValid = this.elements.nameInput.value.trim() !== "";
        const isFileValid = this.file !== undefined;

        if (isNameValid && isFileValid) {
            this.elements.uploadZone.insertAdjacentElement(
                "afterend",
                this.elements.inputContainer
            );
            this.elements.progressContainer.classList.remove("hidden");
            this.elements.progressContainer.classList.add("visible");
        }

        this.elements.uploadButton.disabled = !(isNameValid && isFileValid);
    }

    // Проверка файла
    validateFile(file) {
        const allowedTypes = ["text/plain", "application/json", "text/csv"];
        if (!allowedTypes.includes(file.type)) {
            this.elements.message.textContent =
                "Недопустимый тип файла. Разрешены только .txt, .json, .csv.";
            return false;
        }
        if (file.size > 1024) {
            this.elements.message.textContent =
                "Файл слишком большой. Максимальный размер: 1 KB.";
            return false;
        }
        return true;
    }

    // Обработка выбора файла
    handleFileSelect(file) {
        if (this.validateFile(file)) {
            this.file = file;
            this.elements.message.textContent = `Выбран файл: ${file.name}`;
            this.elements.progressContainer.classList.remove("hidden");
            this.validateForm();
        }
    }

    // Загрузка файла
    async handleUpload() {
        const file = this.file;
        const name = this.elements.nameInput.value.trim();

        if (!file || !name) {
            this.elements.message.textContent = "Пожалуйста, заполните все поля.";
            return;
        }

        this.elements.loading.classList.remove("hidden");
        this.elements.progressContainer.classList.remove("hidden");
        this.elements.uploadButton.disabled = true;

        try {
            const response = await uploadFile(
                file,
                name,
                (loaded, total) => this.updateProgress(loaded, total) // Передаем loaded и total
            );

            this.showModal(response);
            this.resetForm();
        } catch (error) {
            this.elements.message.textContent = `Ошибка: ${error.message}`;
            this.showModal(
                {
                    message: error.message,
                },
                true
            );
        } finally {
            this.elements.loading.classList.add("hidden");
        }
    }

    // Отображение модального окна
    showModal(response, isError = false) {
        const { name, filename, timestamp, message } = response;

        // Извлекаем расширение файла
        const fileExtension = filename.split(".").pop();

        // Обновляем текстовое содержимое модального окна
        this.elements.modal.querySelector("#modal-name").textContent = `Name: ${name}`;
        this.elements.modal.querySelector(
            "#modal-filename"
        ).textContent = `File Extension: .${fileExtension}`;
        this.elements.modal.querySelector(
            "#modal-timestamp"
        ).textContent = `Timestamp: ${timestamp}`;
        this.elements.modal.querySelector(
            "#modal-message"
        ).textContent = `Message: ${message}`;

        if (isError) {
            this.elements.modal.querySelector("h3").textContent =
                "Ошибка в загрузке файла";
            this.elements.modal.classList.add("error");
        } else {
            this.elements.modal.querySelector("h3").textContent =
                "Файл успешно загружен";
            this.elements.modal.classList.remove("error");
        }

        // Показываем модальное окно
        this.elements.modal.classList.remove("hidden");
        this.elements.modal.classList.add("active");

        // Закрытие модального окна
        this.elements.modalCloseButton = this.elements.modal.querySelector(
            ".close-button"
        );
        this.elements.modalCloseButton.addEventListener("click", () =>
            this.closeModal()
        );
    }

    closeModal() {
        this.elements.modal.classList.remove("active");
        this.elements.modal.classList.add("hidden");
    }

    resetForm() {
        this.elements.fileInput.value = "";
        this.elements.nameInput.value = "";
        this.file = undefined;
        this.elements.progressBar.value = 0;
        this.elements.message.textContent = "";
        this.elements.uploadButton.disabled = true;
        this.elements.progressContainer.classList.add("hidden");
        this.elements.sizeText.textContent = "";
        this.elements.statusText.textContent = "";
    }
}