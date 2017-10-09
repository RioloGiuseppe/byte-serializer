import {Serializable} from './../serializer/serializable'
import {CRC, CRCMetadata} from '../interfaces/crc'
import {EndMetadata} from './../interfaces/endMetadata'
import {} from 'node'

/**
 * Define the main data structure to manage the sendable message in a noisy channel
 */
export abstract class Message extends Serializable {
    public abstract start:number
    public abstract data: Buffer;
    public abstract end:number | null;
    public abstract CRC:CRC;
   
    /**
     * Return information about CRC base settings
     */
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

    /**
     * Return informations about the last message byte
     */
    public get endInfo():EndMetadata{
        let msgs = this.messageMetadata;
        let endInfo:EndMetadata;
        if(msgs.length>0){
            let end =<any>msgs.find(o=>(<any>o).lastChar !== undefined);
            endInfo ={enable:end.lastChar, name:end.name};
        }
        return endInfo;
    }

    /**
     * Return the message length
     */
    public get length():number{
        let metas = this.serializeMetadata;
        let crcInfo = this.crcInfo;
        let last = metas[metas.length - 1]
        return last.position + last.length -2;
    }

    /**
     * Return the length of entire buffer
     */
    public get bufferLength(): number{
        let metas = this.serializeMetadata;
        let crcInfo = this.crcInfo;
        let endInfo = this.endInfo;
        let last = metas[metas.length - 1]
        let len = last.position + last.length;
        if(crcInfo && crcInfo.length)
            len+=crcInfo.length;
        if(endInfo && endInfo.enable)
            len+=1;
        return len;
    }
}