import {ISerializable} from '../serializer/serializable'
import {CommonMetadata} from './commonMetadata'
import {PropertyType} from '../enums/propertyType'
import {NumberType} from '../enums/numberType'
import {BitOrder} from '../enums/bitOrder'
import {TextEncoding} from '../enums/textEncoding'

/**
 * Define the common interface for all types of serialization info
 */
export interface NestedMetadata extends CommonMetadata {
    nestedType:ISerializable|PropertyType;
    nestedSize:number;
    nestedNumber:NumberType
    nestedText:TextEncoding
    nestedBitOrder:BitOrder
}