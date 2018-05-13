const QRCode = require('qrcode');
const axios = require('axios');
const wx = require('weixin-js-sdk');
const FastClick = require('fastclick');

window.FastClick = FastClick;
window.QRCode = QRCode;
window.axios = axios;
window.wx = wx;