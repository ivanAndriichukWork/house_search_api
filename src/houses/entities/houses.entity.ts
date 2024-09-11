import { CommonEntity } from '../../common/entities/common.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { HouseImages } from './house_images.entity';
import { HouseLocations } from './house_locations.entity';
import { PropertyTypes } from '../enums.enums.ts/propery-types.enums';
import { LivingTypes } from '../enums.enums.ts/living-types.enums';

@Entity('houses')
export class Houses extends CommonEntity {
  @Column({ name: 'title', nullable: false })
  title: string;

  @Column({ name: 'description', nullable: true })
  description!: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'area', nullable: false })
  area: number;

  @Column({ name: 'rooms', nullable: false })
  rooms: number;

  @Column({ name: 'bathrooms', nullable: false })
  bathrooms: number;

  @Column({ name: 'bedrooms', nullable: false })
  bedrooms: number;

  @Column({ name: 'property_type', nullable: false })
  propertyType: PropertyTypes;

  @Column({ name: 'living_type', nullable: false })
  livingType: LivingTypes;

  @OneToMany(() => HouseImages, (image) => image.house)
  images!: HouseImages[];

  @OneToOne(() => HouseLocations, { cascade: true })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: HouseLocations;
}
