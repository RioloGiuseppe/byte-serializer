"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var propertyType_1 = require("./../enums/propertyType");
/**
 * Contains main decorator for properties of all serializable object
 */
var SerializerInfo;
(function (SerializerInfo) {
    /**
     * Define the sequential order of bytes
     * @see {@link BitOrder}
     */
    function bitOrder(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "bitOrder", value);
        };
    }
    SerializerInfo.bitOrder = bitOrder;
    /**
     * Define the position in byte array of the property
     */
    function lenght(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "length", value);
        };
    }
    SerializerInfo.lenght = lenght;
    /**
     * Define the length of the property in byte
     */
    function position(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "position", value);
        };
    }
    SerializerInfo.position = position;
    /**
     * Define the type and the length of numner
     * @see {@link NumberType}
     */
    function numberType(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "numberType", value);
            addMeta(target, propertyKey, "propertyType", propertyType_1.PropertyType.Number);
        };
    }
    SerializerInfo.numberType = numberType;
    /**
     * Define the type of property
     * @see {link TextEncoding}
     */
    function propertyType(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "propertyType", value);
        };
    }
    SerializerInfo.propertyType = propertyType;
    /**
     * Define the encoder to read/write text
     * @see {link TextEncoding}
     */
    function textEncoding(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "textEncoding", value);
            addMeta(target, propertyKey, "propertyType", propertyType_1.PropertyType.String);
        };
    }
    SerializerInfo.textEncoding = textEncoding;
    /**
     * Defines whether a property must be ignored in serialization
     */
    function ingnoreSerialize(target, propertyKey) {
        addMeta(target, propertyKey, "ingnoreSerialize", true);
    }
    SerializerInfo.ingnoreSerialize = ingnoreSerialize;
    /**
     * Defines whether a property must be ignored in deserialization
     */
    function ingnoreDeserialize(target, propertyKey) {
        addMeta(target, propertyKey, "ingnoreDeserialize", true);
    }
    SerializerInfo.ingnoreDeserialize = ingnoreDeserialize;
    /**
     * @ignore
     */
    function addMeta(target, propertyKey, metaName, metaValue) {
        if (target && !target["_metaSerialize"]) {
            target["_metaSerialize"] = {};
        }
        if (!target["_metaSerialize"][propertyKey])
            target["_metaSerialize"][propertyKey] = {};
        target["_metaSerialize"][propertyKey][metaName] = metaValue;
    }
})(SerializerInfo = exports.SerializerInfo || (exports.SerializerInfo = {}));
//# sourceMappingURL=serializerInfo.js.map