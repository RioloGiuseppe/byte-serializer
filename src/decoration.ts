import BitOrder from './enums/bitOrder'
import NumebrtType from './enums/numberType'
module Decoration {

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

    export function numberType(value : NumebrtType) {
        return function (target : any, propertyKey : string) : any {
            addMeta(target, propertyKey, "numberType", value);
        }
    }

    function addMeta(target : any, propertyKey : string, metaName : string, metaValue : any) {
        if (target && !target["_metaSerialize"]) {
            target["_metaSerialize"] = {};
        }
        if (!target["_metaSerialize"][propertyKey]) 
            target["_metaSerialize"][propertyKey] = {};
        target["_metaSerialize"][propertyKey][metaName] = metaValue;
    }
}

export default Decoration