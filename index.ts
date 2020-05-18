/**
 * Created by user on 2020/5/18.
 */

function defaultHandler(key: string): string
{
	return key?.toLowerCase?.()
}

export interface IOptions
{
	handleKey?(key: string): string;
}

export function keyFromRecord<D extends Record<any, any>, K>(key: K, record: D, options?: IOptions): K extends keyof D ? K : keyof D
{
	if (typeof record[key] === 'undefined')
	{
		if (typeof key === 'string')
		{
			const { handleKey = defaultHandler } = options;

			const keys = Object.keys(record);
			// @ts-ignore
			key = key.toLowerCase();

			for (const _key of keys)
			{
				// @ts-ignore
				if (handleKey(_key) === key)
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

export function getFromRecord<V = never, D extends Record<any, any> = Record<any, any>, K = keyof D>(key: K,
	record: D,
	options?: IOptions,
): V extends never ? D[K extends keyof D ? K : keyof D] : V
{
	return record[keyFromRecord(key, record, options)]
}

export default getFromRecord
