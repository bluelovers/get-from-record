import { basename, extname } from 'path';
import valueFromRecord, {
	entriesOfRecord,
	IKeyOfRecordLike,
	IValueOfRecordLike,
	keyFromRecord,
	keysOfRecord, toRecord, toRecordMap,
} from '../index';

const record = {
	Path: 'value of Path',
	path: 'value of path',
} as const

const recordMap = new Map<IKeyOfRecordLike<typeof record>, IValueOfRecordLike<typeof record>>(Object.entries(record) as any);

const recordMap2 = new Map<IKeyOfRecordLike<typeof record>, IValueOfRecordLike<typeof record>>(Object.entries({
	path: record.path,
	...record,
}) as any);

describe('keyFromRecord', () =>
{

	test(`base`, () =>
	{
		let actual: IKeyOfRecordLike<typeof record>;
		let expected: IKeyOfRecordLike<typeof record>;

		actual = keyFromRecord('path', recordMap);
		expected = 'path';

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();

		actual = keyFromRecord('Path', recordMap);
		expected = 'Path';

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();
	});

	test(`with fallback`, () =>
	{
		let actual: IKeyOfRecordLike<typeof record>;
		let expected: IKeyOfRecordLike<typeof record>;

		actual = keyFromRecord('PaTh', recordMap);
		expected = 'Path';

		expect(actual).toStrictEqual(expected);

		actual = keyFromRecord('PaTh', recordMap2);
		expected = 'path';

		expect(actual).toStrictEqual(expected);
	});

	test(`reverse`, () =>
	{
		let actual: IKeyOfRecordLike<typeof record>;
		let expected: IKeyOfRecordLike<typeof record>;

		actual = keyFromRecord('PaTh', recordMap, {
			reverse: true,
		});
		expected = 'path';

		expect(actual).toStrictEqual(expected);

		actual = keyFromRecord('PaTh', recordMap2, {
			reverse: true,
		});
		expected = 'Path';

		expect(actual).toStrictEqual(expected);
	});

	test(`not exists`, () =>
	{
		let actual: keyof typeof record;

		actual = keyFromRecord('key', recordMap, {
			reverse: true,
		});

		expect(actual).toBeUndefined();
	});

})

describe('valueFromRecord', () =>
{

	test(`base`, () =>
	{
		let actual: IValueOfRecordLike<typeof record>;
		let expected: IValueOfRecordLike<typeof record>;

		actual = valueFromRecord('path', recordMap);
		expected = record['path'];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();

		actual = valueFromRecord('Path', recordMap);
		expected = record['Path'];

		expect(actual).toStrictEqual(expected);
		//expect(actual).toMatchSnapshot();
	});

	test(`with fallback`, () =>
	{
		let actual: IValueOfRecordLike<typeof record>;
		let expected: IValueOfRecordLike<typeof record>;

		actual = valueFromRecord('PaTh', recordMap);
		expected = record['Path'];

		expect(actual).toStrictEqual(expected);

		actual = valueFromRecord('PaTh', recordMap2);
		expected = record['path'];

		expect(actual).toStrictEqual(expected);
	});

});

test(`keysOfRecord`, () =>
{
	expect(keysOfRecord(recordMap)).toMatchSnapshot();
	expect([...keysOfRecord(recordMap)]).toMatchSnapshot();
});

test(`entriesOfRecord`, () =>
{
	expect(entriesOfRecord(recordMap)).toMatchSnapshot();
	expect([...entriesOfRecord(recordMap)]).toMatchSnapshot();
});

test(`toRecord`, () =>
{
	expect(toRecord(recordMap)).toMatchSnapshot();
});

test(`toRecordMap`, () =>
{
	expect(toRecordMap(recordMap)).toMatchSnapshot();
});
