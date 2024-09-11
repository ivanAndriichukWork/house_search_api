import { ApiProperty } from '@nestjs/swagger';
import { HouseLocations } from '../entities/house_locations.entity';
import { HouseLocationsDto } from './locations.dto';

export class LocationsResponseDto extends HouseLocationsDto {
  @ApiProperty()
  id: number;
  constructor(location: HouseLocations) {
    super();
    this.id = location.id;
    this.country = location.country;
    this.state = location.state;
    this.city = location.city;
    this.postalCode = location.postalCode;
    this.address = location.address;
  }
}
