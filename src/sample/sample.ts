import {BitOrder,NumberType,Serializable,SerializableInfo,TextEncoding} from './../index';
import {DataExample} from './dataExample';
import {MessageExample} from './messageExample';



let a = new DataExample();

a.Pippo = 50;
a.Pluto = 2000;
a.Text = "una stringa";

let aBuffer = a.serialize();

let a2 = new DataExample();


a2.deserialize(aBuffer)

let g = a2.Pippo;

let m = new MessageExample();
m.head = new Buffer([0x01,0x02,0x03,0x04]);
m.data = new Buffer([0x05,0x06,0x07,0x08,0x09]);




let m2 = new MessageExample()
let ser = m.serialize();
m2.deserialize(ser);

console.log(ser);