import {Serializable} from './../serializer/serializable'
import {CRC, CRCMetadata} from '../interfaces/crc'
import {} from 'node'

export abstract class Message extends Serializable {
    public abstract start:number
    public abstract head: Buffer;
    public abstract data: Buffer;
    public abstract end:number | null;
    public abstract CRC:CRC;
   
    public get crcInfo():CRCMetadata{
        let msgs = this.messageMetadata;
        let crcInfo:CRCMetadata;
        if(msgs.length>0){
            let crc =<any>msgs.find(o=>(<any>o).crcInfo !== undefined);
            crcInfo = crc.crcInfo;
            crcInfo.name = crc.name;
        }
        return crcInfo;
    }

    public get length(): number{
        let metas = this.serializeMetadata;
        let crcInfo = this.crcInfo;
        let last = metas[metas.length - 1]
        let len = last.position + last.length;
        if(crcInfo && crcInfo.length)
            len+=crcInfo.length;
        return len;
    }
}