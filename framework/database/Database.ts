import { Knex, knex } from 'knex';
import { HttpError } from 'routing-controllers';
import Container, { ContainerInstance } from 'typedi';

const DatabaseContainer: ContainerInstance = Container.of('ncp:databases');
const DEFAULT_INSTANCE_NAME = 'ncp:default';

export class Database {
    protected _knex: Knex;

    constructor(connectionSetting?: Knex.Config) {
        this._knex = connectionSetting ? knex(connectionSetting) : knex(require(process.cwd() + '/knexfile'));
    }

    public static get instance() {
        try {
            Database.getConnection(DEFAULT_INSTANCE_NAME);
        } catch {
            Database.createConnection(DEFAULT_INSTANCE_NAME);
        }
        return Database.getConnection(DEFAULT_INSTANCE_NAME);
    }

    public get knex() {
        return this._knex;
    }

    public static getConnection(connectionName: string) {
        return DatabaseContainer.get<Database>(connectionName);
    }

    public static createConnection(connectionName: string, connectionSetting?: Knex.Config) {
        DatabaseContainer.set(connectionName, new Database(connectionSetting));
    }
}

export class DatabaseError extends HttpError {
    constructor(message: string, public inner: Error) {
        super(500, message);
    }
}
