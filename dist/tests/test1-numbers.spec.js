"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var byte_serializer_1 = require("byte-serializer");
var DataExample = /** @class */ (function (_super) {
    __extends(DataExample, _super);
    function DataExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        byte_serializer_1.SerializableInfo.position(0),
        byte_serializer_1.SerializableInfo.lenght(1),
        byte_serializer_1.SerializableInfo.bitOrder(byte_serializer_1.BitOrder.BE),
        byte_serializer_1.SerializableInfo.numberType(byte_serializer_1.NumberType.UInt8),
        __metadata("design:type", Number)
    ], DataExample.prototype, "number1", void 0);
    __decorate([
        byte_serializer_1.SerializableInfo.position(1),
        byte_serializer_1.SerializableInfo.lenght(2),
        byte_serializer_1.SerializableInfo.bitOrder(byte_serializer_1.BitOrder.BE),
        byte_serializer_1.SerializableInfo.numberType(byte_serializer_1.NumberType.Int16),
        __metadata("design:type", Number)
    ], DataExample.prototype, "number2", void 0);
    return DataExample;
}(byte_serializer_1.Serializable));
var DataExample2 = /** @class */ (function (_super) {
    __extends(DataExample2, _super);
    function DataExample2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        byte_serializer_1.SerializableInfo.position(0),
        byte_serializer_1.SerializableInfo.lenght(1),
        byte_serializer_1.SerializableInfo.bitOrder(byte_serializer_1.BitOrder.BE),
        byte_serializer_1.SerializableInfo.numberType(byte_serializer_1.NumberType.UInt8),
        __metadata("design:type", Number)
    ], DataExample2.prototype, "number1", void 0);
    __decorate([
        byte_serializer_1.SerializableInfo.position(1),
        byte_serializer_1.SerializableInfo.lenght(2),
        byte_serializer_1.SerializableInfo.bitOrder(byte_serializer_1.BitOrder.BE),
        byte_serializer_1.SerializableInfo.numberType(byte_serializer_1.NumberType.Int16),
        __metadata("design:type", Number)
    ], DataExample2.prototype, "number2", void 0);
    __decorate([
        byte_serializer_1.SerializableInfo.position(3),
        byte_serializer_1.SerializableInfo.lenght(3),
        byte_serializer_1.SerializableInfo.nested(DataExample),
        __metadata("design:type", DataExample)
    ], DataExample2.prototype, "data", void 0);
    return DataExample2;
}(byte_serializer_1.Serializable));
describe("Proprieta' di tipo numerico", function () {
    it('Oggetto semplice: solo serializzazione', function () {
        var data = new DataExample();
        data.number1 = 50;
        data.number2 = 0;
        var serialized = data.serialize();
        chai_1.expect(serialized[0]).to.deep.equal(data.number1);
    });
    it('Oggetto semplice', function () {
        var data = new DataExample();
        data.number1 = 50;
        data.number2 = 2000;
        var serialized = data.serialize();
        var rv = new DataExample();
        rv.deserialize(serialized);
        chai_1.expect(rv).to.deep.equal(data);
    });
    it('Oggetto complesso', function () {
        var data = new DataExample();
        data.number1 = 50;
        data.number2 = 2000;
        var data2 = new DataExample2();
        data2.number1 = 129;
        data2.number2 = 678;
        data2.data = data;
        var serialized = data2.serialize();
        var rv = new DataExample2();
        rv.deserialize(serialized);
        chai_1.expect(rv).to.deep.equal(data2);
    });
});
//# sourceMappingURL=test1-numbers.spec.js.map