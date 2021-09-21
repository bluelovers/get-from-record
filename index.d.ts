import { ITSPropertyKey } from 'ts-type';
export declare type IRecordLike<K extends ITSPropertyKey, V extends any> = Record<K, V> | Pick<Map<K, V>, 'get'>;
export declare type IKeyOfRecordLike<T extends IRecordLike<any, any>> = T extends Pick<Map<infer K, any>, 'get'> ? K : T extends Record<infer K, any> ? K : never;
export declare type IExtractKeyOfRecordLike<D extends IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D>> = K extends IKeyOfRecordLike<D> ? K : IKeyOfRecordLike<D>;
export declare type IValueOfRecordLike<T extends IRecordLike<any, any>> = T extends Pick<Map<any, infer V>, 'get'> ? V : T extends Record<any, infer V> ? V : never;
export declare type IValueOfRecordLikeByKey<D extends IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D>, V extends IValueOfRecordLike<D> = IValueOfRecordLike<D>> = D extends Pick<Map<any, infer V>, 'get'> ? V : D extends Record<K, any> ? D[K] : V;
export declare type IKeyOfRecordLikeInput<D extends IRecordLike<any, any>> = IKeyOfRecordLike<D> | string;
declare function defaultKeyHandler(key: any): string;
declare function defaultGetKeys<K extends string>(record: unknown): Iterable<K>;
declare function defaultGetValue<V>(key: any, record: unknown): V;
declare function defaultSetValue<D extends IRecordLike<any, any>, V>(value: V, key: any, record: D): D;
declare function defaultGetEntries<K, V>(record: unknown): Iterable<[K, V]>;
declare function defaultExistsKey(key: any, record: unknown): boolean;
declare function checkUndefinedRecord(record: unknown, options?: IOptions): record is void;
export { defaultKeyHandler, defaultGetKeys, defaultExistsKey, defaultGetValue, defaultSetValue, checkUndefinedRecord, defaultGetEntries, };
export interface IOptions {
    handleKey?(key: string): string;
    getKeys?<T extends string>(record: unknown): Iterable<T>;
    getValue?<T>(key: any, record: unknown): T;
    setValue?<D, V>(value: V, key: any, record: D): D;
    getEntries?<K, V>(record: unknown): Iterable<[K, V]>;
    existsKey?(key: any, record: unknown): boolean;
    reverse?: boolean;
    allowUndefinedRecord?: boolean;
}
declare function keysOfRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(record: D, options?: IOptions): Iterable<K>;
/**
 * get first match key of record
 */
declare function keyFromRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(key: K, record: D, options?: IOptions): IExtractKeyOfRecordLike<D, K>;
/**
 * get value of record with first match key
 */
declare function valueFromRecord<V = never, D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(key: K, record: D, options?: IOptions): [V] extends [never] ? IValueOfRecordLikeByKey<D, K> : V;
declare function setRecordValue<V, D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(value: V, key: K, record: D, options?: IOptions): D;
declare function entriesOfRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>, V extends IValueOfRecordLike<D> = IValueOfRecordLike<D>>(record: D, options?: IOptions): Iterable<[K, V]>;
declare function toRecord<K extends ITSPropertyKey, V extends any>(record: IRecordLike<K, V>): Record<K, V>;
declare function toRecordMap<K extends ITSPropertyKey, V extends any>(record: IRecordLike<K, V>): Map<K, V>;
export { keysOfRecord, keyFromRecord, valueFromRecord, setRecordValue, entriesOfRecord, toRecord, toRecordMap, };
export default valueFromRecord;
