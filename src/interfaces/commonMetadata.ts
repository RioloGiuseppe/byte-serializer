/**
 * Define the common interface for all types of serialization info
 */
export interface CommonMetadata {
    /**
     * Define the name of the property to serialize/deserialize
     */
    name : string
    /**
     * Define the position in byte array of the property
     */
    position : number
    /**
     * Define the length of the property in byte
     */
    length : number
}