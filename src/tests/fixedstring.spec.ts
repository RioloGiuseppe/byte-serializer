import 'mocha';
import { expect } from 'chai';
import { Serializable, SerializableInfo, TextEncoding } from '../index'
import { inspect } from 'util';
const bufferEquals = require('buffer-equals');

class FixedStringTest extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.length(5)
    @SerializableInfo.textEncoding(TextEncoding.ASCII)
    public AsciiText: string;

    @SerializableInfo.position(5)
    @SerializableInfo.length(5)
    @SerializableInfo.textEncoding(TextEncoding.LATIN1)
    public Latin1Text: string;

    @SerializableInfo.position(10)
    @SerializableInfo.length(10)
    @SerializableInfo.textEncoding(TextEncoding.UCS2)
    public UCS2Text: string;

    @SerializableInfo.position(20)
    @SerializableInfo.length(10)
    @SerializableInfo.textEncoding(TextEncoding.UTF16LE)
    public UTF16LEText: string;

    @SerializableInfo.position(30)
    @SerializableInfo.length(5)
    @SerializableInfo.textEncoding(TextEncoding.UTF8)
    public UTF8Text: string;
}


describe("String test sample", () => {

    it('Should serialize', () => {

        let data = new FixedStringTest();
        data.AsciiText = "Tests";
        data.Latin1Text = "Tests";
        data.UCS2Text = "Tests";
        data.UTF16LEText = "Tests";
        data.UTF8Text = "Tests";
        let serialized = data.serialize();
        let bufTest = Buffer.from([0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x65, 0x73, 0x74, 0x73]);
        expect(bufferEquals(serialized, bufTest)).to.equal(true);
    });

    it('Should deserialize', () => {
        let data = new FixedStringTest();
        let bufTest = Buffer.from([0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x65, 0x73, 0x74, 0x73]);
        data.deserialize(bufTest);
        let plain = {
            AsciiText: "Tests",
            Latin1Text: "Tests",
            UCS2Text: "Tests",
            UTF16LEText: "Tests",
            UTF8Text: "Tests"
        }
        let d: any = Object.assign({}, data)
        delete d._serializeMetadata;
        expect(d).to.deep.equal(plain);
    });

});