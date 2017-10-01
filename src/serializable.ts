import Decoration from './decoration'
import BitOrder from './enums/bitOrder'
import NumberType from './enums/numberType'
import {} from 'node'

abstract class Serializable {
    private get serializeMetadata() : {
        name: string,
        position: number,
        length: number,
        bitOrder: BitOrder,
        numberType: NumberType
    }[]{
        let _meta = Object
            .getPrototypeOf(this)
            ._metaSerialize;
        return Object
            .keys(_meta)
            .map(o => Object.assign({
                name: o
            }, _meta[o]))
            .sort((a, b) => a.position - b.position);
    }

    public serialize() : Buffer{
        let metas = this.serializeMetadata;
        let last = metas[metas.length - 1]
        let buffer : Buffer = Buffer.allocUnsafe(last.position + last.length);
        for (let meta of metas) {
            if (typeof(<any>this)[meta.name] === "number") {
                if (meta.bitOrder===null||meta.bitOrder === undefined) {
                    meta.bitOrder = BitOrder.BE;
                }
                if(BitOrder.BE) {
                    switch (meta.numberType) {
                        case NumberType.Int8:buffer.writeInt8((<any>this)[meta.name],meta.position);break;
                        case NumberType.UInt8:buffer.writeUInt8((<any>this)[meta.name],meta.position);break;
                        case NumberType.Int16:buffer.writeInt16BE((<any>this)[meta.name],meta.position);break;
                        case NumberType.UInt16:buffer.writeUInt16BE((<any>this)[meta.name],meta.position);break;
                        case NumberType.Int32:buffer.writeInt32BE((<any>this)[meta.name],meta.position);break;
                        case NumberType.UInt32:buffer.writeUInt32BE((<any>this)[meta.name],meta.position);break;
                        case NumberType.Float:buffer.writeFloatBE((<any>this)[meta.name],meta.position);break;
                        case NumberType.Double:buffer.writeDoubleBE((<any>this)[meta.name],meta.position);break;
                        default: throw "Unknown number type.";
                    }
                } else {
                    switch (meta.numberType) {
                        case NumberType.Int8:buffer.writeInt8((<any>this)[meta.name],meta.position);break;
                        case NumberType.UInt8:buffer.writeUInt8((<any>this)[meta.name],meta.position);break;
                        case NumberType.Int16:buffer.writeInt16LE((<any>this)[meta.name],meta.position);break;
                        case NumberType.UInt16:buffer.writeUInt16LE((<any>this)[meta.name],meta.position);break;
                        case NumberType.Int32:buffer.writeInt32LE((<any>this)[meta.name],meta.position);break;
                        case NumberType.UInt32:buffer.writeUInt32LE((<any>this)[meta.name],meta.position);break;
                        case NumberType.Float:buffer.writeFloatLE((<any>this)[meta.name],meta.position);break;
                        case NumberType.Double:buffer.writeDoubleLE((<any>this)[meta.name],meta.position);break;
                        default: throw "Unknown number type.";
                    }
                }
            }
            if (typeof(<any>this)[meta.name]) {}
        }
    return buffer;
    }
}
export default Serializable