"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Used to define length and sign of number
 * @see {@link BitOrder} for more details about byte ordering
 */
var NumberType;
(function (NumberType) {
    /**
     * Refear a one byte - 8 bit - unsigned integer
     */
    NumberType[NumberType["UInt8"] = 1] = "UInt8";
    /**
     * Refear a one byte - 8 bit - signed integer
     */
    NumberType[NumberType["Int8"] = -1] = "Int8";
    /**
     * Refear a two byte - 16 bit - unsigned integer
     */
    NumberType[NumberType["UInt16"] = 2] = "UInt16";
    /**
     * Refear a two byte - 16 bit - signed integer
     */
    NumberType[NumberType["Int16"] = -2] = "Int16";
    /**
     * Refear a four byte - 32 bit - unsigned integer
     */
    NumberType[NumberType["UInt32"] = 4] = "UInt32";
    /**
     * Refear a four byte - 32 bit - signed integer
     */
    NumberType[NumberType["Int32"] = -4] = "Int32";
    /**
     *  Refear a four byte - 32 bit - floating point
     */
    NumberType[NumberType["Float"] = 4] = "Float";
    /**
     * Refear a four byte - 32 bit - floating point
     */
    NumberType[NumberType["Double"] = -4] = "Double";
})(NumberType = exports.NumberType || (exports.NumberType = {}));
//# sourceMappingURL=numberType.js.map