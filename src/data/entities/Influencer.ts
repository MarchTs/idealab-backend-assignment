import { InfluencerStatus } from '@app/data/definitions';
import { Account } from '@app/data/entities';
import { CreateInfluencerRequest } from '@app/modules/influencer/requests/CreateInfluencerRequest';
import { UpdateInfluencerRequest } from '@app/modules/influencer/requests/UpdateInfluencerRequest';
import { randomUUID } from 'crypto';

export class Influencer {
    public id: string;
    public account_id: string;
    public name: string;
    public platform: string;
    public sex: string;
    public categories: string[];
    public tel: string;
    public link: string;
    public followers: number;
    public photo_cost_kols: number;
    public vdo_cost_kols: number;
    public er: number;
    public created_at: Date;
    public updated_at: Date;
    public status: InfluencerStatus;

    constructor(payload: {
        id: string;
        account_id: string;
        name: string;
        platform: string;
        sex: string;
        categories: string[];
        tel: string;
        link: string;
        followers: number;
        photo_cost_kols: number;
        vdo_cost_kols: number;
        er: number;
        createdAt?: Date;
        updatedAt?: Date;
        status?: InfluencerStatus;
    }) {
        this.id = payload.id;
        this.account_id = payload.account_id;
        this.name = payload.name;
        this.platform = payload.platform;
        this.sex = payload.sex;
        this.categories = payload.categories;
        this.tel = payload.tel;
        this.link = payload.link;
        this.followers = payload.followers;
        this.photo_cost_kols = payload.photo_cost_kols;
        this.vdo_cost_kols = payload.vdo_cost_kols;
        this.er = payload.er;
        this.created_at = payload.createdAt ?? new Date();
        this.updated_at = payload.updatedAt ?? new Date();
        this.status = payload.status ?? InfluencerStatus.ACTIVE;
    }

    static fromCreateRequest(request: CreateInfluencerRequest, account: Account): Influencer {
        return new Influencer({
            id: randomUUID(),
            account_id: account.account_id,
            name: request.name,
            platform: request.platform,
            sex: request.sex,
            categories: request.categories,
            tel: request.tel,
            link: request.link,
            followers: request.followers,
            photo_cost_kols: request.photo_cost_kols,
            vdo_cost_kols: request.vdo_cost_kols,
            er: request.er,
        });
    }

    static fromUpdateRequest(influencer: Influencer, request: UpdateInfluencerRequest) {
        return new Influencer({
            id: influencer.id,
            account_id: influencer.account_id,
            name: request.name ?? influencer.name,
            platform: request.platform ?? influencer.platform,
            sex: request.sex ?? influencer.sex,
            categories: request.categories ?? influencer.categories,
            tel: request.tel ?? influencer.tel,
            link: request.link ?? influencer.link,
            followers: request.followers ?? influencer.followers,
            photo_cost_kols: request.photo_cost_kols ?? influencer.photo_cost_kols,
            vdo_cost_kols: request.vdo_cost_kols ?? influencer.vdo_cost_kols,
            er: request.er ?? influencer.er,
        });
    }
}
