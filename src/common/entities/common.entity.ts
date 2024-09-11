import { Expose } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class CommonEntity {
  @PrimaryGeneratedColumn()
  @Expose()
  id!: number;

  @CreateDateColumn({ name: 'date_created' })
  @Expose()
  dateCreated!: Date;

  @CreateDateColumn({ name: 'date_updated' })
  @Expose()
  dateUpdated!: Date;
}
