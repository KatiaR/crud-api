"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserId = exports.unsuccessfulResponse = exports.successfulResponse = exports.isIdValid = void 0;
const uuid_1 = require("uuid");
const isIdValid = (id) => {
    return (0, uuid_1.validate)(id);
};
exports.isIdValid = isIdValid;
const successfulResponse = (res, data, code = 200) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};
exports.successfulResponse = successfulResponse;
const unsuccessfulResponse = (res, errCode, msg) => {
    res.writeHead(errCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: msg }));
};
exports.unsuccessfulResponse = unsuccessfulResponse;
const validateUserId = (res, userId) => {
    if (!(0, exports.isIdValid)(userId)) {
        (0, exports.unsuccessfulResponse)(res, 400, 'Invalid userId. Must be a valid UUID');
        return;
    }
};
exports.validateUserId = validateUserId;
