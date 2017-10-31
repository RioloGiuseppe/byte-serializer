import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'
import {TextEncoding} from './../enums/textEncoding'
import {PropertyType} from './../enums/propertyType'
import {ISerializable} from './serializable'
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
            addMeta(target, propertyKey, "length", Math.abs(value));
            addMeta(target, propertyKey, "propertyType", PropertyType.Number);            
        }
    }

    /**
     * Define the type of property
     * @see {link TextEncoding}
     */
    export function propertyType(value : PropertyType) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "propertyType", value);
        }
    }

    /**
     * Define the encoder to read/write text
     * @see {link TextEncoding}
     */
    export function textEncoding(value : TextEncoding) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "textEncoding", value);
            addMeta(target, propertyKey, "propertyType", PropertyType.String);
        }
    }

    /**
     * Defines whether a property must be ignored in serialization
     */
    export function ignoreSerialize(target : any, propertyKey : string) : any {
        addMeta(target, propertyKey, "ignoreSerialize", true);
    }

    /**
     * Defines whether a property must be ignored in deserialization
     */
    export function ignoreDeserialize(target : any, propertyKey : string) : any {
        addMeta(target, propertyKey, "ignoreDeserialize", true);
    }

    export function nested(value : ISerializable) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "nestedType", value);
            addMeta(target, propertyKey, "propertyType", PropertyType.Object);
        }
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