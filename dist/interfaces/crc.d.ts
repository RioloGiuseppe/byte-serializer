/// <reference types="node" />
import { CrcLength } from './../enums/crcLength';
/**
 * Define the interface for CRC algorithm injection
 */
export interface CRC {
    compute(data: Array<number>): Buffer;
}
/**
 * Define metadata for crc
 */
export interface CRCMetadata {
    /**
     * Define the position of the first byte of the output array to compute crc
     */
    startByte: number;
    /**
     * Define the position of the last byte of the output array to compute crc
     */
    stopByte: CrcLength;
    /**
     * Define the length of crc
     */
    length: number;
    /**
     * Define the name of the property of type CRC to compute crc
     * @see {@link CRC}
     */
    name: string;
}
