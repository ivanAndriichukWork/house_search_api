import { CommonEntity } from '../../common/entities/common.entity';
import { Column, Entity } from 'typeorm';

@Entity('house_locations')
export class HouseLocations extends CommonEntity {
  @Column({ name: 'country', nullable: false })
  country: string;

  @Column({ name: 'state', nullable: false })
  state: string;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'postal_code', nullable: false })
  postalCode: string;

  @Column({ name: 'address', nullable: false })
  address: string;
}
