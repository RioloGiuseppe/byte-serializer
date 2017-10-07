/**
 * Define the possiblities for the length of CRC
 */
export enum CrcLength {
    
    /**
     * Use one byte CRC - 8bit
     */
    CRC8 = 1,
    
    /**
     *  Use two byte CRC - 16bit
     */
    CRC16 = 2,

    /**
     * Use four byte CRC - 32bit
     */
    CRC32 = 4
}