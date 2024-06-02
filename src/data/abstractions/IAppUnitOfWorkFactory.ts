import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { Token } from 'typedi';

export interface IAppUnitOfWorkFactory {
    create(): IAppUnitOfWork;
}

export const AppUnitOfWorkFactoryIdentifier = new Token<IAppUnitOfWorkFactory>('IAppUnitOfWorkFactory');
