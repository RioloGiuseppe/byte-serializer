/// <reference types="node" />
import { Message } from './../messenger/message';
import { CRC } from './../interfaces/crc';
/**
 * @ignore
 */
export declare class MessageExample extends Message {
    start: number;
    length: number;
    head: Buffer;
    data: Buffer;
    end: number | null;
    CRC: CRC;
    /**
     *
     */
    constructor();
}
