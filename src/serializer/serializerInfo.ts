import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'
import {TextEncoding} from './../enums/textEncoding'

/**
 * Contains main decorator for properties of all serializable object
 */
export module SerializerInfo {
    
    /**
     * Define the sequential order of bytes
     * @see {@link BitOrder}
     */
    export function bitOrder(value : BitOrder) {
        return function (target : any, propertyKey : string) : void {
            addMeta(target, propertyKey, "bitOrder", value);
        }
    }

    /**
     * Define the position in byte array of the property
     */
    export function lenght(value : number) {
        return function (target : any, propertyKey : string) : void {
            addMeta(target, propertyKey, "length", value);
        }
    }

    /**
     * Define the length of the property in byte
     */
    export function position(value : number) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "position", value);
        }
    }

    /**
     * Define the type and the length of numner
     * @see {@link NumberType}
     */
    export function numberType(value : NumberType) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "numberType", value);
        }
    }

    /**
     * Define the encoder to read/write text
     * @see {link TextEncoding}
     */
    export function textEncoding(value : TextEncoding) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "textEncoding", value);
        }
    }

    /**
     * Defines whether a property must be ignored in serialization
     */
    export function ingnoreSerialize(target : any, propertyKey : string) : any {
        addMeta(target, propertyKey, "ingnoreSerialize", true);
    }

    /**
     * Defines whether a property must be ignored in deserialization
     */
    export function ingnoreDeserialize(target : any, propertyKey : string) : any {
        addMeta(target, propertyKey, "ingnoreDeserialize", true);
    }
    
    /**
     * @ignore
     */
    function addMeta(target : any, propertyKey : string, metaName : string, metaValue : any) {
        if (target && !target["_metaSerialize"]) {
            target["_metaSerialize"] = {};
        }
        if (!target["_metaSerialize"][propertyKey]) 
            target["_metaSerialize"][propertyKey] = {};
        target["_metaSerialize"][propertyKey][metaName] = metaValue;
    }
}