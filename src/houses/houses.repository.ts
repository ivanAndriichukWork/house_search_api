import { BadRequestException, Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/repository/base.repository';
import { Brackets, DataSource, Repository } from 'typeorm';
import { CreateHouseDto } from './dto/create-house.dto';
import { HouseLocations } from './entities/house_locations.entity';
import { Houses } from './entities/houses.entity';
import { HouseImages } from './entities/house_images.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HousesQueryParams } from './dto/house-response.dto';

@Injectable()
export class HousesRepository extends BaseRepository {
  constructor(
    dataSource: DataSource,
    @InjectRepository(Houses)
    private readonly housesRepository: Repository<Houses>,
  ) {
    super(dataSource);
  }

  async createHouse(data: CreateHouseDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const house = new Houses();
      house.title = data.title;
      house.description = data.description;
      house.price = data.price;
      house.area = data.area;
      house.rooms = data.rooms;
      house.bathrooms = data.bathrooms;
      house.bedrooms = data.bedrooms;
      house.propertyType = data.propertyType;
      house.livingType = data.livingType;

      const location = new HouseLocations();
      location.country = data.location.country;
      location.state = data.location.state;
      location.city = data.location.city;
      location.postalCode = data.location.postalCode;
      location.address = data.location.address;

      await queryRunner.manager.save(HouseLocations, location);

      house.location = location;

      await queryRunner.manager.save(Houses, house);

      if (data?.images && data?.images?.length > 0) {
        const images: HouseImages[] = [];
        data.images.forEach((image) => {
          const img = new HouseImages();
          img.imageUrl = image.imageUrl;
          img.isMain = image.isMain;
          img.description = image.description;
          img.house = house;
          images.push(img);
        });
        await queryRunner.manager.save(HouseImages, images);
      }

      await queryRunner.commitTransaction();
      return house;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
  async getHouseById(id: number) {
    try {
      const house = await this.housesRepository
        .createQueryBuilder('houses')
        .where('houses.id = :id', { id })
        .leftJoinAndSelect('houses.images', 'images')
        .leftJoinAndSelect('houses.location', 'location')
        .getOne();
      if (!house) {
        throw new BadRequestException('House not found');
      }
      return house;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getHouses(query: HousesQueryParams) {
    try {
      const housesQuery = this.housesRepository
        .createQueryBuilder('houses')
        .leftJoinAndSelect('houses.images', 'images')
        .leftJoinAndSelect('houses.location', 'location')
        .orderBy('houses.id', query.direction);
      if (query?.limit) housesQuery.take(query.limit);
      if (query?.page) housesQuery.skip((query.page - 1) * query.limit);
      let isWhereAdded = false;
      if (query?.q && query.q !== '') {
        housesQuery.where(
          new Brackets((qb) => {
            qb.where('location.country ilike :search', {
              search: `%${query.q}%`,
            })
              .orWhere('location.city ilike :search', {
                search: `%${query.q}%`,
              })
              .orWhere('location.state ilike :search', {
                search: `%${query.q}%`,
              })
              .orWhere('location.postal_code ilike :search', {
                search: `%${query.q}%`,
              })
              .orWhere('location.address ilike :search', {
                search: `%${query.q}%`,
              });
          }),
        );
        isWhereAdded = true;
      }
      if (query?.livingType) {
        if (!isWhereAdded) {
          housesQuery.where('houses.living_type = :livingType', {
            livingType: query.livingType,
          });
          isWhereAdded = true;
        } else {
          housesQuery.andWhere('houses.living_type = :livingType', {
            livingType: query.livingType,
          });
        }
      }
      if (query?.propertyType) {
        if (!isWhereAdded) {
          housesQuery.where('houses.property_type = :propertyType', {
            propertyType: query.propertyType,
          });
          isWhereAdded = true;
        } else {
          housesQuery.andWhere('houses.property_type = :propertyType', {
            propertyType: query.propertyType,
          });
        }
      }
      if (query?.rooms) {
        if (!isWhereAdded) {
          housesQuery.where('houses.rooms = :rooms', {
            rooms: query.rooms,
          });
          isWhereAdded = true;
        } else {
          housesQuery.andWhere('houses.rooms = :rooms', {
            rooms: query.rooms,
          });
        }
      }
      if (query?.price) {
        if (!isWhereAdded) {
          housesQuery
            .where('houses.price >= :minPrice', {
              minPrice: query.price.min,
            })
            .andWhere('houses.price <= :maxPrice', {
              maxPrice: query.price.max,
            });
          isWhereAdded = true;
        } else {
          housesQuery
            .andWhere('houses.price >= :minPrice', {
              minPrice: query.price.min,
            })
            .andWhere('houses.price <= :maxPrice', {
              maxPrice: query.price.max,
            });
        }
      }
      if (query?.area) {
        if (!isWhereAdded) {
          housesQuery
            .where('houses.area >= :minArea', {
              minArea: query.area.min,
            })
            .andWhere('houses.area <= :maxArea', {
              maxArea: query.area.max,
            });
          isWhereAdded = true;
        } else {
          housesQuery
            .andWhere('houses.area >= :minArea', {
              minArea: query.area.min,
            })
            .andWhere('houses.area <= :maxArea', {
              maxArea: query.area.max,
            });
        }
      }

      return await housesQuery.getManyAndCount();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
