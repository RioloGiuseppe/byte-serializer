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
var serializable_1 = require("../serializer/serializable");
var serializableInfo_1 = require("../serializer/serializableInfo");
var bitOrder_1 = require("../enums/bitOrder");
var numberType_1 = require("../enums/numberType");
var DataExample = /** @class */ (function (_super) {
    __extends(DataExample, _super);
    function DataExample() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        serializableInfo_1.SerializableInfo.position(0),
        serializableInfo_1.SerializableInfo.lenght(10),
        serializableInfo_1.SerializableInfo.nestedNumberArray(numberType_1.NumberType.UInt8, bitOrder_1.BitOrder.BE),
        __metadata("design:type", Array)
    ], DataExample.prototype, "array", void 0);
    return DataExample;
}(serializable_1.Serializable));
describe("Proprieta' di tipo array", function () {
    it('Oggetto semplice: numerico', function () {
        var data = new DataExample();
        data.array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var serialized = data.serialize();
        console.log(serialized[0]);
        var rv = new DataExample();
        rv.deserialize(serialized);
        chai_1.expect(rv).to.deep.equal(data);
    });
});
//# sourceMappingURL=test3-arrays.spec.js.map