import valueFromRecord, { keyFromRecord } from '../index';

const record = {
	Path: 'value of Path',
	path: 'value of path',
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

		actual = keyFromRecord('PaTh', {
			path: record.path,
			...record,
		});
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

		actual = keyFromRecord('PaTh', {
			path: record.path,
			...record,
		}, {
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

		actual = valueFromRecord('PaTh', {
			path: record.path,
			...record,
		});
		expected = record['path'];

		expect(actual).toStrictEqual(expected);
	});

});
