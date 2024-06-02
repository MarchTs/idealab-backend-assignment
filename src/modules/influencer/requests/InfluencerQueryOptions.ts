import { InfluencerQueryParams } from './InfluencerQueryParams';

export class InfluencerQueryOptions {
    keyword?: string;
    platforms?: string[];
    limit?: number;
    offset?: number;

    static fromQueryParams(queryParams: InfluencerQueryParams): InfluencerQueryOptions {
        const options = new InfluencerQueryOptions();
        options.keyword = queryParams.keyword;
        options.platforms = queryParams.platform ? [queryParams.platform] : [];
        options.limit = queryParams.limit;
        options.offset = queryParams.offset;
        return options;
    }
}
