import 'mocha';
import { expect } from 'chai';
import { Serializable, SerializableInfo, BitOrder, NumberType } from '../index'
import { inspect } from 'util';
const bufferEquals = require('buffer-equals');

class NumberTest extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.UInt8)
    public uint8be: number;

    @SerializableInfo.position(1)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int8)
    public int8be: number;

    @SerializableInfo.position(2)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.UInt8)
    public uint8le: number;

    @SerializableInfo.position(3)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.Int8)
    public int8le: number;

    @SerializableInfo.position(4)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.UInt16)
    public uint16be: number;

    @SerializableInfo.position(6)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int16)
    public int16be: number;

    @SerializableInfo.position(8)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.UInt16)
    public uint16le: number;

    @SerializableInfo.position(10)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.Int16)
    public int16le: number;

    @SerializableInfo.position(12)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.UInt32)
    public uint32be: number;

    @SerializableInfo.position(16)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int32)
    public int32be: number;

    @SerializableInfo.position(20)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.UInt32)
    public uint32le: number;

    @SerializableInfo.position(24)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.Int32)
    public int32le: number;
}


describe("Number test sample", () => {

    it('Should serialize', () => {

        let data = new NumberTest();
        data.int8be = -50;
        data.int8le = 51;
        data.uint8be = 17;
        data.uint8le = 55;

        data.int16be = -500;
        data.int16le = 2117;
        data.uint16be = 2575;
        data.uint16le = 5000;

        data.int32be = -1452455;
        data.int32le = 2452855;
        data.uint32be = 3452455;
        data.uint32le = 3522874;

        let serialized = data.serialize();
        let bufTest = Buffer.from([0x11, 0xce, 0x37, 0x33, 0x0a, 0x0f, 0xfe, 0x0c, 0x88, 0x13, 0x45, 0x08, 0x00, 0x34, 0xae, 0x27, 0xff, 0xe9, 0xd6, 0x59, 0x3a, 0xc1, 0x35, 0x00, 0x77, 0x6d, 0x25, 0x00]);
        expect(bufferEquals(serialized, bufTest)).to.equal(true);
    });

    it('Should deserialize', () => {
        let data = new NumberTest();
        let bufTest = Buffer.from([0x11, 0xce, 0x37, 0x33, 0x0a, 0x0f, 0xfe, 0x0c, 0x88, 0x13, 0x45, 0x08, 0x00, 0x34, 0xae, 0x27, 0xff, 0xe9, 0xd6, 0x59, 0x3a, 0xc1, 0x35, 0x00, 0x77, 0x6d, 0x25, 0x00]);
        data.deserialize(bufTest);
        let plain = {
            int8be: -50,
            int8le: 51,
            uint8be: 17,
            uint8le: 55,
            int16be: -500,
            int16le: 2117,
            uint16be: 2575,
            uint16le: 5000,
            int32be: -1452455,
            int32le: 2452855,
            uint32be: 3452455,
            uint32le: 3522874
        }
        let d:any = Object.assign({}, data)
        delete d._serializeMetadata;
        expect(d).to.deep.equal(plain);
    });

});