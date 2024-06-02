import { Database, DatabaseError, IRepository, IUnitOfWork } from '@framework/database';
import { Knex } from 'knex';

export abstract class DatabaseRepository<TEntity> implements IRepository<TEntity> {
    protected abstract tableName: string;

    constructor(protected readonly unitOfWork: IUnitOfWork<Database, Knex.Transaction>) {}

    public get scope() {
        const scope = this.unitOfWork.connection.knex(this.tableName);
        if (this.unitOfWork.transaction) {
            scope.transacting(this.unitOfWork.transaction);
        }

        return scope;
    }

    public async executeQuery<TResult = any>(query: (queryBuilder: Knex.QueryBuilder) => Promise<Knex.QueryBuilder>) {
        try {
            const result = await query(this.scope);
            return result as TResult;
        } catch (error) {
            console.error(error);
            throw new DatabaseError('Query execute failed, see logs', error);
        }
    }

    public async add(entity: TEntity): Promise<void> {
        try {
            await this.scope.insert<TEntity>(entity);
        } catch (error) {
            console.error(error);
            throw new DatabaseError('Operation insert failed, see logs', error);
        }
    }

    public async find(predicate: (queryBuilder: Knex.QueryBuilder) => Promise<Knex.QueryBuilder>) {
        return this.executeQuery<TEntity[]>(predicate);
    }

    public async first(predicate: (queryBuilder: Knex.QueryBuilder) => Promise<Knex.QueryBuilder>) {
        return this.executeQuery<TEntity>(async (qb) => predicate(qb.first()));
    }

    public async update(entity: Partial<TEntity>, predicate: (queryBuilder: Knex.QueryBuilder) => Promise<Knex.QueryBuilder>): Promise<void> {
        return this.executeQuery(async (qb) => predicate(qb.update(entity)));
    }

    public async delete(predicate: (queryBuilder: Knex.QueryBuilder) => Promise<Knex.QueryBuilder>): Promise<void> {
        return this.executeQuery(async (qb) => predicate(qb.delete()));
    }
}
