import {SerializableInfo} from './../serializer/serializableInfo'
import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'
import {TextEncoding} from './../enums/textEncoding'
import {Serializable} from './../serializer/serializable'
/**
 * @ignore
 */
export class DataExample extends Serializable {
    @SerializableInfo.position(0)
    @SerializableInfo.lenght(4)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int32)
    public Pippo:number;


    @SerializableInfo.position(4)
    @SerializableInfo.lenght(2)
    @SerializableInfo.bitOrder(BitOrder.BE)
    @SerializableInfo.numberType(NumberType.Int16)
    public Pluto :number;

    @SerializableInfo.position(6)
    @SerializableInfo.lenght(10)
    @SerializableInfo.textEncoding(TextEncoding.ASCII)
    public Text :string;

}
