"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Refers to the sequential order in which bytes are arranged into larger numerical values
 */
var BitOrder;
(function (BitOrder) {
    /**
     * Use little-endian byte sorting
     */
    BitOrder[BitOrder["LE"] = 0] = "LE";
    /**
     *  Use big-endian byte sorting
     */
    BitOrder[BitOrder["BE"] = 1] = "BE";
})(BitOrder = exports.BitOrder || (exports.BitOrder = {}));
//# sourceMappingURL=bitOrder.js.map