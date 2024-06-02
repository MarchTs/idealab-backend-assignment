import { NotFoundError } from 'routing-controllers';

export class InfluencerNotFound extends NotFoundError {
    constructor() {
        super('Influencer not found');
    }
}
