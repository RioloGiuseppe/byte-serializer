import { Serializable, SerializableInfo, NumberType, BitOrder } from "../..";

export class NumberTest extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.numberType(NumberType.UInt8)
    public uint8: number;

    @SerializableInfo.position(1)
    @SerializableInfo.numberType(NumberType.Int8)
    public int8: number;

    @SerializableInfo.position(2)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.UInt16)
    public uint16be: number;

    @SerializableInfo.position(4)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int16)
    public int16be: number;

    @SerializableInfo.position(6)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.UInt16)
    public uint16le: number;

    @SerializableInfo.position(8)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.Int16)
    public int16le: number;

    @SerializableInfo.position(10)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.UInt32)
    public uint32be: number;

    @SerializableInfo.position(14)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int32)
    public int32be: number;

    @SerializableInfo.position(18)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.UInt32)
    public uint32le: number;

    @SerializableInfo.position(22)
    @SerializableInfo.bitOrder(BitOrder.LE)
    @SerializableInfo.numberType(NumberType.Int32)
    public int32le: number;
}