"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Define the possiblities for the length of CRC
 */
var CrcLength;
(function (CrcLength) {
    /**
     * Use one byte CRC - 8bit
     */
    CrcLength[CrcLength["CRC8"] = 1] = "CRC8";
    /**
     *  Use two byte CRC - 16bit
     */
    CrcLength[CrcLength["CRC16"] = 2] = "CRC16";
    /**
     * Use four byte CRC - 32bit
     */
    CrcLength[CrcLength["CRC32"] = 4] = "CRC32";
})(CrcLength = exports.CrcLength || (exports.CrcLength = {}));
//# sourceMappingURL=crcLength.js.map