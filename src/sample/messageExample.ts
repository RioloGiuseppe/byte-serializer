import {Message} from './../messenger/message'
import {CRC} from './../interfaces/crc'
import {SerializerInfo} from './../serializer/serializerInfo'
import {MessageInfo} from './../messenger/messageInfo'
import {NumberType} from './../enums/numberType'
import {BitOrder} from './../enums/bitOrder'
import {} from 'node'
/**
 * @ignore
 */
export class MessageExample extends Message{
 
    @SerializerInfo.position(0)
    @SerializerInfo.numberType(NumberType.UInt8)
    public start:number

    @SerializerInfo.position(1) 
    @SerializerInfo.numberType(NumberType.UInt8)  
    public length: number;

    @SerializerInfo.position(2)    
    @SerializerInfo.lenght(4)
    public head: number[];
    
    @SerializerInfo.position(2)   
    @SerializerInfo.lenght(10)
    public data: Buffer

    @MessageInfo.enableLastChar()
    public end:number | null;
   
    @MessageInfo.enableCRC(2,1,20)
    public CRC:CRC;

    /**
     *
     */
    constructor() {
        super();
        this.start = 0x00;
        this.head = [0x01,0x02,0x03,0x04];
        this.data = new Buffer([0x05,0x06,0x07,0x08,0x09]);
        this.CRC = {
            compute:function(arr:Array<number>){
                return [0xFA,0xFB];
            }
        }
    }

}