import { InfluencerStatus } from '@app/data/definitions/InfluencerStatus';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateInfluencerRequest {
    @IsOptional()
    @IsString()
    public name: string;

    @IsOptional()
    @IsString()
    public platform: string;

    @IsOptional()
    @IsString()
    public sex: string;

    @IsOptional()
    @IsArray()
    public categories: string[];

    @IsOptional()
    @IsString()
    public tel: string;

    @IsOptional()
    @IsString()
    public link: string;

    @IsOptional()
    @IsNumber()
    public followers: number;

    @IsOptional()
    @IsNumber()
    public photo_cost_kols: number;

    @IsOptional()
    @IsNumber()
    public vdo_cost_kols: number;

    @IsOptional()
    @IsNumber()
    public er: number;

    @IsOptional()
    @IsString()
    public status: InfluencerStatus;
}
