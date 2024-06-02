import { IAppUnitOfWork } from '@app/data/abstractions/IAppUnitOfWork';
import { Influencer } from '@app/data/entities';
import { InfluencerQueryOptions } from '@app/modules/influencer/requests/InfluencerQueryOptions';
import { Service } from 'typedi';

@Service()
export class InfluencerDomainService {
    async createInfluencer(uow: IAppUnitOfWork, influencer: Influencer): Promise<Influencer> {
        await uow.influencerRepository.create(influencer);
        return influencer;
    }

    async list(uow: IAppUnitOfWork, queryOption: InfluencerQueryOptions): Promise<Influencer[]> {
        return uow.influencerRepository.list(queryOption);
    }

    async getById(uow: IAppUnitOfWork, influencerId: string): Promise<Influencer> {
        const result = await uow.influencerRepository.findById(influencerId);
        if (!result) {
            throw new Error('Influencer not found');
        }
        return result;
    }

    async updateById(uow: IAppUnitOfWork, influencerId: string, modifiedInfluencer: Influencer): Promise<Influencer> {
        return uow.influencerRepository.updateById(influencerId, modifiedInfluencer);
    }

    async delete(uow: IAppUnitOfWork, influencer: Influencer): Promise<Influencer> {
        await uow.influencerRepository.deleteById(influencer.id);
        return influencer;
    }
}
