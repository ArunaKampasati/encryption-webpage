// script.js

// Playfair Cipher Implementation
function createPlayfairMatrix(key) {
    key = key.replace(/j/g, "i").toLowerCase();
    const alphabet = "abcdefghiklmnopqrstuvwxyz";
    const uniqueKey = Array.from(new Set(key + alphabet));
    return Array.from({ length: 5 }, (_, i) => uniqueKey.slice(i * 5, i * 5 + 5));
}

function findPosition(matrix, char) {
    for (let row = 0; row < 5; row++) {
        const col = matrix[row].indexOf(char);
        if (col !== -1) return [row, col];
    }
}

function processPlayfair(text, key, encrypt = true) {
    text = text.replace(/j/g, "i").toLowerCase().replace(/[^a-z]/g, "");
    if (text.length % 2 !== 0) text += "x";

    const matrix = createPlayfairMatrix(key);
    let result = "";

    for (let i = 0; i < text.length; i += 2) {
        const [row1, col1] = findPosition(matrix, text[i]);
        const [row2, col2] = findPosition(matrix, text[i + 1]);

        if (row1 === row2) {
            result += matrix[row1][(col1 + (encrypt ? 1 : 4)) % 5];
            result += matrix[row2][(col2 + (encrypt ? 1 : 4)) % 5];
        } else if (col1 === col2) {
            result += matrix[(row1 + (encrypt ? 1 : 4)) % 5][col1];
            result += matrix[(row2 + (encrypt ? 1 : 4)) % 5][col2];
        } else {
            result += matrix[row1][col2];
            result += matrix[row2][col1];
        }
    }
    return result;
}

function encryptPlayfair() {
    const text = document.getElementById("playfair-input").value;
    const key = document.getElementById("playfair-key").value;
    document.getElementById("playfair-result").textContent = processPlayfair(text, key, true);
}

function decryptPlayfair() {
    const text = document.getElementById("playfair-input").value;
    const key = document.getElementById("playfair-key").value;
    document.getElementById("playfair-result").textContent = processPlayfair(text, key, false);
}

// Vigenère Cipher Implementation
function processVigenere(text, key, encrypt = true) {
    text = text.replace(/[^a-z]/gi, "").toUpperCase();
    key = key.replace(/[^a-z]/gi, "").toUpperCase();

    let result = "";
    for (let i = 0, j = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) - 65;
        const shift = (key.charCodeAt(j % key.length) - 65) * (encrypt ? 1 : -1);
        result += String.fromCharCode(((charCode + shift + 26) % 26) + 65);
        j++;
    }
    return result;
}

function encryptVigenere() {
    const text = document.getElementById("vigenere-input").value;
    const key = document.getElementById("vigenere-key").value;
    document.getElementById("vigenere-result").textContent = processVigenere(text, key, true);
}

function decryptVigenere() {
    const text = document.getElementById("vigenere-input").value;
    const key = document.getElementById("vigenere-key").value;
    document.getElementById("vigenere-result").textContent = processVigenere(text, key, false);
}
