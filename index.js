"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueFromRecord = exports.keyFromRecord = void 0;
function defaultHandler(key) {
    var _a;
    return (_a = key === null || key === void 0 ? void 0 : key.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(key);
}
/**
 * get first match key of record
 */
function keyFromRecord(key, record, options) {
    var _a;
    if ((options === null || options === void 0 ? void 0 : options.allowUndefinedRecord) && typeof record === 'undefined') {
        return;
    }
    if (typeof record[key] === 'undefined') {
        if (typeof key === 'string') {
            options = options !== null && options !== void 0 ? options : {};
            const handleKey = (_a = options.handleKey) !== null && _a !== void 0 ? _a : defaultHandler;
            let keys = Object.keys(record);
            // @ts-ignore
            key = key.toLowerCase();
            if (options.reverse) {
                keys = keys.reverse();
            }
            for (const _key of keys) {
                // @ts-ignore
                if (handleKey(_key) === key) {
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
    if ((options === null || options === void 0 ? void 0 : options.allowUndefinedRecord) && typeof record === 'undefined') {
        return;
    }
    return record[keyFromRecord(key, record, options)];
}
exports.valueFromRecord = valueFromRecord;
exports.default = valueFromRecord;
//# sourceMappingURL=index.js.map