import A from './samples/DataExample'
import M from './samples/messageExample'
let a = new A();

a.Pippo = 50;
a.Pluto = 2000;
a.Text = "una stringa";

let m = new M();
let arr = m.toBytes(a);

console.log(arr)
