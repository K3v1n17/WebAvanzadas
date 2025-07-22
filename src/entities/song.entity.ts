import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsNotEmpty, IsOptional, IsNumber, Min } from 'class-validator';

@Entity('TBL_SONG')
export class Song {
  @PrimaryGeneratedColumn({ name: 'ID_SONG' })
  id: number;

  @Column({ name: 'SONG_NAME', type: 'varchar', length: 50 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column({ name: 'SONG_PATH', type: 'varchar', length: 255 })
  @IsString()
  @IsNotEmpty()
  path: string;

  @Column({ name: 'PLAYS', type: 'int', nullable: true, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  plays?: number;
}
