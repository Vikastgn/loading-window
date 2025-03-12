
const API_URL = 'https://file-upload-server-mc26.onrender.com/api/v1/upload';

export function uploadFile(file, name, onProgress) {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', API_URL, true);

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && e.total > 0) {
                onProgress(e.loaded, e.total); // Передаем loaded и total
            } else {
                console.warn('Невозможно вычислить прогресс: размер файла неизвестен');
                onProgress(0, 1); // Передаем значения по умолчанию
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                const error = JSON.parse(xhr.responseText);
                reject(new Error(error.error || 'Ошибка при загрузке файла'));
            }
        };

        xhr.onerror = () => {
            reject(new Error('Ошибка сети'));
        };

        xhr.send(formData);
    });
}