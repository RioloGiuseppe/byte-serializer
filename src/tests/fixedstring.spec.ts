import 'mocha';
import { expect } from 'chai';
import { inspect } from 'util';
import { FixedStringTest } from './data-structures/fixed-string-test';
const bufferEquals = require('buffer-equals');

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