"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var number_test_1 = require("./data-structures/number-test");
var bufferEquals = require('buffer-equals');
describe("Number test sample", function () {
    it('Should serialize', function () {
        var data = new number_test_1.NumberTest();
        data.int8 = -50;
        data.int8 = 51;
        data.int16be = -500;
        data.int16le = 2117;
        data.uint16be = 2575;
        data.uint16le = 5000;
        data.int32be = -1452455;
        data.int32le = 2452855;
        data.uint32be = 3452455;
        data.uint32le = 3522874;
        var serialized = data.serialize();
        var bufTest = Buffer.from([0x11, 0xce, 0x37, 0x33, 0x0a, 0x0f, 0xfe, 0x0c, 0x88, 0x13, 0x45, 0x08, 0x00, 0x34, 0xae, 0x27, 0xff, 0xe9, 0xd6, 0x59, 0x3a, 0xc1, 0x35, 0x00, 0x77, 0x6d, 0x25, 0x00]);
        chai_1.expect(bufferEquals(serialized, bufTest)).to.equal(true);
    });
    it('Should deserialize', function () {
        var data = new number_test_1.NumberTest();
        var bufTest = Buffer.from([0x11, 0xce, 0x37, 0x33, 0x0a, 0x0f, 0xfe, 0x0c, 0x88, 0x13, 0x45, 0x08, 0x00, 0x34, 0xae, 0x27, 0xff, 0xe9, 0xd6, 0x59, 0x3a, 0xc1, 0x35, 0x00, 0x77, 0x6d, 0x25, 0x00]);
        data.deserialize(bufTest);
        var plain = {
            int8: -50,
            uint8: 51,
            int16be: -500,
            int16le: 2117,
            uint16be: 2575,
            uint16le: 5000,
            int32be: -1452455,
            int32le: 2452855,
            uint32be: 3452455,
            uint32le: 3522874
        };
        var d = Object.assign({}, data);
        delete d._serializeMetadata;
        chai_1.expect(d).to.deep.equal(plain);
    });
});
//# sourceMappingURL=number.spec.js.map