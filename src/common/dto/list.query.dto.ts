import { Type } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class ListQueryParams {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  direction?: 'DESC' | 'ASC' = 'DESC';

  @IsOptional()
  @IsString()
  @MinLength(3)
  q?: string;
}
