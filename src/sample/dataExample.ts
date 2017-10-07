import {SerializerInfo} from './../serializer/serializerInfo'
import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'
import {TextEncoding} from './../enums/textEncoding'
import {Serializable} from './../serializer/serializable'
/**
 * @ignore
 */
export class DataExample extends Serializable {
    @SerializerInfo.position(0)
    @SerializerInfo.lenght(4)
    @SerializerInfo.bitOrder(BitOrder.BE)
    @SerializerInfo.numberType(NumberType.Int32)
    public Pippo:number;


    @SerializerInfo.position(4)
    @SerializerInfo.lenght(2)
    @SerializerInfo.bitOrder(BitOrder.BE)
    @SerializerInfo.numberType(NumberType.Int16)
    public Pluto :number;

    @SerializerInfo.position(6)
    @SerializerInfo.lenght(10)
    @SerializerInfo.textEncoding(TextEncoding.ASCII)
    public Text :string;

}
