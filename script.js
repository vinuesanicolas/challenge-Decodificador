document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const encryptButton = document.getElementById('encrypt');
    const decryptButton = document.getElementById('decrypt');
    const resultPanel = document.querySelector('.result-panel');

    const encryptionRules = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    function encrypt(text) {
        return text.replace(/[aeiou]/g, letter => encryptionRules[letter]);
    }

    function decrypt(text) {
        let decryptedText = text;
        for (let [key, value] of Object.entries(encryptionRules)) {
            decryptedText = decryptedText.replace(new RegExp(value, 'g'), key);
        }
        return decryptedText;
    }

    function updateResultPanel(message) {
        resultPanel.innerHTML = `
            <h2>Mensaje ${message.action}</h2>
            <p>${message.text}</p>
            <button id="copyButton">Copiar</button>
        `;

        const copyButton = document.getElementById('copyButton');
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(message.text)
                .then(() => alert('Texto copiado al portapapeles'))
                .catch(err => console.error('Error al copiar el texto: ', err));
        });
    }

    function processText(action) {
        const text = inputText.value.toLowerCase();
        if (!/^[a-z\s]*$/.test(text)) {
            alert('Por favor, ingrese solo letras minúsculas sin acentos.');
            return;
        }

        const processedText = action === 'encrypt' ? encrypt(text) : decrypt(text);
        updateResultPanel({
            action: action === 'encrypt' ? 'encriptado' : 'desencriptado',
            text: processedText
        });
    }

    encryptButton.addEventListener('click', () => processText('encrypt'));
    decryptButton.addEventListener('click', () => processText('decrypt'));

    inputText.addEventListener('focus', function() {
        if (this.value === 'Ingrese el texto aqui') {
            this.value = '';
        }
    });

    inputText.addEventListener('blur', function() {
        if (this.value === '') {
            this.value = 'Ingrese el texto aqui';
        }
    });
});