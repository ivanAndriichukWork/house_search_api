import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PropertyTypes } from '../enums.enums.ts/propery-types.enums';
import { LivingTypes } from '../enums.enums.ts/living-types.enums';
import { HouseImagesDto } from './images.dto';
import { HouseLocationsDto } from './locations.dto';

export class HouseDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  area: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bedrooms: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  rooms: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  bathrooms: number;

  @ApiProperty({ type: 'enum', enum: PropertyTypes })
  @IsNotEmpty()
  propertyType: PropertyTypes;

  @ApiProperty({ type: 'enum', enum: LivingTypes })
  @IsNotEmpty()
  livingType: LivingTypes;

  @ApiProperty({ required: false })
  @IsArray()
  images?: HouseImagesDto[];

  @ApiProperty()
  @IsNotEmpty()
  location: HouseLocationsDto;
}
