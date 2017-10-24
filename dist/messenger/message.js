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
            if (this._crcInfo)
                return this._crcInfo;
            var msgs = this.messageMetadata;
            if (msgs.length > 0) {
                var crc = msgs.find(function (o) { return o.crcInfo !== undefined; });
                this._crcInfo = crc.crcInfo;
                this._crcInfo.name = crc.name;
            }
            return this._crcInfo;
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
            if (msgs.length > 0) {
                var end = msgs.find(function (o) { return o.lastChar !== undefined; });
                this._endInfo = { enable: end.lastChar, name: end.name };
            }
            return this._endInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "length", {
        /**
         * Return the message length
         */
        get: function () {
            var that = this;
            var metas = this.serializeMetadata;
            return metas.filter(function (o) { return !o.ignoreSerialize; }).reduce(function (a, b) {
                if (typeof (b.length) === "number")
                    return a + b.length;
                else if (typeof (that[b.name].length) === "number")
                    return a + that[b.name].length;
                else
                    throw "Invalid length for " + b.name + " field";
            }, -2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "bufferLength", {
        /**
         * Return the length of entire buffer
         */
        get: function () {
            var len = this.length + 2;
            if (this.crcInfo && this.crcInfo.length)
                len += this.crcInfo.length;
            if (this.endInfo && this.endInfo.enable)
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