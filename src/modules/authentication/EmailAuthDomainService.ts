import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { EmailAuth } from '@app/data/entities';
import { Service } from 'typedi';

@Service()
export class EmailAuthDomainService {
    async createEmailAuth(uow: IAppUnitOfWork, emailAuth: EmailAuth): Promise<EmailAuth> {
        return uow.emailAuthRepository.create(emailAuth);
    }

    async getEmailAuthByEmail(uow: IAppUnitOfWork, email: string): Promise<EmailAuth> {
        const result = await uow.emailAuthRepository.findByEmail(email);
        if (!result) {
            throw new Error('EmailAuth not found');
        }
        return result;
    }

    async findEmailAuthByEmail(uow: IAppUnitOfWork, email: string): Promise<EmailAuth> {
        return uow.emailAuthRepository.findByEmail(email);
    }

    async getAccountById(uow: IAppUnitOfWork, email: string): Promise<EmailAuth> {
        const result = await uow.emailAuthRepository.findByEmail(email);
        if (!result) {
            throw new Error('EmailAuth not found');
        }
        return result;
    }
}
