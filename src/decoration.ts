import BitOrder from './enums/bitOrder'
import 'reflect-metadata'

module Decoration {

    export function bitOrder(value : BitOrder) {
        return function (target : any, propertyKey : string) : void {
            if (target && !target["_metaSerialize"]) {
                target["_metaSerialize"] = {};
            }
            if (!target["_metaSerialize"][propertyKey]) 
                target["_metaSerialize"][propertyKey] = {};
            target["_metaSerialize"][propertyKey]["bitOrder"] = value;
        }
    }

    export function lenght(value : number) {
        return function (target : any, propertyKey : string) : void {
            if (target && !target["_metaSerialize"]) {
                target["_metaSerialize"] = {};
            }
            if (!target["_metaSerialize"][propertyKey]) 
                target["_metaSerialize"][propertyKey] = {};
            target["_metaSerialize"][propertyKey]["lenght"] = value;
        }
    }

    export function position(value : number) {
        return function (target : any, propertyKey : string) : any {
            if (target && !target["_metaSerialize"]) {
                target["_metaSerialize"] = {};
            }
            if (!target["_metaSerialize"][propertyKey]) 
                target["_metaSerialize"][propertyKey] = {};
            target["_metaSerialize"][propertyKey]["position"] = value;
        }
    }
}

export default Decoration