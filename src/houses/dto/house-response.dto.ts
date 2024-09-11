import { ApiProperty } from '@nestjs/swagger';
import { HouseDto } from './house.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Houses } from '../entities/houses.entity';
import { ImagesResponseDto } from './images-response.dto';
import { LocationsResponseDto } from './locations-response.dto';
import { ListResponseDto } from 'src/common/dto/list.response.dto';
import { ListQueryParams } from 'src/common/dto/list.query.dto';
import { LivingTypes } from '../enums.enums.ts/living-types.enums';
import { PropertyTypes } from '../enums.enums.ts/propery-types.enums';
import { Type } from 'class-transformer';

export class HouseResponseDto extends HouseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  constructor(house: Houses) {
    super();
    this.title = house.title;
    this.description = house.description;
    this.price = house.price;
    this.area = house.area;
    this.rooms = house.rooms;
    this.bathrooms = house.bathrooms;
    this.bedrooms = house.bedrooms;
    this.propertyType = house.propertyType;
    this.livingType = house.livingType;
    this.images =
      house?.images && house?.images?.length > 0
        ? house.images.map((i) => new ImagesResponseDto(i))
        : [];
    this.location = new LocationsResponseDto(house.location);
  }
}

export class HousesListResponseDto extends ListResponseDto {
  @ApiProperty({ type: HouseResponseDto, isArray: true })
  data: HouseResponseDto[];
}

export class Range {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  min: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  max: number;
}

export class HousesQueryParams extends ListQueryParams {
  @ApiProperty({ required: false, type: LivingTypes })
  @IsOptional()
  livingType?: LivingTypes;

  @ApiProperty({ required: false, type: PropertyTypes })
  @IsOptional()
  propertyType?: PropertyTypes;

  @ApiProperty({
    required: false,
    type: Range,
    example: { min: 100, max: 1000 },
    name: 'area',
  })
  @IsOptional()
  @Type(() => Range)
  area: Range;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  rooms: number;

  @ApiProperty({
    required: false,
    type: Range,
    example: { 'price[min]': 100, 'price[max]': 1000 },
    name: 'price',
  })
  @IsOptional()
  @Type(() => Range)
  price: Range;
}
