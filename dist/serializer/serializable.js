"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitOrder_1 = require("../enums/bitOrder");
var textEncoding_1 = require("../enums/textEncoding");
var numberType_1 = require("../enums/numberType");
var propertyType_1 = require("../enums/propertyType");
var buffer_1 = require("buffer");
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
    Object.defineProperty(Serializable.prototype, "bufferLength", {
        /**
         * Return the length of entire buffer
         */
        get: function () {
            var metas = this.serializeMetadata;
            var that = this;
            return metas.filter(function (o) { return !o.ignore; }).reduce(function (a, b) {
                if (typeof (b.length) === "number")
                    return a + b.length;
                else if (typeof (that[b.name].length) === "number")
                    return a + that[b.name].length;
                else
                    throw new Error("Invalid length for " + b.name + " field");
            }, 0);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Return a buffer that contains all data information stored in properties of the current instance of the object
     */
    Serializable.prototype.serialize = function (_defs, err) {
        try {
            var defs = Object.assign(Serializable.DefautSettings, _defs || {});
            var metas = this.serializeMetadata;
            var lastMeta = metas[metas.length - 1];
            var len = this.bufferLength;
            var buffer = buffer_1.Buffer.alloc(len);
            for (var _i = 0, metas_1 = metas; _i < metas_1.length; _i++) {
                var meta = metas_1[_i];
                if (meta.ignore)
                    continue;
                if (meta.propertyType === propertyType_1.PropertyType.Number) {
                    meta.bitOrder = meta.bitOrder || defs.bitOrder || bitOrder_1.BitOrder.BE;
                    meta.numberType = meta.numberType || defs.numberType || numberType_1.NumberType.UInt32;
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
                            default: throw new Error("Unknown number type.");
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
                            default: throw new Error("Unknown number type.");
                        }
                    }
                }
                if (meta.propertyType === propertyType_1.PropertyType.String) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    meta.textEncoding = meta.textEncoding || defs.textEncoding || textEncoding_1.TextEncoding.ASCII;
                    var _len = new buffer_1.Buffer(this[meta.name], meta.textEncoding).length;
                    buffer.write(this[meta.name], meta.position, meta.length || _len, meta.textEncoding);
                }
                if (meta.propertyType === propertyType_1.PropertyType.Buffer) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    (this[meta.name]).copy(buffer, meta.position, 0, meta.length || (this[meta.name]).length);
                }
                if (meta.propertyType === propertyType_1.PropertyType.Object) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    (this[meta.name]).serialize(defs, err).copy(buffer, meta.position, 0, meta.length);
                }
                if (meta.propertyType === propertyType_1.PropertyType.Array) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    if (meta.nestedType.prototype instanceof Serializable) {
                        if (typeof meta.nestedType !== "object" && typeof meta.nestedType !== "function")
                            throw new Error("Invalid type for " + meta.name + " field");
                        var a = (this[meta.name]);
                        var stPos = meta.position;
                        var _len = meta.nestedSize;
                        for (var _a = 0, a_1 = a; _a < a_1.length; _a++) {
                            var item = a_1[_a];
                            item.serialize(defs, err).copy(buffer, stPos, 0, _len);
                            stPos += _len;
                        }
                    }
                    if (meta.nestedType === propertyType_1.PropertyType.Number) {
                        //if(<any>(<NestedMetadata>meta).nestedType!=="number") throw new Error("Invalid length for " + meta.name + " field");
                        var a = (this[meta.name]);
                        var f = void 0;
                        if (meta.nestedBitOrder === bitOrder_1.BitOrder.BE) {
                            switch (meta.nestedNumber) {
                                case numberType_1.NumberType.Int8:
                                    f = buffer.writeInt8;
                                    break;
                                case numberType_1.NumberType.UInt8:
                                    f = buffer.writeUInt8;
                                    break;
                                case numberType_1.NumberType.Int16:
                                    f = buffer.writeInt16BE;
                                    break;
                                case numberType_1.NumberType.UInt16:
                                    f = buffer.writeUInt16BE;
                                    break;
                                case numberType_1.NumberType.Int32:
                                    f = buffer.writeInt32BE;
                                    break;
                                case numberType_1.NumberType.UInt32:
                                    f = buffer.writeUInt32BE;
                                    break;
                                case numberType_1.NumberType.Float:
                                    f = buffer.writeFloatBE;
                                    break;
                                case numberType_1.NumberType.Double:
                                    f = buffer.writeDoubleBE;
                                    break;
                                default: throw new Error("Unknown number type.");
                            }
                        }
                        else {
                            switch (meta.nestedNumber) {
                                case numberType_1.NumberType.Int8:
                                    f = buffer.writeInt8;
                                    break;
                                case numberType_1.NumberType.UInt8:
                                    f = buffer.writeUInt8;
                                    break;
                                case numberType_1.NumberType.Int16:
                                    f = buffer.writeInt16LE;
                                    break;
                                case numberType_1.NumberType.UInt16:
                                    f = buffer.writeUInt16LE;
                                    break;
                                case numberType_1.NumberType.Int32:
                                    f = buffer.writeInt32LE;
                                    break;
                                case numberType_1.NumberType.UInt32:
                                    f = buffer.writeUInt32LE;
                                    break;
                                case numberType_1.NumberType.Float:
                                    f = buffer.writeFloatLE;
                                    break;
                                case numberType_1.NumberType.Double:
                                    f = buffer.writeDoubleLE;
                                    break;
                                default: throw new Error("Unknown number type.");
                            }
                        }
                        var stPos = meta.position;
                        var _len = meta.nestedSize;
                        for (var _b = 0, a_2 = a; _b < a_2.length; _b++) {
                            var item = a_2[_b];
                            f.apply(buffer, [item, stPos]);
                            stPos += _len;
                        }
                    }
                }
                if (this[meta.name] === undefined || this[meta.name] === null) {
                    throw new Error("Unset variable '" + meta.name + "' is not allowed!");
                }
            }
            return buffer;
        }
        catch (error) {
            if (err)
                err(error);
            else
                throw error;
        }
    };
    /**
     * Set values of properties from a buffer
     */
    Serializable.prototype.deserialize = function (buffer, _defs, err) {
        var defs = Object.assign(Serializable.DefautSettings, _defs || {});
        var metas = this.serializeMetadata;
        var len = buffer.length;
        var lastWrite = 0;
        try {
            for (var _i = 0, metas_2 = metas; _i < metas_2.length; _i++) {
                var meta = metas_2[_i];
                if (meta.ignore)
                    continue;
                if (meta.propertyType === propertyType_1.PropertyType.Number) {
                    if (typeof (meta.length) !== "number")
                        throw new Error("Invalid length for " + meta.name + " field");
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    meta.bitOrder = meta.bitOrder || defs.bitOrder || bitOrder_1.BitOrder.BE;
                    meta.numberType = meta.numberType || defs.numberType;
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
                            default: throw new Error("Unknown number type.");
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
                            default: throw new Error("Unknown number type.");
                        }
                    }
                    lastWrite += meta.length;
                }
                if (meta.propertyType === propertyType_1.PropertyType.String) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    meta.textEncoding = meta.textEncoding || defs.textEncoding;
                    var l = typeof (meta.length) !== "undefined" ? meta.length : (len - lastWrite);
                    this[meta.name] = buffer.toString(meta.textEncoding, meta.position, meta.position + l);
                    lastWrite += meta.length;
                }
                if (meta.propertyType === propertyType_1.PropertyType.Buffer) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    var l = typeof (meta.length) !== "undefined" ? meta.length : (len - lastWrite);
                    this[meta.name] = buffer_1.Buffer.from(buffer.slice(meta.position, meta.position + l));
                    lastWrite += meta.length;
                }
                if (meta.propertyType === propertyType_1.PropertyType.Object) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    var a = new meta.nestedType();
                    this[meta.name] = a.deserialize(buffer_1.Buffer.from(buffer.slice(meta.position, meta.position + meta.length)), defs, err);
                }
                if (meta.propertyType === propertyType_1.PropertyType.Array) {
                    if (typeof (meta.position) !== "number")
                        throw new Error("Invalid position for " + meta.name + " field");
                    if (meta.nestedType.prototype instanceof Serializable) {
                        var array = new Array();
                        var _len = meta.length || (len - lastWrite);
                        var items = _len / meta.nestedSize;
                        var start = meta.position;
                        for (var i = 0; i < items; i++) {
                            var o = new meta.nestedType();
                            o.deserialize(buffer_1.Buffer.from(buffer.slice(start, start + meta.nestedSize)), defs, err);
                            array.push(o);
                        }
                        this[meta.name] = array;
                    }
                    if (meta.nestedType === propertyType_1.PropertyType.Number) {
                        if (typeof (meta.position) !== "number")
                            throw new Error("Invalid position for " + meta.name + " field");
                        var f = void 0;
                        if (meta.nestedBitOrder === bitOrder_1.BitOrder.BE) {
                            switch (meta.nestedNumber) {
                                case numberType_1.NumberType.Int8:
                                    f = buffer.readInt8;
                                    break;
                                case numberType_1.NumberType.UInt8:
                                    f = buffer.readUInt8;
                                    break;
                                case numberType_1.NumberType.Int16:
                                    f = buffer.readInt16BE;
                                    break;
                                case numberType_1.NumberType.UInt16:
                                    f = buffer.readUInt16BE;
                                    break;
                                case numberType_1.NumberType.Int32:
                                    f = buffer.readInt32BE;
                                    break;
                                case numberType_1.NumberType.UInt32:
                                    f = buffer.readUInt32BE;
                                    break;
                                case numberType_1.NumberType.Float:
                                    f = buffer.readFloatBE;
                                    break;
                                case numberType_1.NumberType.Double:
                                    f = buffer.readDoubleBE;
                                    break;
                                default: throw new Error("Unknown number type.");
                            }
                        }
                        else {
                            switch (meta.nestedNumber) {
                                case numberType_1.NumberType.Int8:
                                    f = buffer.readInt8;
                                    break;
                                case numberType_1.NumberType.UInt8:
                                    f = buffer.readUInt8;
                                    break;
                                case numberType_1.NumberType.Int16:
                                    f = buffer.readInt16LE;
                                    break;
                                case numberType_1.NumberType.UInt16:
                                    f = buffer.readUInt16LE;
                                    break;
                                case numberType_1.NumberType.Int32:
                                    f = buffer.readInt32LE;
                                    break;
                                case numberType_1.NumberType.UInt32:
                                    f = buffer.readUInt32LE;
                                    break;
                                case numberType_1.NumberType.Float:
                                    f = buffer.readFloatLE;
                                    break;
                                case numberType_1.NumberType.Double:
                                    f = buffer.readDoubleLE;
                                    break;
                                default: throw new Error("Unknown number type.");
                            }
                        }
                        var array = new Array();
                        var _len = meta.length || (len - lastWrite);
                        var items = _len / meta.nestedSize;
                        var start = meta.position;
                        for (var i = 0; i < items; i++) {
                            array.push(f.call(buffer, start));
                            start += meta.nestedSize;
                        }
                        this[meta.name] = array;
                    }
                }
            }
            return this;
        }
        catch (error) {
            if (err)
                err(error);
            else
                throw error;
        }
    };
    Serializable.DefautSettings = {};
    return Serializable;
}());
exports.Serializable = Serializable;
//# sourceMappingURL=serializable.js.map