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
        byte_serializer_1.SerializableInfo.lenght(10),
        byte_serializer_1.SerializableInfo.textEncoding(byte_serializer_1.TextEncoding.ASCII),
        __metadata("design:type", String)
    ], DataExample.prototype, "Text", void 0);
    return DataExample;
}(byte_serializer_1.Serializable));
describe("Proprieta' di tipo stringa", function () {
    it('Oggetto semplice e stringa di lunghezza giusta', function () {
        var data = new DataExample();
        data.Text = "qwertyuiop";
        var serialized = data.serialize();
        var rv = new DataExample();
        rv.deserialize(serialized);
        chai_1.expect(rv).to.deep.equal(data);
    });
    it('Oggetto semplice e stringa di lunghezza superiore (troncamento)', function () {
        var data = new DataExample();
        data.Text = "qwertyuiopasdfghjkl";
        var serialized = data.serialize();
        var rv = new DataExample();
        rv.deserialize(serialized);
        chai_1.expect(rv.Text).to.deep.equal(data.Text.substring(0, 10));
    });
    it('Oggetto semplice e stringa di lunghezza inferiore', function () {
        var data = new DataExample();
        data.Text = "qwerty";
        var serialized = data.serialize();
        var rv = new DataExample();
        rv.deserialize(serialized);
        chai_1.expect(rv).to.deep.equal(data);
    });
});
//# sourceMappingURL=test2-strings.spec.js.map