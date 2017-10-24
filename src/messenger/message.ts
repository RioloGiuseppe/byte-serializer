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
   
    private _crcInfo: CRCMetadata;
    private _endInfo:EndMetadata;


    /**
     * Return information about CRC base settings
     */
    public get crcInfo():CRCMetadata{
        if(this._crcInfo)
            return this._crcInfo;
        let msgs = this.messageMetadata;
        if(msgs.length>0){
            let crc =<any>msgs.find(o=>(<any>o).crcInfo !== undefined);
            this._crcInfo = crc.crcInfo;
            this._crcInfo.name = crc.name;
        }
        return this._crcInfo;
    }

    /**
     * Return informations about the last message byte
     */
    public get endInfo():EndMetadata{
        let msgs = this.messageMetadata;
        if(msgs.length>0){
            let end =<any>msgs.find(o=>(<any>o).lastChar !== undefined);
            this._endInfo ={enable:end.lastChar, name:end.name};
        }
        return this._endInfo;
    }

    /**
     * Return the message length
     */
    public get length():number{
        let that = <any>this;
        let metas = this.serializeMetadata;
        return metas.filter(o=>!o.ignoreSerialize).reduce(function(a,b){
            if(typeof(b.length)==="number") return a + b.length;
            else if(typeof(that[b.name].length)==="number") return a+ that[b.name].length;
            else throw "Invalid length for " + b.name + " field";
        },-2);
    }

    /**
     * Return the length of entire buffer
     */
    public get bufferLength(): number{
        let len = this.length + 2; 
        if(this.crcInfo && this.crcInfo.length) len+=this.crcInfo.length;
        if( this.endInfo &&  this.endInfo.enable) len+=1;
        return len;
    }
}