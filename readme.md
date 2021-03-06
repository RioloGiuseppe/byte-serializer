# byte-serializer

![Support Node of LTS](https://img.shields.io/badge/node-LTS-brightgreen.svg?style=plastic) ![npm version](https://img.shields.io/badge/npm-5.3.0-brightgreen.svg?style=plastic) ![Build passing](https://img.shields.io/badge/build-passing-brightgreen.svg?style=plastic) ![dependencies rf24 nan](https://img.shields.io/badge/dependencies-typescript-blue.svg?style=plastic) ![License mit](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)

---

# Description
The main purpose of this library is create a small and reusable serialization engine able to manage serial message protocol. The use of property decorators has allowed to reduce serialization/deserialization to a loop around properties metadata obtained at initialization time. The module has two model: one for data and another one for messages.<br>
Data model is made to allow data (de)serialization, message module to allow to send/receive datas. Both work with buffer (byte array) and Message model is a specialization of Data model.


# How to use

### Install dependencies:
The main dependencie of this module is **typescript** compiler **tsc**.
```sh
npm install -g typescript
```
### Import in node js
Include the lib in your project simply run:
```sh
npm install byte-serializer
```

### Use in your project

After the library were added in your project, you have to import some modules dependencies:
- TextEncoding: _enum_
- NumberType: _enum_
- BitOrder: _enum_
- CrcLength: _enum_
- PropertyType: _enum_
- CRC: _interface_
- Serializable: _abstract class_
- Message: _abstract class_
- MessageInfo: _decorators module_
- SerializerInfo: _decorators module_

To create a _serializable payload_ you have to **extends** imported type serializable and then use decorators contained in SerializerInfo to define position, length, type and data specification of properties you have inside.

A _serializable payload_ is just an object that can be serialized in a byte array (buffer). If you want to send, or receive, the paylod you have to add some metadatas such as start byte, expected length (or just length), id, crc and abviously data. You can choose to add a end byte to mark the end of message. For this pourpose you have to extend abstract class Message.

#### Define a payload
```ts
import {Serializable, SerializerInfo, BitOrder, NumberType, TextEncoding} from 'byte-serializer'

export class DataExample extends Serializable {
    @SerializerInfo.position(0)
    @SerializerInfo.length(4)
    @SerializerInfo.bitOrder(BitOrder.BE)
    @SerializerInfo.numberType(NumberType.Int32)
    public Pippo:number;

    @SerializerInfo.position(4)
    @SerializerInfo.length(2)
    @SerializerInfo.bitOrder(BitOrder.BE)
    @SerializerInfo.numberType(NumberType.Int16)
    public Pluto :number;

    @SerializerInfo.position(6)
    @SerializerInfo.length(10)
    @SerializerInfo.textEncoding(TextEncoding.ASCII)
    public Text :string;
}
```

> Use the constructor to initialize data.
#### Create a message
```ts
let data = new DataExample();
data.Number1 = 50;
data.Number2 = 2000;
data.Text = "A long string"; // More the 10 chars
```

#### Serialize a message
```ts
let payload = data.serialize();
```

#### Deserialize a message
```ts
let newData = new DataExample();
newData.deserialize(payload);
```