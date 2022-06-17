"use strict";
exports.__esModule = true;
exports.checkPassword = exports.getAuthenticatedUser = exports.getToken = exports.generateToken = exports.generateHash = void 0;
var crypto_1 = require("crypto");
var jsonwebtoken_1 = require("jsonwebtoken");
var fs_1 = require("fs");
var path_1 = require("path");
var pathToKey = path_1["default"].join(__dirname, '../../..', 'id_rsa_priv.pem');
var PRIV_KEY = fs_1["default"].readFileSync(pathToKey, 'utf8');
var HASH_ITERATIONS = 10000;
var generateHash = function (password) {
    var salt = crypto_1["default"].randomBytes(32).toString('hex');
    var hash = crypto_1["default"].pbkdf2Sync(password, salt, HASH_ITERATIONS, 64, 'sha512').toString('hex');
    return {
        salt: salt,
        hash: hash
    };
};
exports.generateHash = generateHash;
var checkPassword = function (passwordTyped, salt, hash) {
    var passwordTypedHash = crypto_1["default"].pbkdf2Sync(passwordTyped, salt, HASH_ITERATIONS, 64, 'sha512').toString('hex');
    return hash === passwordTypedHash;
};
exports.checkPassword = checkPassword;
var generateToken = function (user) {
    var payload = {
        sub: user.code,
        name: user.name,
        email: user.email
    };
    return jsonwebtoken_1["default"].sign(payload, PRIV_KEY, { expiresIn: '7d', algorithm: 'RS256' });
};
exports.generateToken = generateToken;
var getToken = function (request) {
    var header = request.get('Authorization');
    if (!header)
        throw new Error("Token not found");
    return header.split(' ')[1];
};
exports.getToken = getToken;
var getAuthenticatedUser = function (token) {
    var payload = token.split('.')[1];
    var encodedPayload = Buffer.from(payload, 'base64');
    var decodedPayload = encodedPayload.toString('utf-8');
    return JSON.parse(decodedPayload);
};
exports.getAuthenticatedUser = getAuthenticatedUser;
