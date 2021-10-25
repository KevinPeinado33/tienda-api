import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive } from 'class-validator';

import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreatePublicationDto {
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: `publication name` })
    readonly title:       string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: `publication description` })
    readonly description: string;
    
    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({ description: `url when is image` })
    readonly image:       string;
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: `price of product` })
    readonly price:       number;
    
    @IsNotEmpty()
    @ApiProperty({ description: `publication is active o not` })
    readonly status:      boolean;
    
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: `category to which it belongs` })
    readonly categoryId:  number;
    
}

export class UpdatePublicationDto extends PartialType( CreatePublicationDto ) { }