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
     * @param length Define the name of the property of type CRC to compute crc @see {@link CRC}
     * @param startByte Define the position of the first byte of the output array to compute crc
     * @param lastByte Define the position of the last byte of the output array to compute crc
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