"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var serializable_1 = require("./../serializer/serializable");
/**
 * Define the main data structure to manage the sendable message in a noisy channel
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Message.prototype, "crcInfo", {
        /**
         * Return information about CRC base settings
         */
        get: function () {
            var msgs = this.messageMetadata;
            var crcInfo;
            if (msgs.length > 0) {
                var crc = msgs.find(function (o) { return o.crcInfo !== undefined; });
                crcInfo = crc.crcInfo;
                crcInfo.name = crc.name;
            }
            return crcInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "endInfo", {
        /**
         * Return informations about the last message byte
         */
        get: function () {
            var msgs = this.messageMetadata;
            var endInfo;
            if (msgs.length > 0) {
                var end = msgs.find(function (o) { return o.lastChar !== undefined; });
                endInfo = { enable: end.lastChar, name: end.name };
            }
            return endInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "length", {
        /**
         * Return the message length
         */
        get: function () {
            var metas = this.serializeMetadata;
            var crcInfo = this.crcInfo;
            var last = metas[metas.length - 1];
            return last.position + last.length - 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "bufferLength", {
        /**
         * Return the length of entire buffer
         */
        get: function () {
            var metas = this.serializeMetadata;
            var crcInfo = this.crcInfo;
            var endInfo = this.endInfo;
            var last = metas[metas.length - 1];
            var len = last.position + last.length;
            if (crcInfo && crcInfo.length)
                len += crcInfo.length;
            if (endInfo && endInfo.enable)
                len += 1;
            return len;
        },
        enumerable: true,
        configurable: true
    });
    return Message;
}(serializable_1.Serializable));
exports.Message = Message;
//# sourceMappingURL=message.js.map