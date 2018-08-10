import { Serializable, SerializableInfo, TextEncoding } from "../..";

export class FixedStringTest extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.lenght(5)
    @SerializableInfo.textEncoding(TextEncoding.ASCII)
    public AsciiText: string;

    @SerializableInfo.position(5)
    @SerializableInfo.lenght(5)
    @SerializableInfo.textEncoding(TextEncoding.LATIN1)
    public Latin1Text: string;

    @SerializableInfo.position(10)
    @SerializableInfo.lenght(10)
    @SerializableInfo.textEncoding(TextEncoding.UCS2)
    public UCS2Text: string;

    @SerializableInfo.position(20)
    @SerializableInfo.lenght(10)
    @SerializableInfo.textEncoding(TextEncoding.UTF16LE)
    public UTF16LEText: string;

    @SerializableInfo.position(30)
    @SerializableInfo.lenght(5)
    @SerializableInfo.textEncoding(TextEncoding.UTF8)
    public UTF8Text: string;
}