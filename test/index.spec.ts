import valueFromRecord, {
	entriesOfRecord,
	IKeyOfRecordLike,
	IOptions,
	keyFromRecord,
	keysOfRecord,
	toRecord, toRecordMap,
} from '../index';

const record = {
	Path: 'value of Path',
	path: 'value of path',
} as const

const record2 = {
	path: record.path,
	...record,
} as const

describe('keyFromRecord', () =>
{

	test(`base`, () =>
	{
		let actual: keyof typeof record;
		let expected: keyof typeof record;

		actual = keyFromRecord('path', record);
		expected = 'path';

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();

		actual = keyFromRecord('Path', record);
		expected = 'Path';

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();
	});

	test(`with fallback`, () =>
	{
		let actual: keyof typeof record;
		let expected: keyof typeof record;

		actual = keyFromRecord('PaTh', record);
		expected = 'Path';

		expect(actual).toStrictEqual(expected);

		actual = keyFromRecord('PaTh', record2);
		expected = 'path';

		expect(actual).toStrictEqual(expected);
	});

	test(`reverse`, () =>
	{
		let actual: keyof typeof record;
		let expected: keyof typeof record;

		actual = keyFromRecord('PaTh', record, {
			reverse: true,
		});
		expected = 'path';

		expect(actual).toStrictEqual(expected);

		actual = keyFromRecord('PaTh', record2, {
			reverse: true,
		});
		expected = 'Path';

		expect(actual).toStrictEqual(expected);
	});

	test(`not exists`, () =>
	{
		let actual: keyof typeof record;

		actual = keyFromRecord('key', record, {
			reverse: true,
		});

		expect(actual).toBeUndefined();
	});

})

describe('valueFromRecord', () =>
{

	test(`base`, () =>
	{
		let actual: (typeof record)[keyof typeof record];
		let expected: (typeof record)[keyof typeof record];

		actual = valueFromRecord('path', record);
		expected = record['path'];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();

		actual = valueFromRecord('Path', record);
		expected = record['Path'];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();
	});

	test(`with fallback`, () =>
	{
		let actual: (typeof record)[keyof typeof record];
		let expected: (typeof record)[keyof typeof record];

		actual = valueFromRecord('PaTh', record);
		expected = record['Path'];

		expect(actual).toStrictEqual(expected);

		actual = valueFromRecord('PaTh', record2);
		expected = record['path'];

		expect(actual).toStrictEqual(expected);
	});

});

describe('undefined', () =>
{

	test(`throw`, () =>
	{
		expect(() => keyFromRecord('PaTh', void 0)).toThrowError();
		expect(() => valueFromRecord('PaTh', void 0)).toThrowError();
	});

	test(`options.allowUndefinedRecord`, () =>
	{
		let options: IOptions = {
			allowUndefinedRecord: true,
		};

		let actual = keyFromRecord('PaTh', void 0, options);

		expect(actual).toBeUndefined();

		actual = valueFromRecord('PaTh', void 0, options);

		expect(actual).toBeUndefined();
	});

})

test(`keysOfRecord`, () =>
{
	expect(keysOfRecord(record)).toMatchSnapshot();
	expect([...keysOfRecord(record)]).toMatchSnapshot();
});

test(`entriesOfRecord`, () =>
{
	expect(entriesOfRecord(record)).toMatchSnapshot();
	expect([...entriesOfRecord(record)]).toMatchSnapshot();
});

test(`toRecord`, () =>
{
	expect(toRecord(record)).toMatchSnapshot();
});

test(`toRecordMap`, () =>
{
	expect(toRecordMap(record)).toMatchSnapshot();
});
