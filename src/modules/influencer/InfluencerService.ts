import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { AppUnitOfWorkFactoryIdentifier, IAppUnitOfWorkFactory } from '@app/data/abstractions/IAppUnitOfWorkFactory';
import { Account, Influencer } from '@app/data/entities';
import { InfluencerDomainService } from '@app/modules/influencer/InfluencerDomainService';
import { CreateInfluencerRequest } from '@app/modules/influencer/requests/CreateInfluencerRequest';
import { InfluencerQueryOptions } from '@app/modules/influencer/requests/InfluencerQueryOptions';
import { InfluencerQueryParams } from '@app/modules/influencer/requests/InfluencerQueryParams';
import { using } from '@framework/core';
import { Inject, Service } from 'typedi';
import { UpdateInfluencerRequest } from './requests/UpdateInfluencerRequest';

@Service()
export class InfluencerService {
    @Inject(AppUnitOfWorkFactoryIdentifier)
    private _appUnitOfWorkFactory: IAppUnitOfWorkFactory;

    @Inject()
    private readonly _influencerDomainService: InfluencerDomainService;

    async createInfluencer(request: CreateInfluencerRequest): Promise<Influencer> {
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            await uow.initialize({});
            const account = Account.default();
            const influencer = Influencer.fromCreateRequest(request, account);
            await this._influencerDomainService.createInfluencer(uow, influencer);
            await uow.saveChanges();
            return influencer;
        });
    }

    async list(queryParams: InfluencerQueryParams): Promise<Influencer[]> {
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            const queryOption = InfluencerQueryOptions.fromQueryParams(queryParams);
            return this._influencerDomainService.list(uow, queryOption);
        });
    }

    async getById(influencerId: string): Promise<Influencer> {
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            return this._influencerDomainService.getById(uow, influencerId);
        });
    }

    async updateInfluencer(influencerId: string, request: UpdateInfluencerRequest): Promise<Influencer> {
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            await uow.initialize({});
            const influencer = await this._influencerDomainService.getById(uow, influencerId);
            const modifiedInfluencer = Influencer.fromUpdateRequest(influencer, request);
            await this._influencerDomainService.updateById(uow, influencerId, modifiedInfluencer);
            await uow.saveChanges();
            return modifiedInfluencer;
        });
    }

    async deleteInfluencer(influencerId: string): Promise<Influencer> {
        const context = using(this._appUnitOfWorkFactory.create());
        return context(async (uow: IAppUnitOfWork) => {
            const influencer = await this._influencerDomainService.getById(uow, influencerId);
            await this._influencerDomainService.delete(uow, influencer);
            return influencer;
        });
    }
}
