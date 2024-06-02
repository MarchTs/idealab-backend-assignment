import { IAccountRepository, IEmailAuthRepository } from '@app/data/repositories';
import { IUnitOfWork } from '@framework/database';
import { IInfluencerRepository } from '../repositories/abstractions/IInfluencerRepository';

export interface IAppUnitOfWork extends IUnitOfWork {
    readonly influencerRepository: IInfluencerRepository;
    readonly accountRepository: IAccountRepository;
    readonly emailAuthRepository: IEmailAuthRepository;
}
