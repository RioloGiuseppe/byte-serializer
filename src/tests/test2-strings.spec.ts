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
    @SerializableInfo.textEncoding(TextEncoding.ASCII)
    public Text :string;
}

describe("Proprieta' di tipo stringa", () => {

  it('Oggetto semplice e stringa di lunghezza giusta', () => {

    let data = new DataExample();
    data.Text = "qwertyuiop"; 

    let serialized = data.serialize();

    let rv = new DataExample();
    rv.deserialize(serialized);

    expect(rv).to.deep.equal(data);
  });

  it('Oggetto semplice e stringa di lunghezza superiore (troncamento)', () => {

    let data = new DataExample();
    data.Text = "qwertyuiopasdfghjkl"; 

    let serialized = data.serialize();

    let rv = new DataExample();
    rv.deserialize(serialized);

    expect(rv.Text).to.deep.equal(data.Text.substring(0,10));
  });

  it('Oggetto semplice e stringa di lunghezza inferiore', () => {

    let data = new DataExample();
    data.Text = "qwerty"; 

    let serialized = data.serialize();

    let rv = new DataExample();
    rv.deserialize(serialized);

    expect(rv).to.deep.equal(data);
  });

});