"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var fixed_string_test_1 = require("./data-structures/fixed-string-test");
var bufferEquals = require('buffer-equals');
describe("String test sample", function () {
    it('Should serialize', function () {
        var data = new fixed_string_test_1.FixedStringTest();
        data.AsciiText = "Tests";
        data.Latin1Text = "Tests";
        data.UCS2Text = "Tests";
        data.UTF16LEText = "Tests";
        data.UTF8Text = "Tests";
        var serialized = data.serialize();
        var bufTest = Buffer.from([0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x65, 0x73, 0x74, 0x73]);
        chai_1.expect(bufferEquals(serialized, bufTest)).to.equal(true);
    });
    it('Should deserialize', function () {
        var data = new fixed_string_test_1.FixedStringTest();
        var bufTest = Buffer.from([0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x65, 0x73, 0x74, 0x73, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x00, 0x65, 0x00, 0x73, 0x00, 0x74, 0x00, 0x73, 0x00, 0x54, 0x65, 0x73, 0x74, 0x73]);
        data.deserialize(bufTest);
        var plain = {
            AsciiText: "Tests",
            Latin1Text: "Tests",
            UCS2Text: "Tests",
            UTF16LEText: "Tests",
            UTF8Text: "Tests"
        };
        var d = Object.assign({}, data);
        delete d._serializeMetadata;
        chai_1.expect(d).to.deep.equal(plain);
    });
});
//# sourceMappingURL=fixedstring.spec.js.map