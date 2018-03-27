import { expect } from 'chai';
import 'mocha';
import { Serializable } from '../serializer/serializable'
import { SerializableInfo } from '../serializer/serializableInfo'
import { BitOrder } from '../enums/bitOrder'
import { NumberType } from '../enums/numberType'
import { TextEncoding } from '../enums/textEncoding'

class DataExample extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.lenght(1)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.UInt8)
    public number1:number;

    @SerializableInfo.position(1)
    @SerializableInfo.lenght(2)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int16)
    public number2 :number;
}

class DataExample2 extends Serializable {
  @SerializableInfo.position(0)
  @SerializableInfo.lenght(1)
  @SerializableInfo.bitOrder(BitOrder.BE)
  @SerializableInfo.numberType(NumberType.UInt8)
  public number1:number;

  @SerializableInfo.position(1)
  @SerializableInfo.lenght(2)
  @SerializableInfo.bitOrder(BitOrder.BE)
  @SerializableInfo.numberType(NumberType.Int16)
  public number2 :number;

  @SerializableInfo.position(3)
  @SerializableInfo.lenght(3)
  @SerializableInfo.nested(DataExample)
  public data: DataExample;
}

describe("Proprieta' di tipo numerico", () => {

  it('Oggetto semplice: solo serializzazione', () => {

    let data = new DataExample();
    data.number1 = 50;
    data.number2 = 0;

    let serialized = data.serialize();

    expect(serialized[0]).to.deep.equal(data.number1);
  });

  it('Oggetto semplice', () => {

    let data = new DataExample();
    data.number1 = 50;
    data.number2 = 2000;

    let serialized = data.serialize();

    let rv = new DataExample();
    rv.deserialize(serialized);

    expect(rv).to.deep.equal(data);
  });

  it('Oggetto complesso', () => {

    let data = new DataExample();
    data.number1 = 50;
    data.number2 = 2000;

    let data2 = new DataExample2();
    data2.number1 = 129;
    data2.number2 = 678;
    data2.data = data;

    let serialized = data2.serialize();

    let rv = new DataExample2();
    rv.deserialize(serialized);

    expect(rv).to.deep.equal(data2);
  });

});