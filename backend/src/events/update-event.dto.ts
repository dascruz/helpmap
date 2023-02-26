import { IsLatitude, IsLongitude, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEventDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsLatitude()
  latitude: number;

  @IsOptional()
  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsNumber()
  type: number;

  @IsOptional()
  @IsNumber()
  opacity: number;
}
