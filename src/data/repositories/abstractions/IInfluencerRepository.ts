import { Influencer } from '@app/data/entities';
import { InfluencerQueryOptions } from '@app/modules/influencer/requests/InfluencerQueryOptions';

export interface IInfluencerRepository {
    deleteById(influencerId: string): Promise<void>;
    updateById(influencerId: string, modifiedInfluencer: Influencer): Promise<Influencer>;
    findById(influencerId: string): Promise<Influencer>;
    list(queryOption: InfluencerQueryOptions): Promise<Influencer[]>;
    create(influencer: Influencer): Promise<Influencer>;
}
