import { typeNarrowed as e } from "ts-type-predicates";

function defaultKeyHandler(e) {
  return null == e ? void 0 : e.toLowerCase();
}

function defaultGetKeys(t) {
  return e(t, "function" == typeof t.keys) ? t.keys() : Object.keys(t);
}

function defaultGetValue(t, n) {
  return e(n, "function" == typeof n.get) ? n.get(t) : n[t];
}

function defaultSetValue(t, n, r) {
  return e(r, "function" == typeof r.set) ? r.set(n, t) : r[n] = t, r;
}

function defaultGetEntries(t) {
  return e(t, "function" == typeof t.entries) ? t.entries() : Object.entries(t);
}

function defaultExistsKey(t, n) {
  return e(n, "function" == typeof n.has) ? n.has(t) : t in n;
}

function checkUndefinedRecord(e, t) {
  if (null == e) {
    if (null != t && t.allowUndefinedRecord) return !0;
    throw new TypeError("Invalid record");
  }
}

function keysOfRecord(e, t) {
  var n;
  if (!checkUndefinedRecord(e, t)) return (null !== (n = null == t ? void 0 : t.getKeys) && void 0 !== n ? n : defaultGetKeys)(e);
}

function keyFromRecord(e, t, n) {
  var r, o;
  if (!checkUndefinedRecord(t, n)) {
    if ((null !== (o = (n = null !== (r = n) && void 0 !== r ? r : {}).existsKey) && void 0 !== o ? o : defaultExistsKey)(e, t)) return e;
    if ("string" == typeof e) {
      var u, d;
      const r = null !== (u = n.getKeys) && void 0 !== u ? u : defaultGetKeys, o = null !== (d = n.handleKey) && void 0 !== d ? d : defaultKeyHandler;
      let f = r(t);
      e = o(e), n.reverse && (f = [ ...f ].reverse());
      for (const t of f) if (o(t) === e) return t;
    }
  }
}

function valueFromRecord(e, t, n) {
  var r;
  if (!checkUndefinedRecord(t, n)) return (null !== (r = null == n ? void 0 : n.getValue) && void 0 !== r ? r : defaultGetValue)(keyFromRecord(e, t, n), t);
}

function setRecordValue(e, t, n, r) {
  var o;
  if (!checkUndefinedRecord(n, r)) return (null !== (o = null == r ? void 0 : r.setValue) && void 0 !== o ? o : defaultSetValue)(e, keyFromRecord(t, n, r), n);
}

function entriesOfRecord(e, t) {
  var n;
  if (!checkUndefinedRecord(e, t)) return (null !== (n = null == t ? void 0 : t.getEntries) && void 0 !== n ? n : defaultGetEntries)(e);
}

function toRecord(t) {
  return e(t, "function" == typeof t.entries) && (t = Object.fromEntries(entriesOfRecord(t))), 
  t;
}

function toRecordMap(t) {
  return e(t, "function" != typeof t.entries) && (t = new Map(entriesOfRecord(t))), 
  t;
}

export { checkUndefinedRecord, valueFromRecord as default, defaultExistsKey, defaultGetEntries, defaultGetKeys, defaultGetValue, defaultKeyHandler, defaultSetValue, entriesOfRecord, keyFromRecord, keysOfRecord, setRecordValue, toRecord, toRecordMap, valueFromRecord };
//# sourceMappingURL=index.esm.mjs.map
