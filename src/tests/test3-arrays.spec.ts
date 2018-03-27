import { expect } from 'chai';
import 'mocha';
import { Serializable } from '../serializer/serializable'
import { SerializableInfo } from '../serializer/serializableInfo'
import { BitOrder } from '../enums/bitOrder'
import { NumberType } from '../enums/numberType'
import { TextEncoding } from '../enums/textEncoding'

class DataExample extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.lenght(10)
    @SerializableInfo.nestedNumberArray(NumberType.UInt8,BitOrder.BE)
    public array:Array<number>;
}

describe("Proprieta' di tipo array", () => {

  it('Oggetto semplice: numerico', () => {

    let data = new DataExample();
    data.array = [1,2,3,4,5,6,7,8,9,10];

    let serialized = data.serialize();

    console.log(serialized[0]);

    let rv = new DataExample();
    rv.deserialize(serialized);

    expect(rv).to.deep.equal(data);
  });

});