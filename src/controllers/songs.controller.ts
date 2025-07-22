import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { SongsService } from '../services/songs.service';
import { CreateSongDto } from '../dto/create-song.dto';
import { UpdateSongDto } from '../dto/update-song.dto';

@Controller('api/songs')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto) {
    return {
      success: true,
      message: 'Song created successfully',
      data: await this.songsService.create(createSongDto),
    };
  }

  @Get()
  async findAll() {
    return {
      success: true,
      message: 'Songs retrieved successfully',
      data: await this.songsService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      message: 'Song retrieved successfully',
      data: await this.songsService.findOne(id),
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return {
      success: true,
      message: 'Song updated successfully',
      data: await this.songsService.update(id, updateSongDto),
    };
  }

  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    return {
      success: true,
      message: 'Song updated successfully',
      data: await this.songsService.update(id, updateSongDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.songsService.remove(id);
    return {
      success: true,
      message: result.message,
    };
  }

  @Patch(':id/play')
  async incrementPlays(@Param('id', ParseIntPipe) id: number) {
    return {
      success: true,
      message: 'Play count incremented successfully',
      data: await this.songsService.incrementPlays(id),
    };
  }
}
