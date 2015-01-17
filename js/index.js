var $ = function (s) {
    return document.getElementById(s);
}

var key_input = $("key"),
    plain_input = $("plain");

var key_value,
    plain_value,
    cipher_value;

var output_encrypt = $("output-encrypt"),
    output_decrypt = $("output-decrypt"),
    output_step = $("output-step");

var encrypt_btn = $("btn-encrypt"),
    decrypt_btn = $("btn-decrypt");

var error = $("error");

encrypt_btn.onclick = function () {
    output_encrypt.innerHTML
        = output_decrypt.innerHTML
        = error.innerHTML
        = output_step.innerHTML
        = "";

    get_output_place("string", output_step);

    var key = new Array(16 + 1).join('0').split(''),
        plain = new Array(16 + 1).join('0').split('');

    key_value = key_input.value;
    plain_value = plain_input.value;

    if (! (/^[0-9a-f]*$/.test(plain_value)) || ! (/^[0-9a-f]*$/.test(key_value))) {
        error.innerHTML = "请输入16进制数！";
        return
    }

    for (var i = 0; i < 32; i += 2) {
        key[i/2] = parseInt((key_value.charAt(i) + key_value.charAt(i+1) ), 16);
        plain[i/2] = parseInt((plain_value.charAt(i) + (plain_value.charAt(i+1) || '0')), 16);
    }

    var w = key_expansion(key);

    encrypt(plain, w);

    for (var i in plain) {
        var value = plain[i].toString(16);
        if (value.length == 1) {
            value = '0' + value;
        }
        output_encrypt.innerHTML += value;
    }
};


decrypt_btn.onclick = function () {
    output_decrypt.innerHTML
        = error.innerHTML
        = output_step.innerHTML
        = "";

    cipher_value = output_encrypt.innerHTML;

    get_output_place("string", output_step);

    var key = new Array(16 + 1).join('0').split(''),
        cipher = new Array(16 + 1).join('0').split('');

    for (var i = 0; i < 32; i += 2) {
        key[i/2] = parseInt((key_value.charAt(i) + key_value.charAt(i+1)), 16);
        cipher[i/2] = parseInt((cipher_value.charAt(i) + cipher_value.charAt(i+1)), 16);
    }

    var w = key_expansion(key);

    decrypt(cipher, w);

    for (var i in cipher) {
        var value = cipher[i].toString(16);
        if (value.length == 1) {
            value = '0' + value;
        }
        output_decrypt.innerHTML += value;
    }
}

