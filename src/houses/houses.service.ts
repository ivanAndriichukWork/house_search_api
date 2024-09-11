import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/service/base.service';
import { CreateHouseDto } from './dto/create-house.dto';
import { HousesRepository } from './houses.repository';
import {
  HouseResponseDto,
  HousesListResponseDto,
  HousesQueryParams,
} from './dto/house-response.dto';

@Injectable()
export class HousesService extends BaseService {
  constructor(protected readonly housesRepository: HousesRepository) {
    super(HousesService.name);
  }

  async createHouse(house: CreateHouseDto) {
    const h = await this.housesRepository.createHouse(house);
    return await this.getHouseById(h.id);
  }

  async getHouseById(id: number) {
    const h = await this.housesRepository.getHouseById(id);
    return new HouseResponseDto(h);
  }

  async getHouses(query: HousesQueryParams) {
    const [houses, totalCount] = await this.housesRepository.getHouses(query);
    return <HousesListResponseDto>{
      data: houses.map((h) => new HouseResponseDto(h)),
      totalCount,
      count: houses.length,
      currentPage: query.page,
      limit: query.limit,
    };
  }
}
