function defaultHandler(key: string): string
{
	return key?.toLowerCase?.()
}

export interface IOptions
{
	handleKey?(key: string): string;

	reverse?: boolean,

	allowUndefinedRecord?: boolean,
}

/**
 * get first match key of record
 */
export function keyFromRecord<D extends Record<any, any>, K extends keyof D | string>(key: K, record: D, options?: IOptions): K extends keyof D
	? K
	: keyof D
{
	if (options?.allowUndefinedRecord && typeof record === 'undefined')
	{
		return;
	}

	if (typeof record[key] === 'undefined')
	{
		if (typeof key === 'string')
		{
			options = options ?? {};
			const handleKey = options.handleKey ?? defaultHandler;

			let keys = Object.keys(record);
			// @ts-ignore
			key = key.toLowerCase();

			if (options.reverse)
			{
				keys = keys.reverse()
			}

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

/**
 * get value of record with first match key
 */
export function valueFromRecord<V = never, D extends Record<any, any> = Record<any, any>, K extends keyof D | string = keyof D>(key: K,
	record: D,
	options?: IOptions,
): V extends never ? D[K extends keyof D ? K : keyof D] : V
{
	if (options?.allowUndefinedRecord && typeof record === 'undefined')
	{
		return;
	}

	return record[keyFromRecord(key, record, options)]
}

export default valueFromRecord
