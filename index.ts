import { typeNarrowed } from 'ts-type-predicates';
import { ITSPropertyKey } from 'ts-type';

export type IRecordLike<K extends ITSPropertyKey, V extends any> = Record<K, V> | Pick<Map<K, V>, 'get'>;

export type IKeyOfRecordLike<T extends IRecordLike<any, any>> = T extends Pick<Map<infer K, any>, 'get'> ? K : T extends
Record<infer K, any> ? K : never;

export type IExtractKeyOfRecordLike<D extends IRecordLike<any, any>, K extends IKeyOfRecordLike<D> | string> = K extends IKeyOfRecordLike<D> ? K : IKeyOfRecordLike<D>;

export type IValueOfRecordLike<T extends IRecordLike<any, any>> = T extends Pick<Map<any, infer V>, 'get'> ? V : T extends
Record<any, infer V> ? V : never;

export type IKeyOfRecordLikeInput<D extends IRecordLike<any, any>> = IKeyOfRecordLike<D> | string;

function defaultKeyHandler(key: any): string
{
	return key?.toLowerCase()
}

function defaultGetKeys<K extends string>(record: unknown): Iterable<K>
{
	if (typeNarrowed<Map<any, any>>(record, typeof (record as Map<any, any>).keys === 'function'))
	{
		return record.keys();
	}

	return Object.keys(record) as K[]
}

function defaultGetValue<V>(key: any, record: unknown): V
{
	if (typeNarrowed<Map<any, any>>(record, typeof (record as Map<any, any>).get === 'function'))
	{
		return record.get(key);
	}

	return record[key]
}

function defaultExistsKey(key: any, record: unknown): boolean
{
	if (typeNarrowed<Map<any, any>>(record, typeof (record as Map<any, any>).has === 'function'))
	{
		return record.has(key)
	}

	// @ts-ignore
	return key in record
}

function checkUndefinedRecord(record: unknown, options?: IOptions): record is void
{
	if (typeof record === 'undefined' || record === null)
	{
		if (options?.allowUndefinedRecord)
		{
			return true
		}

		throw new TypeError(`Invalid record`)
	}
}

export { defaultKeyHandler, defaultGetKeys, defaultExistsKey, defaultGetValue }

export interface IOptions
{
	handleKey?(key: string): string;
	getKeys?<T extends string>(record: unknown): Iterable<T>,
	getValue?<T>(key: any, record: unknown): T,
	existsKey?(key: any, record: unknown): boolean,

	reverse?: boolean,

	allowUndefinedRecord?: boolean,
}

/**
 * get first match key of record
 */
function keyFromRecord<D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(key: K,
	record: D,
	options?: IOptions,
): IExtractKeyOfRecordLike<D, K>
{
	if (checkUndefinedRecord(record, options))
	{
		return;
	}

	options = options ?? {};

	const existsKey = options.existsKey ?? defaultExistsKey;

	if (!existsKey(key, record))
	{
		if (typeof key === 'string')
		{
			const getKeys = options.getKeys ?? defaultGetKeys;
			const keyHandler = options.handleKey ?? defaultKeyHandler;

			let keys = getKeys(record);
			key = keyHandler(key) as any;

			if (options.reverse)
			{
				// @ts-ignore
				keys = [...keys].reverse()
			}

			for (const _key of keys)
			{
				// @ts-ignore
				if (keyHandler(_key) === key)
				{
					// @ts-ignore
					return _key
				}
			}
		}
	}
	else
	{
		// @ts-ignore
		return key
	}
}

/**
 * get value of record with first match key
 */
function valueFromRecord<V = never, D extends IRecordLike<any, any> = IRecordLike<any, any>, K extends IKeyOfRecordLikeInput<D> = IKeyOfRecordLike<D>>(key: K,
	record: D,
	options?: IOptions,
): V extends never ? D[IExtractKeyOfRecordLike<D, K>] : V
{
	if (checkUndefinedRecord(record, options))
	{
		return;
	}

	const getValue = options?.getValue ?? defaultGetValue;
	const _key = keyFromRecord(key, record, options);

	return getValue(_key, record)
}

export { keyFromRecord, valueFromRecord }

export default valueFromRecord
