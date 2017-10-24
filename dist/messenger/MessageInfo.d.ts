import { CrcLength } from './../enums/crcLength';
/**
 * Contains main decorator for properties of message derived class
 */
export declare module MessageInfo {
    /**
     * Add one byte at the end of message. Is used to set the closure of message.
     * Default off.
     * @param value If true enable end byte
     */
    function enableLastChar(value?: boolean): (target: any, propertyKey: string) => void;
    /**
     * Enable the CRC check of message.
     * @param length Define the name of the property of type CRC to compute crc @see {@link CRC}
     * @param startByte Define the position of the first byte of the output array to compute crc
     * @param lastByte Define the position of the last byte of the output array to compute crc
     */
    function enableCRC(length: CrcLength, startByte: number, lastByte: number): (target: any, propertyKey: string) => void;
}
