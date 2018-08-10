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
var FixedStringTest = /** @class */ (function (_super) {
    __extends(FixedStringTest, _super);
    function FixedStringTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        __1.SerializableInfo.position(0),
        __1.SerializableInfo.lenght(5),
        __1.SerializableInfo.textEncoding(__1.TextEncoding.ASCII),
        __metadata("design:type", String)
    ], FixedStringTest.prototype, "AsciiText", void 0);
    __decorate([
        __1.SerializableInfo.position(5),
        __1.SerializableInfo.lenght(5),
        __1.SerializableInfo.textEncoding(__1.TextEncoding.LATIN1),
        __metadata("design:type", String)
    ], FixedStringTest.prototype, "Latin1Text", void 0);
    __decorate([
        __1.SerializableInfo.position(10),
        __1.SerializableInfo.lenght(10),
        __1.SerializableInfo.textEncoding(__1.TextEncoding.UCS2),
        __metadata("design:type", String)
    ], FixedStringTest.prototype, "UCS2Text", void 0);
    __decorate([
        __1.SerializableInfo.position(20),
        __1.SerializableInfo.lenght(10),
        __1.SerializableInfo.textEncoding(__1.TextEncoding.UTF16LE),
        __metadata("design:type", String)
    ], FixedStringTest.prototype, "UTF16LEText", void 0);
    __decorate([
        __1.SerializableInfo.position(30),
        __1.SerializableInfo.lenght(5),
        __1.SerializableInfo.textEncoding(__1.TextEncoding.UTF8),
        __metadata("design:type", String)
    ], FixedStringTest.prototype, "UTF8Text", void 0);
    return FixedStringTest;
}(__1.Serializable));
exports.FixedStringTest = FixedStringTest;
//# sourceMappingURL=fixed-string-test.js.map