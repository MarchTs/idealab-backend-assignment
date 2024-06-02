import { Role } from '@app/data/definitions';
import { Influencer } from '@app/data/entities';
import { InfluencerService } from '@app/modules/influencer/InfluencerService';
import { CreateInfluencerRequest } from '@app/modules/influencer/requests/CreateInfluencerRequest';
import { InfluencerQueryParams } from '@app/modules/influencer/requests/InfluencerQueryParams';
import { UpdateInfluencerRequest } from '@app/modules/influencer/requests/UpdateInfluencerRequest';
import { Authorized, Body, Delete, Get, JsonController, Param, Post, Put } from 'routing-controllers';
import { Inject } from 'typedi';

@JsonController('/influencer')
export class InfluencerController {
    @Inject()
    private readonly _influencerService: InfluencerService;

    @Post('/')
    @Authorized()
    async createInfluencer(@Body() request: CreateInfluencerRequest): Promise<Influencer> {
        return this._influencerService.createInfluencer(request);
    }

    @Get('/')
    @Authorized([Role.ADMIN])
    async list(queryOption: InfluencerQueryParams): Promise<Influencer[]> {
        return this._influencerService.list(queryOption);
    }

    @Get('/:influencerId')
    @Authorized([Role.ADMIN, Role.INFLUENCER])
    async get(@Param('influencerId') influencerId: string): Promise<Influencer> {
        return this._influencerService.getById(influencerId);
    }

    @Put('/:influencerId')
    @Authorized([Role.ADMIN, Role.INFLUENCER])
    async update(@Param('influencerId') influencerId: string, @Body() request: UpdateInfluencerRequest): Promise<Influencer> {
        return this._influencerService.updateInfluencer(influencerId, request);
    }

    @Delete('/:influencerId')
    @Authorized([Role.ADMIN])
    async delete(@Param('influencerId') influencerId: string): Promise<Influencer> {
        return this._influencerService.deleteInfluencer(influencerId);
    }
}
