import { Influencer } from '@app/data/entities';
import { InfluencerQueryOptions } from '@app/modules/influencer/requests/InfluencerQueryOptions';
import { DatabaseRepository } from '@framework/database';
import { IInfluencerRepository } from './abstractions/IInfluencerRepository';

export class InfluencerRepository extends DatabaseRepository<Influencer> implements IInfluencerRepository {
    protected tableName: string = 'influencer';
    async findById(influencerId: string): Promise<Influencer> {
        return this.first((query) => query.where('id', influencerId));
    }

    async list(queryOption: InfluencerQueryOptions): Promise<Influencer[]> {
        return this.find((query) => {
            if (queryOption.platforms && queryOption.platforms.length > 0) {
                query.whereIn('platform', queryOption.platforms);
            }
            if (queryOption.keyword) {
                query.whereLike('email', queryOption.keyword);
                query.orWhereLike('name', queryOption.keyword);
            }

            return query;
        });
    }

    async create(influencer: Influencer): Promise<Influencer> {
        await this.add(influencer);
        return influencer;
    }

    async updateById(influencerId: string, modifiedInfluencer: Influencer): Promise<Influencer> {
        await this.update(modifiedInfluencer, (query) => {
            query.where('id', influencerId);
            return query;
        });
        return modifiedInfluencer;
    }

    async deleteById(influencerId: string): Promise<void> {
        return this.delete((query) => query.where('id', influencerId));
    }
}
