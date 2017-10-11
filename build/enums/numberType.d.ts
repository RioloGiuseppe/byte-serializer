/**
 * Used to define length and sign of number
 * @see {@link BitOrder} for more details about byte ordering
 */
export declare enum NumberType {
    /**
     * Refear a one byte - 8 bit - unsigned integer
     */
    UInt8 = 0,
    /**
     * Refear a one byte - 8 bit - signed integer
     */
    Int8 = 1,
    /**
     * Refear a two byte - 16 bit - unsigned integer
     */
    UInt16 = 2,
    /**
     * Refear a two byte - 16 bit - signed integer
     */
    Int16 = 3,
    /**
     * Refear a four byte - 32 bit - unsigned integer
     */
    UInt32 = 4,
    /**
     * Refear a four byte - 32 bit - signed integer
     */
    Int32 = 5,
    /**
     *  Refear a four byte - 32 bit - floating point
     */
    Float = 6,
    /**
     * Refear a four byte - 32 bit - floating point
     */
    Double = 7,
}
