
if (! (window.File && window.FileReader && window.FileList && window.Blob)) {
    alert('The File APIs are not fully supported in this browser.');
}

var $ = function (s) {
    return document.getElementById(s);
}

var key_input = $("key");

var key_value;

var create = $('create-file');

var encrypt_file_btn = $("btn-file-encrypt"),
    decrypt_file_btn = $("btn-file-decrypt");

var output_file_encrypt = $("output-file-encrypt"),
    output_file_decrypt = $("output-file-decrypt");


// 选择加密解密：3 表示加密，4 表示解密
var radio3 = $("radio3"),
    radio4 = $("radio4"),
    radio_file;

radio3.onclick = function () {
    radio_file = 3;
    encrypt_file_btn.disabled = false;
    decrypt_file_btn.disabled = true;

    $('download').style.display = "none";
};
radio4.onclick = function () {
    radio_file = 4;
    encrypt_file_btn.disabled = true;
    decrypt_file_btn.disabled = false;

    $('download').style.display = "none";
};


var file = "";

var file_btn = $('file').addEventListener('change', handleFileSelect, false);
function handleFileSelect(event) {
    var files = event.target.files;
    var fr = new FileReader();
    fr.addEventListener("load", function(event) {
        var textFile = event.target;
        file = textFile.result;
    });
    fr.readAsText(files[0]);
}

encrypt_file_btn.onclick = function () {
    var key = new Array(16 + 1).join('0').split('');

    key_value = key_input.value;

    for (var i = 0; i < 32; i += 2) {
        key[i/2] = parseInt((key_value.charAt(i) + key_value.charAt(i+1) ), 16);
    }

    file_encode(key, file)
};

function file_encode (key, str) {
    var bytes = [];

    for (var i in str) {
        var u = str.charCodeAt(i);
        bytes.push(u >>> 8);
        bytes.push(u % 256);
    }

    var w = key_expansion(key);

    var plain = []
    for (var j = 0; j < bytes.length; j += 16) {
        for (var i = 0; i < 16; i++) {
            plain[i] = bytes[j+i]
        }
        encrypt(plain, w);
        for (var i in plain) {
            var value = plain[i].toString(16);
            if (value.length == 1) {
                value = '0' + value;
            }
            output_file_encrypt.innerHTML += value;
        }
    }

    makeTextFile (output_file_encrypt.innerHTML);
    var link = $('download');
    link.href = makeTextFile(output_file_encrypt.innerHTML);
    link.setAttribute("download", "encrypt.txt");
    link.style.display = 'inline-block';
}

decrypt_file_btn.onclick = function () {
    var key = new Array(16 + 1).join('0').split('');

    key_value = key_input.value;

    for (var i = 0; i < 32; i += 2) {
        key[i/2] = parseInt((key_value.charAt(i) + key_value.charAt(i+1) ), 16);
    }

    file_decode(key, file)
};

function file_decode (key, str) {
    var bytes = [];
    console.log(str.length)
    for (var i = 0; i < str.length; i += 2) {
        bytes.push(parseInt((str.charAt(i) + str.charAt(i+1)), 16));
    }

    var w = key_expansion(key);

    var plain = []
    for (var j = 0; j < bytes.length; j += 16) {
        for (var i = 0; i < 16; i++) {
            plain[i] = bytes[j+i]
        }
        decrypt(plain, w);
        for (var i = 0; i < 16; i+=2) {
            output_file_decrypt.innerHTML += String.fromCharCode((plain[i]*256+plain[i+1]));
        }
    }

    makeTextFile (output_file_decrypt.innerHTML);

    var link = $('download');
    link.href = makeTextFile(output_file_decrypt.innerHTML);
    link.setAttribute("download", "decrypt.txt");
    link.style.display = 'inline-block';
}

var textFile = null;
function makeTextFile (text) {
    var data = new Blob([text], {type: 'text/plain'});

    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    return textFile;
};