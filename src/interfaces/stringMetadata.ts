import {CommonMetadata} from './commonMetadata'
import {TextEncoding} from './../enums/textEncoding'

/**
 * Define the interface to manupulate string metadata
 */
export interface StringMetadata extends CommonMetadata {
    /**
     * Define the encoder to read/write text
     * @see {link TextEncoding}
     */
    textEncoding : TextEncoding
}