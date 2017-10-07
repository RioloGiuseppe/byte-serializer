import {CrcLength} from './../enums/crcLength'
/**
 * Contains main decorator for properties of message derived class
 */
export module MessageInfo {
    /**
     * Add one byte at the end of message. Is used to set the closure of message.
     * Default off.
     * @param value If true enable end byte
     */
    export function enableLastChar(value : boolean = false) {
        return function (target : any, propertyKey : string) : void {
            addMeta(target, propertyKey, "lastChar", value);
        }
    }

    /**
     * Enable the CRC check of message.
     * @param length Define the length of CRC algorithm out
     * @param startByte Define the first byte of buffer to compute CRC
     * @param lastByte Define the first byte of buffer to compute CRC
     */
    export function enableCRC(length:CrcLength, startByte : number, lastByte:number) {
        return function (target : any, propertyKey : string) : void {
            addMeta(target, propertyKey, "crcInfo", { startByte:startByte,stopByte:lastByte,length:length});
        }
    }
    
    /**
     * @ignore
     */
    function addMeta(target : any, propertyKey : string, metaName : string, metaValue : any) {
        if (target && !target["_metaMessage"]) {
            target["_metaMessage"] = {};
        }
        if (!target["_metaMessage"][propertyKey]) 
            target["_metaMessage"][propertyKey] = {};
        target["_metaMessage"][propertyKey][metaName] = metaValue;
    }
}