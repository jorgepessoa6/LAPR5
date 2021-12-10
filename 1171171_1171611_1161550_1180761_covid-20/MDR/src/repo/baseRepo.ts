export interface BaseRepo<T> {
    save (item: T): Promise<T>;
    exists(item: T):Promise<any>;
    delete(item: T): Promise<any>;
}
