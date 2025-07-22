import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from '../entities/song.entity';
import { CreateSongDto } from '../dto/create-song.dto';
import { UpdateSongDto } from '../dto/update-song.dto';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = this.songsRepository.create(createSongDto);
    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find({
      order: {
        id: 'ASC'
      }
    });
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songsRepository.findOne({ 
      where: { id } 
    });
    
    if (!song) {
      throw new NotFoundException(`Song with ID ${id} not found`);
    }
    
    return song;
  }

  async update(id: number, updateSongDto: UpdateSongDto): Promise<Song> {
    const song = await this.findOne(id);
    
    Object.assign(song, updateSongDto);
    
    return await this.songsRepository.save(song);
  }

  async remove(id: number): Promise<{ message: string }> {
    const song = await this.findOne(id);
    
    await this.songsRepository.remove(song);
    
    return { message: `Song with ID ${id} has been deleted successfully` };
  }

  async incrementPlays(id: number): Promise<Song> {
    const song = await this.findOne(id);
    song.plays = (song.plays || 0) + 1;
    return await this.songsRepository.save(song);
  }
}
