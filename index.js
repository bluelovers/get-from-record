"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toRecordMap = exports.toRecord = exports.entriesOfRecord = exports.setRecordValue = exports.valueFromRecord = exports.keyFromRecord = exports.keysOfRecord = exports.defaultGetEntries = exports.checkUndefinedRecord = exports.defaultSetValue = exports.defaultGetValue = exports.defaultExistsKey = exports.defaultGetKeys = exports.defaultKeyHandler = void 0;
const ts_type_predicates_1 = require("ts-type-predicates");
function defaultKeyHandler(key) {
    return key === null || key === void 0 ? void 0 : key.toLowerCase();
}
exports.defaultKeyHandler = defaultKeyHandler;
function defaultGetKeys(record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.keys === 'function')) {
        return record.keys();
    }
    return Object.keys(record);
}
exports.defaultGetKeys = defaultGetKeys;
function defaultGetValue(key, record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.get === 'function')) {
        return record.get(key);
    }
    return record[key];
}
exports.defaultGetValue = defaultGetValue;
function defaultSetValue(value, key, record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.set === 'function')) {
        record.set(key, value);
    }
    else {
        record[key] = value;
    }
    return record;
}
exports.defaultSetValue = defaultSetValue;
function defaultGetEntries(record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.entries === 'function')) {
        return record.entries();
    }
    return Object.entries(record);
}
exports.defaultGetEntries = defaultGetEntries;
function defaultExistsKey(key, record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.has === 'function')) {
        return record.has(key);
    }
    // @ts-ignore
    return key in record;
}
exports.defaultExistsKey = defaultExistsKey;
function checkUndefinedRecord(record, options) {
    if (typeof record === 'undefined' || record === null) {
        if (options === null || options === void 0 ? void 0 : options.allowUndefinedRecord) {
            return true;
        }
        throw new TypeError(`Invalid record`);
    }
}
exports.checkUndefinedRecord = checkUndefinedRecord;
function keysOfRecord(record, options) {
    var _a;
    if (checkUndefinedRecord(record, options)) {
        return;
    }
    const getKeys = (_a = options === null || options === void 0 ? void 0 : options.getKeys) !== null && _a !== void 0 ? _a : defaultGetKeys;
    return getKeys(record);
}
exports.keysOfRecord = keysOfRecord;
/**
 * get first match key of record
 */
function keyFromRecord(key, record, options) {
    var _a, _b, _c;
    if (checkUndefinedRecord(record, options)) {
        return;
    }
    options = options !== null && options !== void 0 ? options : {};
    const existsKey = (_a = options.existsKey) !== null && _a !== void 0 ? _a : defaultExistsKey;
    if (!existsKey(key, record)) {
        if (typeof key === 'string') {
            const getKeys = (_b = options.getKeys) !== null && _b !== void 0 ? _b : defaultGetKeys;
            const keyHandler = (_c = options.handleKey) !== null && _c !== void 0 ? _c : defaultKeyHandler;
            let keys = getKeys(record);
            key = keyHandler(key);
            if (options.reverse) {
                // @ts-ignore
                keys = [...keys].reverse();
            }
            for (const _key of keys) {
                // @ts-ignore
                if (keyHandler(_key) === key) {
                    // @ts-ignore
                    return _key;
                }
            }
        }
    }
    else {
        // @ts-ignore
        return key;
    }
}
exports.keyFromRecord = keyFromRecord;
/**
 * get value of record with first match key
 */
function valueFromRecord(key, record, options) {
    var _a;
    if (checkUndefinedRecord(record, options)) {
        return;
    }
    const getValue = (_a = options === null || options === void 0 ? void 0 : options.getValue) !== null && _a !== void 0 ? _a : defaultGetValue;
    const _key = keyFromRecord(key, record, options);
    return getValue(_key, record);
}
exports.valueFromRecord = valueFromRecord;
function setRecordValue(value, key, record, options) {
    var _a;
    if (checkUndefinedRecord(record, options)) {
        return;
    }
    const setValue = (_a = options === null || options === void 0 ? void 0 : options.setValue) !== null && _a !== void 0 ? _a : defaultSetValue;
    const _key = keyFromRecord(key, record, options);
    return setValue(value, _key, record);
}
exports.setRecordValue = setRecordValue;
function entriesOfRecord(record, options) {
    var _a;
    if (checkUndefinedRecord(record, options)) {
        return;
    }
    const getEntries = (_a = options === null || options === void 0 ? void 0 : options.getEntries) !== null && _a !== void 0 ? _a : defaultGetEntries;
    return getEntries(record);
}
exports.entriesOfRecord = entriesOfRecord;
function toRecord(record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.entries === 'function')) {
        record = Object.fromEntries(entriesOfRecord(record));
    }
    return record;
}
exports.toRecord = toRecord;
function toRecordMap(record) {
    if ((0, ts_type_predicates_1.typeNarrowed)(record, typeof record.entries !== 'function')) {
        record = new Map(entriesOfRecord(record));
    }
    return record;
}
exports.toRecordMap = toRecordMap;
exports.default = valueFromRecord;
//# sourceMappingURL=index.js.map