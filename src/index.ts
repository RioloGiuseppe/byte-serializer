import A from './samples/DataExample'
let a = new A();

a.Pippo = 50;
a.Pluto = 2000;
a.Text = "una stringa";
let arr = a.serialize()

console.log(arr)
