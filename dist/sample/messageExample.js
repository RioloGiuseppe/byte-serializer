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
var message_1 = require("./../messenger/message");
var serializerInfo_1 = require("./../serializer/serializerInfo");
var messageInfo_1 = require("./../messenger/messageInfo");
var numberType_1 = require("./../enums/numberType");
var propertyType_1 = require("./../enums/propertyType");
/**
 * @ignore
 */
var MessageExample = /** @class */ (function (_super) {
    __extends(MessageExample, _super);
    /**
     *
     */
    function MessageExample() {
        var _this = _super.call(this) || this;
        _this.start = 0x00;
        _this.CRC = {
            compute: function (arr) {
                return Buffer.from([0xFA, 0xFB]);
            }
        };
        _this.end = 0xFF;
        return _this;
    }
    __decorate([
        serializerInfo_1.SerializerInfo.position(0),
        serializerInfo_1.SerializerInfo.numberType(numberType_1.NumberType.UInt8),
        serializerInfo_1.SerializerInfo.ignoreDeserialize,
        __metadata("design:type", Number)
    ], MessageExample.prototype, "start", void 0);
    __decorate([
        serializerInfo_1.SerializerInfo.position(1),
        serializerInfo_1.SerializerInfo.numberType(numberType_1.NumberType.UInt8),
        serializerInfo_1.SerializerInfo.ignoreDeserialize,
        __metadata("design:type", Number)
    ], MessageExample.prototype, "length", void 0);
    __decorate([
        serializerInfo_1.SerializerInfo.position(2),
        serializerInfo_1.SerializerInfo.lenght(4),
        serializerInfo_1.SerializerInfo.propertyType(propertyType_1.PropertyType.Buffer),
        __metadata("design:type", Buffer)
    ], MessageExample.prototype, "head", void 0);
    __decorate([
        serializerInfo_1.SerializerInfo.position(6)
        //@SerializerInfo.lenght(5)
        ,
        serializerInfo_1.SerializerInfo.propertyType(propertyType_1.PropertyType.Buffer),
        __metadata("design:type", Buffer)
    ], MessageExample.prototype, "data", void 0);
    __decorate([
        messageInfo_1.MessageInfo.enableLastChar(true),
        __metadata("design:type", Object)
    ], MessageExample.prototype, "end", void 0);
    __decorate([
        messageInfo_1.MessageInfo.enableCRC(2, 2, 10),
        __metadata("design:type", Object)
    ], MessageExample.prototype, "CRC", void 0);
    return MessageExample;
}(message_1.Message));
exports.MessageExample = MessageExample;
//# sourceMappingURL=messageExample.js.map