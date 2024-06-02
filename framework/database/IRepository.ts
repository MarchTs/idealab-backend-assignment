export interface IRepository<TEntity> {
    add(entity: TEntity, ...params: any[]): Promise<void>;
    update(entity: TEntity, predicate: any, ...params: any[]): Promise<void>;
    delete(predicate: any, ...params: any[]): Promise<void>;
    first(predicate: any, ...params: any[]): Promise<TEntity>;
    find(predicate: any, ...params: any[]): Promise<TEntity[]>;
}