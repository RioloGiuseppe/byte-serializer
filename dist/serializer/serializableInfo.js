"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var propertyType_1 = require("./../enums/propertyType");
/**
 * Contains main decorator for properties of all serializable object
 */
var SerializableInfo;
(function (SerializableInfo) {
    /**
     * Define the sequential order of bytes
     * @see {@link BitOrder}
     */
    function bitOrder(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "bitOrder", value);
        };
    }
    SerializableInfo.bitOrder = bitOrder;
    /**
     * Define the position in byte array of the property
     */
    function lenght(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "length", value);
        };
    }
    SerializableInfo.lenght = lenght;
    /**
     * Define the length of the property in byte
     */
    function position(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "position", value);
        };
    }
    SerializableInfo.position = position;
    /**
     * Define the type and the length of numner
     * @see {@link NumberType}
     */
    function numberType(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "numberType", value);
            addMeta(target, propertyKey, "length", Math.abs(value));
            addMeta(target, propertyKey, "propertyType", propertyType_1.PropertyType.Number);
        };
    }
    SerializableInfo.numberType = numberType;
    /**
     * Define the type of property
     * @see {link TextEncoding}
     */
    function propertyType(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "propertyType", value);
        };
    }
    SerializableInfo.propertyType = propertyType;
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
    SerializableInfo.textEncoding = textEncoding;
    /**
     * Defines whether a property must be ignored in serialization
     */
    function ignoreSerialize(target, propertyKey) {
        addMeta(target, propertyKey, "ignoreSerialize", true);
    }
    SerializableInfo.ignoreSerialize = ignoreSerialize;
    /**
     * Defines whether a property must be ignored in deserialization
     */
    function ignoreDeserialize(target, propertyKey) {
        addMeta(target, propertyKey, "ignoreDeserialize", true);
    }
    SerializableInfo.ignoreDeserialize = ignoreDeserialize;
    function nested(value) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "nestedType", value);
            addMeta(target, propertyKey, "propertyType", propertyType_1.PropertyType.Object);
        };
    }
    SerializableInfo.nested = nested;
    function nestedObjectArray(value, len) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "propertyType", propertyType_1.PropertyType.Array);
            addMeta(target, propertyKey, "nestedType", value);
            addMeta(target, propertyKey, "nestedSize", len);
        };
    }
    SerializableInfo.nestedObjectArray = nestedObjectArray;
    function nestedNumberArray(value, bitOrder) {
        return function (target, propertyKey) {
            addMeta(target, propertyKey, "propertyType", propertyType_1.PropertyType.Array);
            addMeta(target, propertyKey, "nestedType", propertyType_1.PropertyType.Number);
            addMeta(target, propertyKey, "nestedSize", Math.abs(value));
            addMeta(target, propertyKey, "nestedNumber", value);
            addMeta(target, propertyKey, "nestedBitOrder", bitOrder);
        };
    }
    SerializableInfo.nestedNumberArray = nestedNumberArray;
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
})(SerializableInfo = exports.SerializableInfo || (exports.SerializableInfo = {}));
//# sourceMappingURL=serializableInfo.js.map