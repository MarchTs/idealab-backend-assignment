import { AppUnitOfWork } from '@app/data/AppUnitOfWork';
import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { IAppUnitOfWorkFactory } from '@app/data/abstractions/IAppUnitOfWorkFactory';
import { Database } from '@framework/database';

export class AppUnitOfWorkFactory implements IAppUnitOfWorkFactory {
    public create(): IAppUnitOfWork {
        return new AppUnitOfWork(Database.instance);
    }
}
