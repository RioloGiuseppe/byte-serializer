import {BitOrder,CRC,Message,MessageInfo,NumberType,Serializable,SerializerInfo,TextEncoding} from './../index';
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
let m2 = new MessageExample()
let ser = m.serialize();
m2.deserialize(ser);

console.log(ser);