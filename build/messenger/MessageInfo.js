"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains main decorator for properties of message derived class
 */
var MessageInfo;
(function (MessageInfo) {
    /**
     * Add one byte at the end of message. Is used to set the closure of message.
     * Default off.
     * @param value If true enable end byte
     */
    function enableLastChar(value) {
        if (value === void 0) { value = false; }
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "lastChar", value);
        };
    }
    MessageInfo.enableLastChar = enableLastChar;
    /**
     * Enable the CRC check of message.
     * @param length Define the name of the property of type CRC to compute crc @see {@link CRC}
     * @param startByte Define the position of the first byte of the output array to compute crc
     * @param lastByte Define the position of the last byte of the output array to compute crc
     */
    function enableCRC(length, startByte, lastByte) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "crcInfo", { startByte: startByte, stopByte: lastByte, length: length });
        };
    }
    MessageInfo.enableCRC = enableCRC;
    /**
     * @ignore
     */
    function addMeta(target, propertyKey, metaName, metaValue) {
        if (target && !target["_metaMessage"]) {
            target["_metaMessage"] = {};
        }
        if (!target["_metaMessage"][propertyKey])
            target["_metaMessage"][propertyKey] = {};
        target["_metaMessage"][propertyKey][metaName] = metaValue;
    }
})(MessageInfo = exports.MessageInfo || (exports.MessageInfo = {}));
//# sourceMappingURL=MessageInfo.js.map