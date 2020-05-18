/**
 * Created by user on 2020/5/18.
 */
export interface IOptions {
    handleKey?(key: string): string;
}
export declare function keyFromRecord<D extends Record<any, any>, K>(key: K, record: D, options?: IOptions): K extends keyof D ? K : keyof D;
export declare function getFromRecord<V = never, D extends Record<any, any> = Record<any, any>, K = keyof D>(key: K, record: D, options?: IOptions): V extends never ? D[K extends keyof D ? K : keyof D] : V;
export default getFromRecord;
