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
var serializerInfo_1 = require("./../serializer/serializerInfo");
var bitOrder_1 = require("./../enums/bitOrder");
var numberType_1 = require("./../enums/numberType");
var textEncoding_1 = require("./../enums/textEncoding");
var serializable_1 = require("./../serializer/serializable");
/**
 * @ignore
 */
var DataExample = /** @class */ (function (_super) {
    __extends(DataExample, _super);
    function DataExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        serializerInfo_1.SerializerInfo.position(0),
        serializerInfo_1.SerializerInfo.lenght(4),
        serializerInfo_1.SerializerInfo.bitOrder(bitOrder_1.BitOrder.BE),
        serializerInfo_1.SerializerInfo.numberType(numberType_1.NumberType.Int32),
        __metadata("design:type", Number)
    ], DataExample.prototype, "Pippo", void 0);
    __decorate([
        serializerInfo_1.SerializerInfo.position(4),
        serializerInfo_1.SerializerInfo.lenght(2),
        serializerInfo_1.SerializerInfo.bitOrder(bitOrder_1.BitOrder.BE),
        serializerInfo_1.SerializerInfo.numberType(numberType_1.NumberType.Int16),
        __metadata("design:type", Number)
    ], DataExample.prototype, "Pluto", void 0);
    __decorate([
        serializerInfo_1.SerializerInfo.position(6),
        serializerInfo_1.SerializerInfo.lenght(10),
        serializerInfo_1.SerializerInfo.textEncoding(textEncoding_1.TextEncoding.ASCII),
        __metadata("design:type", String)
    ], DataExample.prototype, "Text", void 0);
    return DataExample;
}(serializable_1.Serializable));
exports.DataExample = DataExample;
//# sourceMappingURL=dataExample.js.map