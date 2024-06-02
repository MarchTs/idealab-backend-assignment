import { IsNumber, IsOptional, IsString } from 'class-validator';

export class InfluencerQueryParams {
    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    platform: string;

    @IsNumber()
    @IsOptional()
    limit: number;

    @IsNumber()
    @IsOptional()
    offset: number;
}
