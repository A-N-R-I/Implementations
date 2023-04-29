function encrypt(text) {
    const UTF16CHARCODES = 2**16;

    // Stores the encrypted text and the key to decrypt
    let encryption = {
        encryptedText: '',
        keys: []
    };

    [...text].forEach(el => {
        let key = Math.floor(Math.random() * UTF16CHARCODES);

        encryption.encryptedText = encryption.encryptedText.concat(String.fromCharCode(el.charCodeAt(0) ^ key));
        encryption.keys.push(key);
    })

    return encryption;
}


function decrypt(encryption) {
    let decryptedText = '';

    // Loop through the encrypted text and decrypt each character by applying the respective key
    for (let i = 0; i < encryption.encryptedText.length; i++) 
        decryptedText = decryptedText.concat(String.fromCharCode(encryption.encryptedText.charCodeAt(i) ^ encryption.keys[i]));
    
    return decryptedText;
}



let str = 'The quick brown fox jumps over the lazy dog. The lazy dog watched the quick brown fox.';

let encryption = encrypt(str);
let decryptedText = decrypt(encryption);

console.log(`Encrypted text: \n${encryption.encryptedText}`);
console.log(`\nKeys: \n${encryption.keys}`);
console.log(`\nDecrypted text: \n${decryptedText}`);
