/// <reference types="node" />
import { CommonMetadata } from '../interfaces/commonMetadata';
import { Defaults } from '../interfaces/defaults';
/**
 * Define the structure of the serializable payload and embed the main methods to transform array in to object and vice versa.
 */
export declare abstract class Serializable {
    static DefautSettings: Defaults;
    private _serializeMetadata?;
    private _messageMetadata?;
    private _bufferLength?;
    /**
    * Return the serialization metadata for current type
    */
    readonly serializeMetadata: CommonMetadata[];
    /**
     * Return the length of entire buffer
     */
    readonly bufferLength: number;
    /**
     * Return a buffer that contains all data information stored in properties of the current instance of the object
     */
    serialize(defs?: Defaults, err?: (e: Error) => void): Buffer;
    /**
     * Set values of properties from a buffer
     */
    deserialize(buffer: Buffer, defs?: Defaults, err?: (e: Error) => void): Serializable;
}
export interface ISerializable {
    new (): Serializable;
    prototype: any;
}
