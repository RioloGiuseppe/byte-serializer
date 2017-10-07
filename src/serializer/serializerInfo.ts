import {BitOrder} from './../enums/bitOrder'
import {NumberType} from './../enums/numberType'
import {TextEncoding} from './../enums/textEncoding'

export module SerializerInfo {
    export function bitOrder(value : BitOrder) {
        return function (target : any, propertyKey : string) : void {
            addMeta(target, propertyKey, "bitOrder", value);
        }
    }

    export function lenght(value : number) {
        return function (target : any, propertyKey : string) : void {
            addMeta(target, propertyKey, "length", value);
        }
    }

    export function position(value : number) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "position", value);
        }
    }

    export function numberType(value : NumberType) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "numberType", value);
        }
    }

    export function textEncoding(value : TextEncoding) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "textEncoding", value);
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