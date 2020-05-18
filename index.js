"use strict";
/**
 * Created by user on 2020/5/18.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFromRecord = exports.keyFromRecord = void 0;
function defaultHandler(key) {
    var _a;
    return (_a = key === null || key === void 0 ? void 0 : key.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(key);
}
function keyFromRecord(key, record, options) {
    if (typeof record[key] === 'undefined') {
        if (typeof key === 'string') {
            const { handleKey = defaultHandler } = options;
            const keys = Object.keys(record);
            // @ts-ignore
            key = key.toLowerCase();
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
function getFromRecord(key, record, options) {
    return record[keyFromRecord(key, record, options)];
}
exports.getFromRecord = getFromRecord;
exports.default = getFromRecord;
//# sourceMappingURL=index.js.map