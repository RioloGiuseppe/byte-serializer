/// <reference types="node" />
import { CommonMetadata } from './../interfaces/commonMetadata';
/**
 * Define the structure of the serializable payload and embed the main methods to transform array in to object and vice versa.
 */
export declare abstract class Serializable {
    /**
    * Return the serialization metadata for current type
    */
    readonly serializeMetadata: CommonMetadata[];
    /**
     * Return the additional metadata for current message type configuration
     */
    readonly messageMetadata: CommonMetadata[];
    /**
     * Return the length of entire buffer
     */
    readonly bufferLength: number;
    /**
     * Return a buffer that contains all data information stored in properties of the current instance of the object
     */
    serialize(): Buffer;
    /**
     * Set values of properties from a buffer
     */
    deserialize(buffer: Buffer): void;
}
