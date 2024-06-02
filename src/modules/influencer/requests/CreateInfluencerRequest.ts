import { InfluencerStatus } from '@app/data/definitions/InfluencerStatus';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateInfluencerRequest {
    @IsString()
    public name: string;

    @IsString()
    public platform: string;

    @IsString()
    public sex: string;

    @IsArray()
    public categories: string[];

    @IsString()
    public tel: string;

    @IsString()
    public link: string;

    @IsNumber()
    public followers: number;

    @IsNumber()
    public photo_cost_kols: number;

    @IsNumber()
    public vdo_cost_kols: number;

    @IsNumber()
    public er: number;

    @IsString()
    public status: InfluencerStatus;
}
