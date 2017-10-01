import CommonMetadata from './commonMetadata'
import BitOrder from './../enums/bitOrder'
import NumberType from './../enums/numberType'

interface NumberMetadata extends CommonMetadata {
    bitOrder : BitOrder
    numberType : NumberType
}

export default NumberMetadata;