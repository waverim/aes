var round_number = 10, // 10轮加密
    key_number = 4; //输入密钥的 word 个数

var s_box = [
  [0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5,
   0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76],
  [0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0,
   0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0],
  [0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC,
   0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15],
  [0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A,
   0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75],
  [0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0,
   0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84],
  [0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B,
   0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF],
  [0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85,
   0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8],
  [0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5,
   0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2],
  [0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17,
   0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73],
  [0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88,
   0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB],
  [0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C,
   0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79],
  [0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9,
   0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08],
  [0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6,
   0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A],
  [0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E,
   0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E],
  [0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94,
   0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF],
  [0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68,
   0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16]];

var inv_s_box = [
    [0x52, 0x09, 0x6A, 0xD5, 0x30, 0x36, 0xA5, 0x38,
        0xBF, 0x40, 0xA3, 0x9E, 0x81, 0xF3, 0xD7, 0xFB],
    [0x7C, 0xE3, 0x39, 0x82, 0x9B, 0x2F, 0xFF, 0x87,
        0x34, 0x8E, 0x43, 0x44, 0xC4, 0xDE, 0xE9, 0xCB],
    [0x54, 0x7B, 0x94, 0x32, 0xA6, 0xC2, 0x23, 0x3D,
        0xEE, 0x4C, 0x95, 0x0B, 0x42, 0xFA, 0xC3, 0x4E],
    [0x08, 0x2E, 0xA1, 0x66, 0x28, 0xD9, 0x24, 0xB2,
        0x76, 0x5B, 0xA2, 0x49, 0x6D, 0x8B, 0xD1, 0x25],
    [0x72, 0xF8, 0xF6, 0x64, 0x86, 0x68, 0x98, 0x16,
        0xD4, 0xA4, 0x5C, 0xCC, 0x5D, 0x65, 0xB6, 0x92],
    [0x6C, 0x70, 0x48, 0x50, 0xFD, 0xED, 0xB9, 0xDA,
        0x5E, 0x15, 0x46, 0x57, 0xA7, 0x8D, 0x9D, 0x84],
    [0x90, 0xD8, 0xAB, 0x00, 0x8C, 0xBC, 0xD3, 0x0A,
        0xF7, 0xE4, 0x58, 0x05, 0xB8, 0xB3, 0x45, 0x06],
    [0xD0, 0x2C, 0x1E, 0x8F, 0xCA, 0x3F, 0x0F, 0x02,
        0xC1, 0xAF, 0xBD, 0x03, 0x01, 0x13, 0x8A, 0x6B],
    [0x3A, 0x91, 0x11, 0x41, 0x4F, 0x67, 0xDC, 0xEA,
        0x97, 0xF2, 0xCF, 0xCE, 0xF0, 0xB4, 0xE6, 0x73],
    [0x96, 0xAC, 0x74, 0x22, 0xE7, 0xAD, 0x35, 0x85,
        0xE2, 0xF9, 0x37, 0xE8, 0x1C, 0x75, 0xDF, 0x6E],
    [0x47, 0xF1, 0x1A, 0x71, 0x1D, 0x29, 0xC5, 0x89,
        0x6F, 0xB7, 0x62, 0x0E, 0xAA, 0x18, 0xBE, 0x1B],
    [0xFC, 0x56, 0x3E, 0x4B, 0xC6, 0xD2, 0x79, 0x20,
        0x9A, 0xDB, 0xC0, 0xFE, 0x78, 0xCD, 0x5A, 0xF4],
    [0x1F, 0xDD, 0xA8, 0x33, 0x88, 0x07, 0xC7, 0x31,
        0xB1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xEC, 0x5F],
    [0x60, 0x51, 0x7F, 0xA9, 0x19, 0xB5, 0x4A, 0x0D,
        0x2D, 0xE5, 0x7A, 0x9F, 0x93, 0xC9, 0x9C, 0xEF],
    [0xA0, 0xE0, 0x3B, 0x4D, 0xAE, 0x2A, 0xF5, 0xB0,
        0xC8, 0xEB, 0xBB, 0x3C, 0x83, 0x53, 0x99, 0x61],
    [0x17, 0x2B, 0x04, 0x7E, 0xBA, 0x77, 0xD6, 0x26,
        0xE1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0C, 0x7D]];

var r_con = [0x01000000, 0x02000000, 0x04000000, 0x08000000, 0x10000000,
    0x20000000, 0x40000000, 0x80000000, 0x1b000000, 0x36000000];

/*
 * 加密
 */

/*
 * S盒变换
 * 前4位为行号，后4位为列号
 * 输入输出: 长度为16的数组
 */
function sub_bytes (m) {
    for (var i = 0; i < 16; ++i) {
        var n = m[i];
        var row = pick(n,7)*8 + pick(n,6)*4 + pick(n,5)*2 + pick(n,4),
            col = pick(n,3)*8 + pick(n,2)*4 + pick(n,1)*2 + pick(n,0);
        m[i] = s_box[row][col];
    }
}

/*
 * 行变换
 * 输入输出: 长度为16的数组
 */
function shift_rows(m) {
    // 第二行循环左移一位
    var temp = m[4];
    for (var i = 0; i < 3; ++i) {
        m[i + 4] = m[i + 5]
    }
    m[7] = temp;

    // 第三行循环左移两位
    for (var i = 0; i < 2; ++i) {
        temp = m[i + 8];
        m[i + 8] = m[i + 10];
        m[i + 10] = temp;
    }

    // 第四行循环左移三位
    temp = m[15];
    for(var i = 3; i > 0; --i) {
        m[i + 12] = m[i + 11];
    }
    m[12] = temp;
}

/*
 * 有限域上的乘法 GF(2^8)
 * 详见：http://en.wikipedia.org/wiki/Finite_field_arithmetic
 * 也可以用查表的方法替换
 */
function gf_mul (a, b) {
    var p = 0,
        hi_bit_set;

    for (var i = 0; i < 8; i++) {
        if ((b & 1) != 0) {
            p ^= a
        }
        hi_bit_set = (a & 0x80);
        a <<= 1;
        if (hi_bit_set != 0) {
            a ^= 0x1b
        }
        b >>= 1
    }

    return p
}

/*
 * 列变换
 * 输入输出: 长度为16的数组
 */
function mix_columns(m) {
    var arr = new Array(4);
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            arr[j] = m[i + j * 4]
        }

        m[i] = (gf_mul(0x02, arr[0]) ^ gf_mul(0x03, arr[1]) ^ arr[2] ^ arr[3])%256;
        m[i+4] = (arr[0] ^ gf_mul(0x02, arr[1]) ^ gf_mul(0x03, arr[2]) ^ arr[3])%256;
        m[i+8] = (arr[0] ^ arr[1] ^ gf_mul(0x02, arr[2]) ^ gf_mul(0x03, arr[3]))%256;
        m[i+12] = (gf_mul(0x03, arr[0]) ^ arr[1] ^ arr[2] ^ gf_mul(0x02, arr[3]))%256;
    }
}

/*
 * 轮密钥加变换
 * 将每一列与扩展密钥进行异或
 * 输入输出: 长度为16的数组、长度为4的key数组
 */
function add_round_key (m, k) {
    for (var i = 0; i < 4; ++i) {
        var k1 = k[i] >>> 24,
            k2 = (k[i] << 8) >>> 24,
            k3 = (k[i] << 16) >>> 24,
            k4 = (k[i] << 24) >>> 24;

        m[i] = m[i] ^ k1;
        m[i+4] = m[i+4] ^ k2;
        m[i+8] = m[i+8] ^ k3;
        m[i+12] = m[i+12] ^ k4;
    }
}

/*
 * 加密主函数
 * 输入输出: 长度为16的数组、长度为4*(round_number+1)的数组
 */
function encrypt (input, w) {
    var key = new Array(4);
    for (var i = 0; i < 4; ++i) {
        key[i] = w[i];
    }

    transpose(input);

    add_round_key(input, key);

    for (var round = 1; round < round_number; ++round) {
        sub_bytes(input);
        shift_rows(input);
        mix_columns(input);
        for (var i = 0; i < 4; ++i) {
            key[i] = w[4 * round + i];
        }
        add_round_key(input, key);
    }

    sub_bytes(input);
    shift_rows(input);
    for (var i = 0; i < 4; ++i){
        key[i] = w[4 * round_number + i];
    }
    add_round_key(input, key);

    transpose(input);
}

/*
 * 解密
 */

/*
 * 逆S盒变换
 * 输入输出: 长度为16的数组
 */
function inv_sub_bytes (m) {
    for(var i = 0; i < 16; ++i) {
        var n = m[i];
        var row = pick(n,7)*8 + pick(n,6)*4 + pick(n,5)*2 + pick(n,4),
            col = pick(n,3)*8 + pick(n,2)*4 + pick(n,1)*2 + pick(n,0);
        m[i] = inv_s_box[row][col];
    }
}

/*
 * 逆行变换
 * 以字节为单位循环右移
 * 输入输出: 长度为16的数组
 */
function inv_shift_rows(m) {
    // 第二行循环右移一位
    var temp = m[7];
    for (var i = 3; i > 0; --i) {
        m[i + 4] = m[i + 3];
    }
    m[4] = temp;

    // 第三行循环右移两位
    for (var i = 0; i < 2; ++i) {
        temp = m[i + 8];
        m[i + 8] = m[i + 10];
        m[i + 10] = temp;
    }

    // 第四行循环右移三位
    temp = m[12];
    for (var i = 0; i < 3; ++i) {
        m[i + 12] = m[i + 13];
    }
    m[15] = temp;
}

/*
 * 逆列变换
 * 输入输出: 长度为16的数组
 */
function inv_mix_columns (m) {
    var arr = new Array(4);
    for (var i = 0; i < 4; ++i) {
        for (var j = 0; j < 4; ++j) {
            arr[j] = m[i + j * 4];
        }

        m[i] = (gf_mul(0x0e, arr[0]) ^ gf_mul(0x0b, arr[1]) ^ gf_mul(0x0d, arr[2]) ^ gf_mul(0x09, arr[3]))%256;
        m[i+4] = (gf_mul(0x09, arr[0]) ^ gf_mul(0x0e, arr[1]) ^ gf_mul(0x0b, arr[2]) ^ gf_mul(0x0d, arr[3]))%256;
        m[i+8] = (gf_mul(0x0d, arr[0]) ^ gf_mul(0x09, arr[1]) ^ gf_mul(0x0e, arr[2]) ^ gf_mul(0x0b, arr[3]))%256;
        m[i+12] = (gf_mul(0x0b, arr[0]) ^ gf_mul(0x0d, arr[1]) ^ gf_mul(0x09, arr[2]) ^ gf_mul(0x0e, arr[3]))%256;
    }
}

/*
 * 解密主函数
 * 输入输出: 长度为16的数组、长度为4*(round_number+1)的数组
 */
function decrypt(input, w) {
    var key = new Array(4);
    for (var i = 0; i < 4; ++i) {
        key[i] = w[4 * round_number + i];
    }

    transpose(input);

    add_round_key(input, key);

    for(var round = round_number - 1; round > 0; --round) {
        inv_shift_rows(input);
        inv_sub_bytes(input);
        for (var i = 0; i < 4; ++i) {
            key[i] = w[4 * round + i];
        }
        add_round_key(input, key);
        inv_mix_columns(input);
    }

    inv_shift_rows(input);
    inv_sub_bytes(input);
    for (var i = 0; i < 4; ++i) {
        key[i] = w[i];
    }
    add_round_key(input, key);

    transpose(input);
}

/*
 * 密钥扩展
 */

/*
 * 4个byte转为1个word
 * 输入: 4个8位数
 * 输出: 拼接后的32位数
 */
function word () {
    var result = 0x0;

    for (var i in arguments) {
        result <<= 8;
        result += arguments[i];
    }

    return result >>> 0;
}

/*
 * 循环左移一位
 * 将一个32位数前8位移到后面
 * 输入: 32位数
 * 输出: 32位数
 */
function rot_word (rw) {
    var high = rw << 8,
        low = rw >>> 24;
    return (high | low) >>> 0;
}

/*
 * 对输入32位数中的每一个字节进行S-盒变换
 * 输入: 32位数
 * 输出: 32位数
 */
function sub_word (sw) {
    var temp = new Array(32 + 1).join('0').split('');

    sw = fill(sw, 32);
    for (var i = 0; i < 32; i += 8) {
        var row = parseInt(sw[31-(i+7)], 16) * 8
                + parseInt(sw[31-(i+6)], 16) * 4
                + parseInt(sw[31-(i+5)], 16) * 2
                + parseInt(sw[31-(i+4)], 16);
        var col = parseInt(sw[31-(i+3)], 16) * 8
                + parseInt(sw[31-(i+2)], 16) * 4
                + parseInt(sw[31-(i+1)], 16) * 2
                + parseInt(sw[31-(i)], 16);
        var val = fill(s_box[row][col], 8);
        for (var j = 0; j < 8; ++j) {
            temp[31-(i+j)] = val[7-j] || 0
        }
    }

    var result = "";
    for (var i in temp) {
        result += temp[i];
    }
    return parseInt(result, 2)
}

/*
 * 密钥扩展
 * 对128位密钥进行扩展得到长度为4*(round_number+1)的数组
 * 输入: 长度为4*key_number的数组
 * 输出: 长度为4*(round_number+1)的数组
 */
function key_expansion(key) {
    var temp,
        w = new Array(4 * (round_number + 1) + 1).join('0').split('');

    for (var i = 0; i < key_number; ++i) {
        w[i] = word(
            key[4 * i],
            key[4 * i + 1],
            key[4 * i + 2],
            key[4 * i + 3]
        );
    }

    for (var i = key_number; i < 4 * (round_number + 1); ++i) {
        temp = w[i-1];
        if (i % key_number == 0) {
            w[i] = w[i - key_number] ^ sub_word(rot_word(temp)) ^ r_con[i / key_number - 1]
        } else {
            w[i] = w[i - key_number] ^ temp;
        }
        w[i] >>>= 0
    }

    return w
}

/*
 * 封装方法
 */

/*
 * 提取num从右往左第k位的二进制数字
 * 输入：num: 需要提取的数，
 *     k: 第k位
 * 输出：提取的二进制数字
 */
function pick(num, k) {
    return (num >>> k) - ((num >>> (k+1)) << 1);
}

/*
 * 按位补齐0
 * 输入：num: 16进制数，
 *      length: 需要扩展的长度
 * 输出：扩展后的字符串
 */
function fill (num, length) {
    num = num.toString(2);
    var temp = "";
    for (var i = 0; i < length; i++) {
        temp += '0'
    }
    return temp.substr(0, length - num.length) + num;
}

/*
 * 矩阵转置
 * 输入：m：长度为16的数组
 * 输出：转置后的数组
 */
function transpose (m) {
    function swap (a, b) {
        var temp;
        temp = m[a]; m[a] = m[b]; m[b] = temp;
    }

    swap(1,4);
    swap(2,8);
    swap(3,12);
    swap(6,9);
    swap(7,13);
    swap(11,14);
}

// test
/*
var key = [
    0x2b, 0x7e, 0x15, 0x16,
    0x28, 0xae, 0xd2, 0xa6,
    0xab, 0xf7, 0x15, 0x88,
    0x09, 0xcf, 0x4f, 0x3c];

var w = key_expansion(key);

var plain = [
    0x32, 0x88, 0x31, 0xe0,
    0x43, 0x5a, 0x31, 0x37,
    0xf6, 0x30, 0x98, 0x07,
    0xa8, 0x8d, 0xa2, 0x34];

encrypt(plain, w);
for (var i in plain) {
    console.log(i + " " + plain[i].toString(16))
}

decrypt(plain, w);
for (var i in plain) {
    console.log(i + " " + plain[i].toString(16))
}
    */