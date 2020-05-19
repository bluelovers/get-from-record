# README.md



## install

```bash
yarn add value-from-record
yarn-tool add value-from-record
yt add value-from-record
```

```typescript
import valueFromRecord, { keyFromRecord } from '../index';

const record = {
	Path: 'value of Path',
	path: 'value of path',
} as const

let actual;
let expected;

actual = keyFromRecord('PaTh', record);
expected = 'Path';

expect(actual).toStrictEqual(expected);

actual = valueFromRecord('PaTh', record);
expected = record['Path'];

expect(actual).toStrictEqual(expected);
```
