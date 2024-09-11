import { ApiProperty } from '@nestjs/swagger';
import { HouseImages } from '../entities/house_images.entity';
import { HouseImagesDto } from './images.dto';

export class ImagesResponseDto extends HouseImagesDto {
  @ApiProperty()
  id: number;
  constructor(image: HouseImages) {
    super();
    this.id = image.id;
    this.imageUrl = image.imageUrl;
    this.isMain = image.isMain;
    this.description = image.description;
  }
}
