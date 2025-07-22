import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateSongDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  plays?: number;
}
