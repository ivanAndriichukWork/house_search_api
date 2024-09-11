import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateHouseDto } from './dto/create-house.dto';
import { HousesService } from './houses.service';
import {
  HouseResponseDto,
  HousesListResponseDto,
  HousesQueryParams,
} from './dto/house-response.dto';

@Controller('houses')
@ApiTags('Houses')
export class HousesController {
  constructor(protected readonly housesService: HousesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The house has been successfully created.',
    type: HouseResponseDto,
  })
  createHouse(@Body() house: CreateHouseDto) {
    return this.housesService.createHouse(house);
  }

  @Get()
  @ApiOkResponse({
    description: 'Houses list',
    type: HousesListResponseDto,
  })
  getHouses(@Query() query: HousesQueryParams) {
    return this.housesService.getHouses(query);
  }
}
