import { ITSPropertyKey } from 'ts-type/lib/type/base';

export type IRecordLike<K extends ITSPropertyKey, V extends any> = Record<K, V> | Pick<Map<K, V>, "get">;
export type IKeyOfRecordLike<T extends IRecordLike<any, any>> = T extends Pick<Map<infer K, any>, "get"> ? K : T extends Record<infer K, any> ? K : never;
export type IExtractKeyOfRecordLike<D extends IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D>> = K extends IKeyOfRecordLike<D> ? K : IKeyOfRecordLike<D>;
export type IValueOfRecordLike<T extends IRecordLike<any, any>> = T extends Pick<Map<any, infer V>, "get"> ? V : T extends Record<any, infer V> ? V : never;
export type IValueOfRecordLikeByKey<D extends IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D>, V extends IValueOfRecordLike<D> = IValueOfRecordLike<D>> = D extends Pick<Map<any, infer V>, "get"> ? V : D extends Record<K, any> ? D[K] : V;
export type IKeyOfRecordLikeInput<D extends IRecordLike<any, any>> = IKeyOfRecordLike<D> | string;
export declare function defaultKeyHandler(key: any): string;
export declare function defaultGetKeys<K extends string>(record: unknown): Iterable<K>;
export declare function defaultGetValue<V>(key: any, record: unknown): V;
export declare function defaultSetValue<D extends IRecordLike<any, any>, V>(value: V, key: any, record: D): D;
export declare function defaultGetEntries<K, V>(record: unknown): Iterable<[
	K,
	V
]>;
export declare function defaultExistsKey(key: any, record: unknown): boolean;
export declare function checkUndefinedRecord(record: unknown, options?: IOptions): record is void;
export interface IOptions {
	handleKey?(key: string): string;
	getKeys?<T extends string>(record: unknown): Iterable<T>;
	getValue?<T>(key: any, record: unknown): T;
	setValue?<D, V>(value: V, key: any, record: D): D;
	getEntries?<K, V>(record: unknown): Iterable<[
		K,
		V
	]>;
	existsKey?(key: any, record: unknown): boolean;
	reverse?: boolean;
	allowUndefinedRecord?: boolean;
}
export declare function keysOfRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(record: D, options?: IOptions): Iterable<K>;
/**
 * get first match key of record
 */
export declare function keyFromRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(key: K, record: D, options?: IOptions): IExtractKeyOfRecordLike<D, K>;
/**
 * get value of record with first match key
 */
export declare function valueFromRecord<V = never, D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(key: K, record: D, options?: IOptions): [
	V
] extends [
	never
] ? IValueOfRecordLikeByKey<D, K> : V;
export declare function setRecordValue<V, D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(value: V, key: K, record: D, options?: IOptions): D;
export declare function entriesOfRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>, V extends IValueOfRecordLike<D> = IValueOfRecordLike<D>>(record: D, options?: IOptions): Iterable<[
	K,
	V
]>;
export declare function toRecord<K extends ITSPropertyKey, V extends any>(record: IRecordLike<K, V>): Record<K, V>;
export declare function toRecordMap<K extends ITSPropertyKey, V extends any>(record: IRecordLike<K, V>): Map<K, V>;

export {
	valueFromRecord as default,
};

export {};
