import { typeNarrowed } from 'ts-type-predicates';

function defaultKeyHandler(key) {
  return key === null || key === void 0 ? void 0 : key.toLowerCase();
}

function defaultGetKeys(record) {
  if (typeNarrowed(record, typeof record.keys === 'function')) {
    return record.keys();
  }

  return Object.keys(record);
}

function defaultGetValue(key, record) {
  if (typeNarrowed(record, typeof record.get === 'function')) {
    return record.get(key);
  }

  return record[key];
}

function defaultSetValue(value, key, record) {
  if (typeNarrowed(record, typeof record.set === 'function')) {
    record.set(key, value);
  } else {
    record[key] = value;
  }

  return record;
}

function defaultGetEntries(record) {
  if (typeNarrowed(record, typeof record.entries === 'function')) {
    return record.entries();
  }

  return Object.entries(record);
}

function defaultExistsKey(key, record) {
  if (typeNarrowed(record, typeof record.has === 'function')) {
    return record.has(key);
  }

  return key in record;
}

function checkUndefinedRecord(record, options) {
  if (typeof record === 'undefined' || record === null) {
    if (options !== null && options !== void 0 && options.allowUndefinedRecord) {
      return true;
    }

    throw new TypeError(`Invalid record`);
  }
}

function keysOfRecord(record, options) {
  var _options$getKeys;

  if (checkUndefinedRecord(record, options)) {
    return;
  }

  const getKeys = (_options$getKeys = options === null || options === void 0 ? void 0 : options.getKeys) !== null && _options$getKeys !== void 0 ? _options$getKeys : defaultGetKeys;
  return getKeys(record);
}

function keyFromRecord(key, record, options) {
  var _options, _options$existsKey;

  if (checkUndefinedRecord(record, options)) {
    return;
  }

  options = (_options = options) !== null && _options !== void 0 ? _options : {};
  const existsKey = (_options$existsKey = options.existsKey) !== null && _options$existsKey !== void 0 ? _options$existsKey : defaultExistsKey;

  if (!existsKey(key, record)) {
    if (typeof key === 'string') {
      var _options$getKeys2, _options$handleKey;

      const getKeys = (_options$getKeys2 = options.getKeys) !== null && _options$getKeys2 !== void 0 ? _options$getKeys2 : defaultGetKeys;
      const keyHandler = (_options$handleKey = options.handleKey) !== null && _options$handleKey !== void 0 ? _options$handleKey : defaultKeyHandler;
      let keys = getKeys(record);
      key = keyHandler(key);

      if (options.reverse) {
        keys = [...keys].reverse();
      }

      for (const _key of keys) {
        if (keyHandler(_key) === key) {
          return _key;
        }
      }
    }
  } else {
    return key;
  }
}

function valueFromRecord(key, record, options) {
  var _options$getValue;

  if (checkUndefinedRecord(record, options)) {
    return;
  }

  const getValue = (_options$getValue = options === null || options === void 0 ? void 0 : options.getValue) !== null && _options$getValue !== void 0 ? _options$getValue : defaultGetValue;

  const _key = keyFromRecord(key, record, options);

  return getValue(_key, record);
}

function setRecordValue(value, key, record, options) {
  var _options$setValue;

  if (checkUndefinedRecord(record, options)) {
    return;
  }

  const setValue = (_options$setValue = options === null || options === void 0 ? void 0 : options.setValue) !== null && _options$setValue !== void 0 ? _options$setValue : defaultSetValue;

  const _key = keyFromRecord(key, record, options);

  return setValue(value, _key, record);
}

function entriesOfRecord(record, options) {
  var _options$getEntries;

  if (checkUndefinedRecord(record, options)) {
    return;
  }

  const getEntries = (_options$getEntries = options === null || options === void 0 ? void 0 : options.getEntries) !== null && _options$getEntries !== void 0 ? _options$getEntries : defaultGetEntries;
  return getEntries(record);
}

function toRecord(record) {
  if (typeNarrowed(record, typeof record.entries === 'function')) {
    record = Object.fromEntries(entriesOfRecord(record));
  }

  return record;
}

function toRecordMap(record) {
  if (typeNarrowed(record, typeof record.entries !== 'function')) {
    record = new Map(entriesOfRecord(record));
  }

  return record;
}

export { checkUndefinedRecord, valueFromRecord as default, defaultExistsKey, defaultGetEntries, defaultGetKeys, defaultGetValue, defaultKeyHandler, defaultSetValue, entriesOfRecord, keyFromRecord, keysOfRecord, setRecordValue, toRecord, toRecordMap, valueFromRecord };
//# sourceMappingURL=index.esm.mjs.map
