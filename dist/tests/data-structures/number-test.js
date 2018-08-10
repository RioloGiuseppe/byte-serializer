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
var __1 = require("../..");
var NumberTest = /** @class */ (function (_super) {
    __extends(NumberTest, _super);
    function NumberTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        __1.SerializableInfo.position(0),
        __1.SerializableInfo.numberType(__1.NumberType.UInt8),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "uint8", void 0);
    __decorate([
        __1.SerializableInfo.position(1),
        __1.SerializableInfo.numberType(__1.NumberType.Int8),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "int8", void 0);
    __decorate([
        __1.SerializableInfo.position(2),
        __1.SerializableInfo.bitOrder(__1.BitOrder.BE),
        __1.SerializableInfo.numberType(__1.NumberType.UInt16),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "uint16be", void 0);
    __decorate([
        __1.SerializableInfo.position(4),
        __1.SerializableInfo.bitOrder(__1.BitOrder.BE),
        __1.SerializableInfo.numberType(__1.NumberType.Int16),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "int16be", void 0);
    __decorate([
        __1.SerializableInfo.position(6),
        __1.SerializableInfo.bitOrder(__1.BitOrder.LE),
        __1.SerializableInfo.numberType(__1.NumberType.UInt16),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "uint16le", void 0);
    __decorate([
        __1.SerializableInfo.position(8),
        __1.SerializableInfo.bitOrder(__1.BitOrder.LE),
        __1.SerializableInfo.numberType(__1.NumberType.Int16),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "int16le", void 0);
    __decorate([
        __1.SerializableInfo.position(10),
        __1.SerializableInfo.bitOrder(__1.BitOrder.BE),
        __1.SerializableInfo.numberType(__1.NumberType.UInt32),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "uint32be", void 0);
    __decorate([
        __1.SerializableInfo.position(14),
        __1.SerializableInfo.bitOrder(__1.BitOrder.BE),
        __1.SerializableInfo.numberType(__1.NumberType.Int32),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "int32be", void 0);
    __decorate([
        __1.SerializableInfo.position(18),
        __1.SerializableInfo.bitOrder(__1.BitOrder.LE),
        __1.SerializableInfo.numberType(__1.NumberType.UInt32),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "uint32le", void 0);
    __decorate([
        __1.SerializableInfo.position(22),
        __1.SerializableInfo.bitOrder(__1.BitOrder.LE),
        __1.SerializableInfo.numberType(__1.NumberType.Int32),
        __metadata("design:type", Number)
    ], NumberTest.prototype, "int32le", void 0);
    return NumberTest;
}(__1.Serializable));
exports.NumberTest = NumberTest;
//# sourceMappingURL=number-test.js.map