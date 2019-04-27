import { SerializableInfo } from './serializableInfo'
import { BitOrder } from '../enums/bitOrder'
import { TextEncoding } from '../enums/textEncoding'
import { NumberType } from '../enums/numberType'
import { PropertyType } from '../enums/propertyType'
import { CommonMetadata } from '../interfaces/commonMetadata'
import { NumberMetadata } from '../interfaces/numberMetadata'
import { NestedMetadata } from '../interfaces/nestedMetadata'
import { StringMetadata } from '../interfaces/stringMetadata'
import { Defaults } from '../interfaces/defaults'
import { Buffer } from 'buffer';

/**
 * Define the structure of the serializable payload and embed the main methods to transform array in to object and vice versa.
 */
export abstract class Serializable {

    public static DefautSettings: Defaults = {};
    private _serializeMetadata?: CommonMetadata[];
    private _messageMetadata?: CommonMetadata[];
    private _bufferLength?: number;

    /**
    * Return the serialization metadata for current type
    */
    public get serializeMetadata(): CommonMetadata[] {
        if (this._serializeMetadata)
            return this._serializeMetadata;
        let _meta = Object.getPrototypeOf(this)._metaSerialize;

        this._serializeMetadata = (_meta !== null && _meta !== undefined ? Object.keys(_meta) : [])
            .map(o => Object.assign({
                name: o
            }, _meta[o]))
            .sort((a, b) => a.position - b.position);
        return this._serializeMetadata
    }

    /**
     * Return the length of entire buffer
     */
    public get bufferLength(): number {
        let metas = this.serializeMetadata;
        let that = <any>this;
        return metas.filter(o => !o.ignore).reduce(function (a, b) {
            if (typeof (b.length) === "number") return a + b.length;
            else if (typeof (that[b.name].length) === "number") return a + that[b.name].length;
            else throw new Error("Invalid length for " + b.name + " field");
        }, 0);
    }

    /**
     * Return a buffer that contains all data information stored in properties of the current instance of the object
     */
    public serialize(_defs?: Defaults, err?: (e: Error) => void): Buffer {
        try {
            let defs = Object.assign(Serializable.DefautSettings, _defs || {});
            let metas = this.serializeMetadata;
            let lastMeta = metas[metas.length - 1];
            let len = this.bufferLength;
            let buffer: Buffer = Buffer.alloc(len);
            for (let meta of metas) {
                if (meta.ignore) continue;
                if (meta.propertyType === PropertyType.Number) {
                    (<NumberMetadata>meta).bitOrder = (<NumberMetadata>meta).bitOrder || defs.bitOrder || BitOrder.BE;
                    (<NumberMetadata>meta).numberType = (<NumberMetadata>meta).numberType || defs.numberType || NumberType.UInt32;
                    if ((<NumberMetadata>meta).bitOrder === BitOrder.BE) {
                        switch ((<NumberMetadata>meta).numberType) {
                            case NumberType.Int8: buffer.writeInt8((<any>this)[meta.name], meta.position); break;
                            case NumberType.UInt8: buffer.writeUInt8((<any>this)[meta.name], meta.position); break;
                            case NumberType.Int16: buffer.writeInt16BE((<any>this)[meta.name], meta.position); break;
                            case NumberType.UInt16: buffer.writeUInt16BE((<any>this)[meta.name], meta.position); break;
                            case NumberType.Int32: buffer.writeInt32BE((<any>this)[meta.name], meta.position); break;
                            case NumberType.UInt32: buffer.writeUInt32BE((<any>this)[meta.name], meta.position); break;
                            case NumberType.Float: buffer.writeFloatBE((<any>this)[meta.name], meta.position); break;
                            case NumberType.Double: buffer.writeDoubleBE((<any>this)[meta.name], meta.position); break;
                            default: throw new Error("Unknown number type.");
                        }
                    } else {
                        switch ((<NumberMetadata>meta).numberType) {
                            case NumberType.Int8: buffer.writeInt8((<any>this)[meta.name], meta.position); break;
                            case NumberType.UInt8: buffer.writeUInt8((<any>this)[meta.name], meta.position); break;
                            case NumberType.Int16: buffer.writeInt16LE((<any>this)[meta.name], meta.position); break;
                            case NumberType.UInt16: buffer.writeUInt16LE((<any>this)[meta.name], meta.position); break;
                            case NumberType.Int32: buffer.writeInt32LE((<any>this)[meta.name], meta.position); break;
                            case NumberType.UInt32: buffer.writeUInt32LE((<any>this)[meta.name], meta.position); break;
                            case NumberType.Float: buffer.writeFloatLE((<any>this)[meta.name], meta.position); break;
                            case NumberType.Double: buffer.writeDoubleLE((<any>this)[meta.name], meta.position); break;
                            default: throw new Error("Unknown number type.");
                        }
                    }
                }
                if (meta.propertyType === PropertyType.String) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    (<StringMetadata>meta).textEncoding = (<StringMetadata>meta).textEncoding || defs.textEncoding || TextEncoding.ASCII;
                    let _len = new Buffer((<any>this)[meta.name], (<StringMetadata>meta).textEncoding).length;
                    buffer.write((<any>this)[meta.name], meta.position, meta.length || _len, (<StringMetadata>meta).textEncoding);
                }
                if (meta.propertyType === PropertyType.Buffer) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    (<Buffer>((<any>this)[meta.name])).copy(buffer, meta.position, 0, meta.length || (<Buffer>((<any>this)[meta.name])).length);
                }
                if (meta.propertyType === PropertyType.Object) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    (<Serializable>((<any>this)[meta.name])).serialize(defs, err).copy(buffer, meta.position, 0, meta.length);
                }
                if (meta.propertyType === PropertyType.Array) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    if ((<any>(<NestedMetadata>meta).nestedType).prototype instanceof Serializable) {
                        if (typeof (<any>(<NestedMetadata>meta).nestedType) !== "object" && typeof (<any>(<NestedMetadata>meta).nestedType) !== "function") throw new Error("Invalid type for " + meta.name + " field");
                        let a = <Array<Serializable>>((<any>this)[meta.name]);
                        let stPos = meta.position;
                        let _len = (<NestedMetadata>meta).nestedSize;
                        for (let item of a) {
                            item.serialize(defs, err).copy(buffer, stPos, 0, _len);
                            stPos += _len;
                        }
                    }
                    if ((<NestedMetadata>meta).nestedType === PropertyType.Number) {
                        //if(<any>(<NestedMetadata>meta).nestedType!=="number") throw new Error("Invalid length for " + meta.name + " field");
                        let a = <Array<Serializable | number>>((<any>this)[meta.name]);
                        let f: (value: number, offset: number, noAssert?: boolean) => number;
                        if ((<NestedMetadata>meta).nestedBitOrder === BitOrder.BE) {
                            switch ((<NestedMetadata>meta).nestedNumber) {
                                case NumberType.Int8: f = buffer.writeInt8; break;
                                case NumberType.UInt8: f = buffer.writeUInt8; break;
                                case NumberType.Int16: f = buffer.writeInt16BE; break;
                                case NumberType.UInt16: f = buffer.writeUInt16BE; break;
                                case NumberType.Int32: f = buffer.writeInt32BE; break;
                                case NumberType.UInt32: f = buffer.writeUInt32BE; break;
                                case NumberType.Float: f = buffer.writeFloatBE; break;
                                case NumberType.Double: f = buffer.writeDoubleBE; break;
                                default: throw new Error("Unknown number type.");
                            }
                        } else {
                            switch ((<NestedMetadata>meta).nestedNumber) {
                                case NumberType.Int8: f = buffer.writeInt8; break;
                                case NumberType.UInt8: f = buffer.writeUInt8; break;
                                case NumberType.Int16: f = buffer.writeInt16LE; break;
                                case NumberType.UInt16: f = buffer.writeUInt16LE; break;
                                case NumberType.Int32: f = buffer.writeInt32LE; break;
                                case NumberType.UInt32: f = buffer.writeUInt32LE; break;
                                case NumberType.Float: f = buffer.writeFloatLE; break;
                                case NumberType.Double: f = buffer.writeDoubleLE; break;
                                default: throw new Error("Unknown number type.");
                            }
                        }
                        let stPos = meta.position;
                        let _len = (<NestedMetadata>meta).nestedSize;
                        for (let item of a) {
                            f.apply(buffer, [item, stPos]);
                            stPos += _len;
                        }
                    }
                }
                if ((<any>this)[meta.name] === undefined || (<any>this)[meta.name] === null) {
                    throw new Error("Unset variable '" + meta.name + "' is not allowed!");
                }
            }
            return buffer;
        } catch (error) {
            if (err) err(error);
            else throw error;
        }
    }

    /**
     * Set values of properties from a buffer
     */
    public deserialize(buffer: Buffer, _defs?: Defaults, err?: (e: Error) => void): Serializable {
        let defs = Object.assign(Serializable.DefautSettings, _defs || {});
        let metas = this.serializeMetadata;
        let len = buffer.length;
        let lastWrite: number = 0;
        try {
            for (let meta of metas) {
                if (meta.ignore) continue;
                if (meta.propertyType === PropertyType.Number) {
                    if (typeof (meta.length) !== "number") throw new Error("Invalid length for " + meta.name + " field");
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    (<NumberMetadata>meta).bitOrder = (<NumberMetadata>meta).bitOrder || defs.bitOrder || BitOrder.BE;
                    (<NumberMetadata>meta).numberType = (<NumberMetadata>meta).numberType || defs.numberType;
                    if ((<NumberMetadata>meta).bitOrder === BitOrder.BE) {
                        switch ((<NumberMetadata>meta).numberType) {
                            case NumberType.Int8: (<any>this)[meta.name] = buffer.readInt8(meta.position); break;
                            case NumberType.UInt8: (<any>this)[meta.name] = buffer.readUInt8(meta.position); break;
                            case NumberType.Int16: (<any>this)[meta.name] = buffer.readInt16BE(meta.position); break;
                            case NumberType.UInt16: (<any>this)[meta.name] = buffer.readUInt16BE(meta.position); break;
                            case NumberType.Int32: (<any>this)[meta.name] = buffer.readInt32BE(meta.position); break;
                            case NumberType.UInt32: (<any>this)[meta.name] = buffer.readUInt32BE(meta.position); break;
                            case NumberType.Float: (<any>this)[meta.name] = buffer.readFloatBE(meta.position); break;
                            case NumberType.Double: (<any>this)[meta.name] = buffer.readDoubleBE(meta.position); break;
                            default: throw new Error("Unknown number type.");
                        }
                    } else {
                        switch ((<NumberMetadata>meta).numberType) {
                            case NumberType.Int8: (<any>this)[meta.name] = buffer.readInt8(meta.position); break;
                            case NumberType.UInt8: (<any>this)[meta.name] = buffer.readUInt8(meta.position); break;
                            case NumberType.Int16: (<any>this)[meta.name] = buffer.readInt16LE(meta.position); break;
                            case NumberType.UInt16: (<any>this)[meta.name] = buffer.readUInt16LE(meta.position); break;
                            case NumberType.Int32: (<any>this)[meta.name] = buffer.readInt32LE(meta.position); break;
                            case NumberType.UInt32: (<any>this)[meta.name] = buffer.readUInt32LE(meta.position); break;
                            case NumberType.Float: (<any>this)[meta.name] = buffer.readFloatLE(meta.position); break;
                            case NumberType.Double: (<any>this)[meta.name] = buffer.readDoubleLE(meta.position); break;
                            default: throw new Error("Unknown number type.");
                        }
                    }
                    lastWrite += meta.length;
                }

                if (meta.propertyType === PropertyType.String) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    (<StringMetadata>meta).textEncoding = (<StringMetadata>meta).textEncoding || defs.textEncoding;
                    let l = typeof (meta.length) !== "undefined" ? meta.length : (len - lastWrite);
                    (<any>this)[meta.name] = buffer.toString((<StringMetadata>meta).textEncoding, meta.position, meta.position + l);
                    lastWrite += meta.length;
                }

                if (meta.propertyType === PropertyType.Buffer) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    let l = typeof (meta.length) !== "undefined" ? meta.length : (len - lastWrite);
                    (<any>this)[meta.name] = Buffer.from(buffer.slice(meta.position, meta.position + l));
                    lastWrite += meta.length;
                }

                if (meta.propertyType === PropertyType.Object) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    let a = new (<ISerializable>(<NestedMetadata>meta).nestedType)();
                    (<any>this)[meta.name] = a.deserialize(Buffer.from(buffer.slice(meta.position, meta.position + meta.length)), defs, err);
                }

                if (meta.propertyType === PropertyType.Array) {
                    if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                    if ((<any>(<NestedMetadata>meta).nestedType).prototype instanceof Serializable) {
                        let array = new Array<Serializable>();
                        let _len = meta.length || (len - lastWrite);
                        let items = _len / (<NestedMetadata>meta).nestedSize;
                        let start = meta.position;
                        for (let i = 0; i < items; i++) {
                            let o = new (<ISerializable>(<NestedMetadata>meta).nestedType)();
                            o.deserialize(Buffer.from(buffer.slice(start, start + (<NestedMetadata>meta).nestedSize)), defs, err);
                            array.push(o);
                        }
                        (<any>this)[meta.name] = array;
                    }
                    if ((<NestedMetadata>meta).nestedType === PropertyType.Number) {
                        if (typeof (meta.position) !== "number") throw new Error("Invalid position for " + meta.name + " field");
                        let f: (offset: number, noAssert?: boolean) => number;
                        if ((<NestedMetadata>meta).nestedBitOrder === BitOrder.BE) {
                            switch ((<NestedMetadata>meta).nestedNumber) {
                                case NumberType.Int8: f = buffer.readInt8; break;
                                case NumberType.UInt8: f = buffer.readUInt8; break;
                                case NumberType.Int16: f = buffer.readInt16BE; break;
                                case NumberType.UInt16: f = buffer.readUInt16BE; break;
                                case NumberType.Int32: f = buffer.readInt32BE; break;
                                case NumberType.UInt32: f = buffer.readUInt32BE; break;
                                case NumberType.Float: f = buffer.readFloatBE; break;
                                case NumberType.Double: f = buffer.readDoubleBE; break;
                                default: throw new Error("Unknown number type.");
                            }
                        } else {
                            switch ((<NestedMetadata>meta).nestedNumber) {
                                case NumberType.Int8: f = buffer.readInt8; break;
                                case NumberType.UInt8: f = buffer.readUInt8; break;
                                case NumberType.Int16: f = buffer.readInt16LE; break;
                                case NumberType.UInt16: f = buffer.readUInt16LE; break;
                                case NumberType.Int32: f = buffer.readInt32LE; break;
                                case NumberType.UInt32: f = buffer.readUInt32LE; break;
                                case NumberType.Float: f = buffer.readFloatLE; break;
                                case NumberType.Double: f = buffer.readDoubleLE; break;
                                default: throw new Error("Unknown number type.");
                            }
                        }
                        let array = new Array<number>();
                        let _len = meta.length || (len - lastWrite);
                        let items = _len / (<NestedMetadata>meta).nestedSize;
                        let start = meta.position;
                        for (let i = 0; i < items; i++) {
                            array.push(f.call(buffer, start));
                            start += (<NestedMetadata>meta).nestedSize
                        }
                        (<any>this)[meta.name] = array;
                    }
                }
            }
            return this;
        }
        catch (error) {
            if (err) err(error);
            else throw error;
        }
    }
}

export interface ISerializable {
    new(): Serializable;
    prototype: any
}