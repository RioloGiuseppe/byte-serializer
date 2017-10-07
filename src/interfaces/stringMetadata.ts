import {CommonMetadata} from './commonMetadata'
import {TextEncoding} from './../enums/textEncoding'

export interface StringMetadata extends CommonMetadata {
    textEncoding : TextEncoding
}