import { CommonEntity } from '../../common/entities/common.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Houses } from './houses.entity';

@Entity('house_images')
export class HouseImages extends CommonEntity {
  @Column({ name: 'image_url', nullable: false })
  imageUrl: string;

  @Column({ name: 'is_main', default: false })
  isMain: boolean;

  @Column({ name: 'description', nullable: false })
  description: string;

  @ManyToOne(() => Houses, (house) => house.images)
  @JoinColumn({ name: 'house_id', referencedColumnName: 'id' })
  house: Houses;
}
