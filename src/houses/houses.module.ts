import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { HousesRepository } from './houses.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Houses } from './entities/houses.entity';
import { HouseLocations } from './entities/house_locations.entity';
import { HouseImages } from './entities/house_images.entity';

@Module({
  controllers: [HousesController],
  providers: [HousesService, HousesRepository],
  exports: [HousesService],
  imports: [TypeOrmModule.forFeature([Houses, HouseLocations, HouseImages])],
})
export class HousesModule {}
