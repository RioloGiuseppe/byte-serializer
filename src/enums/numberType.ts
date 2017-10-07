/**
 * Used to define length and sign of number
 * @see {@link BitOrder} for more details about byte ordering
 */
export enum NumberType {
    /**
     * Refear a one byte - 8 bit - unsigned integer
     */
    UInt8,

    /**
     * Refear a one byte - 8 bit - signed integer
     */
    Int8,
    
    /**
     * Refear a two byte - 16 bit - unsigned integer
     */
    UInt16,
    
    /**
     * Refear a two byte - 16 bit - signed integer
     */
    Int16,
    
    /**
     * Refear a four byte - 32 bit - unsigned integer
     */
    UInt32,
    
    /**
     * Refear a four byte - 32 bit - signed integer
     */
    Int32,
    
    /**
     *  Refear a four byte - 32 bit - floating point
     */
    Float,
    
    /**
     * Refear a four byte - 32 bit - floating point
     */
    Double
}