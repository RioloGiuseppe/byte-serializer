import {SerializerInfo} from './serializerInfo'
import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'
import {PropertyType} from './../enums/propertyType'
import {CommonMetadata} from './../interfaces/commonMetadata'
import {NumberMetadata} from './../interfaces/numberMetadata'
import {StringMetadata} from './../interfaces/stringMetadata'
import {CRC,CRCMetadata} from './../interfaces/crc'
import {} from 'node'

export abstract class Serializable {
    public get serializeMetadata():CommonMetadata []{
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

    public get messageMetadata():CommonMetadata []{
        let _msg = Object.getPrototypeOf(this)._metaMessage;
        if(_msg)
            return Object.keys(_msg).map(o => Object.assign({
                    name: o
            }, _msg[o]));
        else 
            return [];
    }

    public get bufferLength(): number{
        let metas = this.serializeMetadata;
        let last = metas[metas.length - 1];
        return last.position + last.length;
    }

    public serialize() : Buffer{
        let metas = this.serializeMetadata;
        let msgs = this.messageMetadata;
        let lastMeta = metas[metas.length-1];
        let len = this.bufferLength;
        let buffer : Buffer = Buffer.allocUnsafe(len);
        for (let meta of metas) {
            
            if (meta.propertyType === PropertyType.Number) {             
                if ((<NumberMetadata>meta).bitOrder===null||(<NumberMetadata>meta).bitOrder === undefined) {
                    (<NumberMetadata>meta).bitOrder = BitOrder.BE;
                }
                if((<NumberMetadata>meta).bitOrder === BitOrder.BE) {
                    switch ((<NumberMetadata>meta).numberType) {
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
                    switch ((<NumberMetadata>meta).numberType) {
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
            if (meta.propertyType === PropertyType.String) {
                buffer.write((<any>this)[meta.name], meta.position, meta.length, (<StringMetadata>meta).textEncoding);
            }
            if (meta.propertyType === PropertyType.Buffer) {
                (<Buffer>((<any>this)[meta.name])).copy(buffer,meta.position,0,meta.length);
            }
            if ((<any>this)[meta.name] === undefined || (<any>this)[meta.name] === null) {
                throw "Unset variable '" + meta.name + "' is not allowed!";
            }
        }
        if(typeof((<any>this).crcInfo)!=="undefined"){
            let thisAny = <any>this;
            var crcBuff =Buffer.from((<CRC>((<any>this)[thisAny.crcInfo.name])).compute(<Array<number>><any>buffer.slice(thisAny.crcInfo.startByte,thisAny.crcInfo.stopByte)));
            crcBuff.copy(buffer,lastMeta.position+lastMeta.length, 0, thisAny.crcInfo.length);
        }
        if(typeof((<any>this).endInfo)!=="undefined"){
            buffer[buffer.length-1] = (<any>this)[(<any>this).endInfo.name];
        }
        return buffer;
    }

    public deserialize(buffer: Buffer){
        let metas = this.serializeMetadata;
        let msgs = this.messageMetadata;
        let lastMeta = metas[metas.length-1];
        let len = this.bufferLength;
        if(typeof((<any>this).crcInfo)!=="undefined"){
            let thisAny = <any>this;
            var crcBuff =(<CRC>((<any>this)[thisAny.crcInfo.name])).compute(<Array<number>><any>buffer.slice(thisAny.crcInfo.startByte,thisAny.crcInfo.stopByte));
            let crcread= buffer.slice(lastMeta.position+lastMeta.length,lastMeta.position+lastMeta.length+(<CRCMetadata>thisAny.crcInfo).length);
            if(crcBuff.compare(crcread)!==0)
                throw "CRC not match";
        }
        for(let meta of metas){
            if(meta.ingnoreDeserialize)
                continue;
            if (meta.propertyType === PropertyType.Number) {           
                if((<NumberMetadata>meta).bitOrder === BitOrder.BE) {
                    switch ((<NumberMetadata>meta).numberType) {
                        case NumberType.Int8:(<any>this)[meta.name] = buffer.readInt8(meta.position);break;
                        case NumberType.UInt8:(<any>this)[meta.name] = buffer.readUInt8(meta.position);break;
                        case NumberType.Int16:(<any>this)[meta.name] = buffer.readInt16BE(meta.position);break;
                        case NumberType.UInt16:(<any>this)[meta.name] = buffer.readUInt16BE(meta.position);break;
                        case NumberType.Int32:(<any>this)[meta.name] = buffer.readInt32BE(meta.position);break;
                        case NumberType.UInt32:(<any>this)[meta.name] = buffer.readUInt32BE(meta.position);break;
                        case NumberType.Float:(<any>this)[meta.name] = buffer.readFloatBE(meta.position);break;
                        case NumberType.Double:(<any>this)[meta.name] = buffer.readDoubleBE(meta.position);break;
                        default: throw "Unknown number type.";
                    }
                } else {
                    switch ((<NumberMetadata>meta).numberType) {
                        case NumberType.Int8:(<any>this)[meta.name] = buffer.readInt8(meta.position);break;
                        case NumberType.UInt8:(<any>this)[meta.name] = buffer.readUInt8(meta.position);break;
                        case NumberType.Int16:(<any>this)[meta.name] = buffer.readInt16LE(meta.position);break;
                        case NumberType.UInt16:(<any>this)[meta.name] = buffer.readUInt16LE(meta.position);break;
                        case NumberType.Int32:(<any>this)[meta.name] = buffer.readInt32LE(meta.position);break;
                        case NumberType.UInt32:(<any>this)[meta.name] = buffer.readUInt32LE(meta.position);break;
                        case NumberType.Float:(<any>this)[meta.name] = buffer.readFloatLE(meta.position);break;
                        case NumberType.Double:(<any>this)[meta.name] = buffer.readDoubleLE(meta.position);break;
                        default: throw "Unknown number type.";
                    }
                }
            }
            if (meta.propertyType === PropertyType.String) {
                (<any>this)[meta.name] = buffer.toString((<StringMetadata>meta).textEncoding, meta.position,  meta.position + meta.length);
            }
            if (meta.propertyType === PropertyType.Buffer) {
                (<any>this)[meta.name] = new Buffer(5);
            }
        }
    }
}