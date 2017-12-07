import {Message} from './../messenger/message'
import {CRC} from './../interfaces/crc'
import {SerializableInfo} from './../serializer/serializableInfo'
import {MessageInfo} from './../messenger/messageInfo'
import {NumberType} from './../enums/numberType'
import {BitOrder} from './../enums/bitOrder'
import {PropertyType} from './../enums/propertyType'
import {} from 'node'
/**
 * @ignore
 */
export class MessageExample extends Message{
 
    @SerializableInfo.position(0)
    @SerializableInfo.numberType(NumberType.UInt8)
    @SerializableInfo.ignoreDeserialize
    public start:number

    @SerializableInfo.position(1) 
    @SerializableInfo.numberType(NumberType.UInt8)  
    @SerializableInfo.ignoreDeserialize  
    public length: number;

    @SerializableInfo.position(2)    
    @SerializableInfo.lenght(4)
    @SerializableInfo.propertyType(PropertyType.Buffer)
    public head: Buffer;
    
    @SerializableInfo.position(6)   
    //@SerializerInfo.lenght(5)
    @SerializableInfo.propertyType(PropertyType.Buffer)
    public data: Buffer

    @MessageInfo.enableLastChar(true)
    public end:number | null;
   
    @MessageInfo.enableCRC(2,2,10)
    public CRC:CRC;

    /**
     *
     */
    constructor() {
        super();
        this.start = 0x00;
        this.CRC = {
            compute:function(arr:Array<number>){
                return Buffer.from([0xFA,0xFB]);
            }
        }
        this.end = 0xFF;
    }
}