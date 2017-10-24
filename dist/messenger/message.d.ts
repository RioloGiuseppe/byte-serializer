/// <reference types="node" />
import { Serializable } from './../serializer/serializable';
import { CRC, CRCMetadata } from '../interfaces/crc';
import { EndMetadata } from './../interfaces/endMetadata';
/**
 * Define the main data structure to manage the sendable message in a noisy channel
 */
export declare abstract class Message extends Serializable {
    abstract start: number;
    abstract data: Buffer;
    abstract end: number | null;
    abstract CRC: CRC;
    private _crcInfo;
    private _endInfo;
    /**
     * Return information about CRC base settings
     */
    readonly crcInfo: CRCMetadata;
    /**
     * Return informations about the last message byte
     */
    readonly endInfo: EndMetadata;
    /**
     * Return the message length
     */
    readonly length: number;
    /**
     * Return the length of entire buffer
     */
    readonly bufferLength: number;
}
