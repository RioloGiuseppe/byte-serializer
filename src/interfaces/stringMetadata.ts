import CommonMetadata from './commonMetadata'
import TextEncoding from './../enums/textEncoding'

interface StringMetadata extends CommonMetadata {
    textEncoding : TextEncoding
}

export default StringMetadata;