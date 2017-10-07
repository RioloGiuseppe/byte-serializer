import {CommonMetadata} from './commonMetadata'
import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'

/**
 * Define the interface to manupulate number metadata
 */
export interface NumberMetadata extends CommonMetadata {
    /**
     * Define the sequential order of bytes
     * @see {@link BitOrder}
     */
    bitOrder : BitOrder

    /**
     * Define the type and the length of numner
     * @see {@link NumberType}
     */
    numberType : NumberType
}