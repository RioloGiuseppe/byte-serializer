"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitOrder_1 = require("./../enums/bitOrder");
var numberType_1 = require("./../enums/numberType");
var propertyType_1 = require("./../enums/propertyType");
/**
 * Define the structure of the serializable payload and embed the main methods to transform array in to object and vice versa.
 */
var Serializable = /** @class */ (function () {
    function Serializable() {
    }
    Object.defineProperty(Serializable.prototype, "serializeMetadata", {
        /**
        * Return the serialization metadata for current type
        */
        get: function () {
            if (this._serializeMetadata)
                return this._serializeMetadata;
            var _meta = Object.getPrototypeOf(this)._metaSerialize;
            this._serializeMetadata = Object.keys(_meta)
                .map(function (o) { return Object.assign({
                name: o
            }, _meta[o]); })
                .sort(function (a, b) { return a.position - b.position; });
            return this._serializeMetadata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Serializable.prototype, "messageMetadata", {
        /**
         * Return the additional metadata for current message type configuration
         */
        get: function () {
            if (this._messageMetadata)
                return this._messageMetadata;
            var _msg = Object.getPrototypeOf(this)._metaMessage;
            if (_msg)
                this._messageMetadata = Object.keys(_msg).map(function (o) { return Object.assign({
                    name: o
                }, _msg[o]); });
            else
                this._messageMetadata = [];
            return this._messageMetadata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Serializable.prototype, "bufferLength", {
        /**
         * Return the length of entire buffer
         */
        get: function () {
            var metas = this.serializeMetadata;
            var last = metas[metas.length - 1];
            this._bufferLength = last.position + last.length;
            return this._bufferLength;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return a buffer that contains all data information stored in properties of the current instance of the object
     */
    Serializable.prototype.serialize = function () {
        var metas = this.serializeMetadata;
        var msgs = this.messageMetadata;
        var lastMeta = metas[metas.length - 1];
        var len = this.bufferLength;
        var buffer = Buffer.allocUnsafe(len);
        for (var _i = 0, metas_1 = metas; _i < metas_1.length; _i++) {
            var meta = metas_1[_i];
            if (meta.propertyType === propertyType_1.PropertyType.Number) {
                if (meta.bitOrder === null || meta.bitOrder === undefined) {
                    meta.bitOrder = bitOrder_1.BitOrder.BE;
                }
                if (meta.bitOrder === bitOrder_1.BitOrder.BE) {
                    switch (meta.numberType) {
                        case numberType_1.NumberType.Int8:
                            buffer.writeInt8(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.UInt8:
                            buffer.writeUInt8(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Int16:
                            buffer.writeInt16BE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.UInt16:
                            buffer.writeUInt16BE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Int32:
                            buffer.writeInt32BE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.UInt32:
                            buffer.writeUInt32BE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Float:
                            buffer.writeFloatBE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Double:
                            buffer.writeDoubleBE(this[meta.name], meta.position);
                            break;
                        default: throw "Unknown number type.";
                    }
                }
                else {
                    switch (meta.numberType) {
                        case numberType_1.NumberType.Int8:
                            buffer.writeInt8(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.UInt8:
                            buffer.writeUInt8(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Int16:
                            buffer.writeInt16LE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.UInt16:
                            buffer.writeUInt16LE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Int32:
                            buffer.writeInt32LE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.UInt32:
                            buffer.writeUInt32LE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Float:
                            buffer.writeFloatLE(this[meta.name], meta.position);
                            break;
                        case numberType_1.NumberType.Double:
                            buffer.writeDoubleLE(this[meta.name], meta.position);
                            break;
                        default: throw "Unknown number type.";
                    }
                }
            }
            if (meta.propertyType === propertyType_1.PropertyType.String) {
                var l = 0;
                if (typeof (meta.length) === "number")
                    l = meta.length;
                else if (typeof (this[meta.name].length) === "number")
                    l = this[meta.name].length;
                else
                    throw "Invalid length for " + meta.name + " field";
                buffer.write(this[meta.name], meta.position, l, meta.textEncoding);
            }
            if (meta.propertyType === propertyType_1.PropertyType.Buffer) {
                var l = 0;
                if (typeof (meta.length) === "number")
                    l = meta.length;
                else if (typeof (this[meta.name].length) === "number")
                    l = this[meta.name].length;
                else
                    throw "Invalid length for " + meta.name + " field";
                (this[meta.name]).copy(buffer, meta.position, 0, l);
            }
            if (this[meta.name] === undefined || this[meta.name] === null) {
                throw "Unset variable '" + meta.name + "' is not allowed!";
            }
        }
        if (typeof (this.crcInfo) !== "undefined") {
            var thisAny = this;
            var l = 0;
            if (typeof (lastMeta.length) === "number")
                l = lastMeta.length;
            else if (typeof (this[lastMeta.name].length) === "number")
                l = this[lastMeta.name].length;
            else
                throw "Invalid length for " + lastMeta.name + " field";
            var crcBuff = Buffer.from((this[thisAny.crcInfo.name]).compute(buffer.slice(thisAny.crcInfo.startByte, thisAny.crcInfo.stopByte)));
            crcBuff.copy(buffer, lastMeta.position + l, 0, thisAny.crcInfo.length);
        }
        if (typeof (this.endInfo) !== "undefined") {
            buffer[buffer.length - 1] = this[this.endInfo.name];
        }
        return buffer;
    };
    /**
     * Set values of properties from a buffer
     */
    Serializable.prototype.deserialize = function (buffer) {
        var metas = this.serializeMetadata;
        var len = buffer.length;
        var end = typeof (this.endInfo) !== "undefined" && this.endInfo.enable !== false ? this[this.endInfo.name] : null;
        if (end !== null && typeof (end) === "number" && buffer[buffer.length - 1] !== end)
            throw "unexpected end of frame";
        var dyn = len - 2 - (typeof (this.crcInfo) !== "undefined" && typeof (this.crcInfo.length) === "number" ? this.crcInfo.length : 0) - (end ? 1 : 0);
        dyn -= metas.filter(function (o) { return !o.ignoreDeserialize && typeof (o.length) === "number"; }).reduce(function (a, b) { return a + b.length; }, 0);
        if (typeof (this.crcInfo) !== "undefined") {
            var thisAny = this;
            var crcBuff = (this[thisAny.crcInfo.name]).compute(buffer.slice(thisAny.crcInfo.startByte, thisAny.crcInfo.stopByte));
            var crcread = buffer.slice(len - thisAny.crcInfo.length - (end ? 1 : 0), len - (end ? 1 : 0));
            if (crcBuff.compare(crcread) !== 0)
                throw "CRC not match";
        }
        for (var _i = 0, metas_2 = metas; _i < metas_2.length; _i++) {
            var meta = metas_2[_i];
            if (meta.ignoreDeserialize)
                continue;
            if (meta.propertyType === propertyType_1.PropertyType.Number) {
                if (meta.bitOrder === bitOrder_1.BitOrder.BE) {
                    switch (meta.numberType) {
                        case numberType_1.NumberType.Int8:
                            this[meta.name] = buffer.readInt8(meta.position);
                            break;
                        case numberType_1.NumberType.UInt8:
                            this[meta.name] = buffer.readUInt8(meta.position);
                            break;
                        case numberType_1.NumberType.Int16:
                            this[meta.name] = buffer.readInt16BE(meta.position);
                            break;
                        case numberType_1.NumberType.UInt16:
                            this[meta.name] = buffer.readUInt16BE(meta.position);
                            break;
                        case numberType_1.NumberType.Int32:
                            this[meta.name] = buffer.readInt32BE(meta.position);
                            break;
                        case numberType_1.NumberType.UInt32:
                            this[meta.name] = buffer.readUInt32BE(meta.position);
                            break;
                        case numberType_1.NumberType.Float:
                            this[meta.name] = buffer.readFloatBE(meta.position);
                            break;
                        case numberType_1.NumberType.Double:
                            this[meta.name] = buffer.readDoubleBE(meta.position);
                            break;
                        default: throw "Unknown number type.";
                    }
                }
                else {
                    switch (meta.numberType) {
                        case numberType_1.NumberType.Int8:
                            this[meta.name] = buffer.readInt8(meta.position);
                            break;
                        case numberType_1.NumberType.UInt8:
                            this[meta.name] = buffer.readUInt8(meta.position);
                            break;
                        case numberType_1.NumberType.Int16:
                            this[meta.name] = buffer.readInt16LE(meta.position);
                            break;
                        case numberType_1.NumberType.UInt16:
                            this[meta.name] = buffer.readUInt16LE(meta.position);
                            break;
                        case numberType_1.NumberType.Int32:
                            this[meta.name] = buffer.readInt32LE(meta.position);
                            break;
                        case numberType_1.NumberType.UInt32:
                            this[meta.name] = buffer.readUInt32LE(meta.position);
                            break;
                        case numberType_1.NumberType.Float:
                            this[meta.name] = buffer.readFloatLE(meta.position);
                            break;
                        case numberType_1.NumberType.Double:
                            this[meta.name] = buffer.readDoubleLE(meta.position);
                            break;
                        default: throw "Unknown number type.";
                    }
                }
            }
            if (meta.propertyType === propertyType_1.PropertyType.String) {
                var l = typeof (meta.length) !== "undefined" ? meta.length : dyn;
                this[meta.name] = buffer.toString(meta.textEncoding, meta.position, meta.position + l);
            }
            if (meta.propertyType === propertyType_1.PropertyType.Buffer) {
                var l = typeof (meta.length) !== "undefined" ? meta.length : dyn;
                this[meta.name] = Buffer.from(buffer.slice(meta.position, meta.position + l));
            }
        }
    };
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=serializable.js.map