/**
 * Define metadata for last char
 */
export interface EndMetadata {
    /**
     * Define if last char is enabled
     */
    enable: boolean;
    /**
     * Define the name of the property of type CRC to compute crc
     * @see {@link CRC}
     */
    name: string;
}
