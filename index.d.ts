export interface IOptions {
    handleKey?(key: string): string;
    reverse?: boolean;
    allowUndefinedRecord?: boolean;
}
/**
 * get first match key of record
 */
export declare function keyFromRecord<D extends Record<any, any>, K extends keyof D | string>(key: K, record: D, options?: IOptions): K extends keyof D ? K : keyof D;
/**
 * get value of record with first match key
 */
export declare function valueFromRecord<V = never, D extends Record<any, any> = Record<any, any>, K extends keyof D | string = keyof D>(key: K, record: D, options?: IOptions): V extends never ? D[K extends keyof D ? K : keyof D] : V;
export default valueFromRecord;
