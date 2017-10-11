"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dataExample_1 = require("./dataExample");
var messageExample_1 = require("./messageExample");
var a = new dataExample_1.DataExample();
a.Pippo = 50;
a.Pluto = 2000;
a.Text = "una stringa";
var aBuffer = a.serialize();
var a2 = new dataExample_1.DataExample();
a2.deserialize(aBuffer);
var g = a2.Pippo;
var m = new messageExample_1.MessageExample();
var m2 = new messageExample_1.MessageExample();
var ser = m.serialize();
m2.deserialize(ser);
console.log(ser);
//# sourceMappingURL=sample.js.map