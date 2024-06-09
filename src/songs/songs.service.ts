import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './songs.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song-dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from '../artists/artists.entity';

@Injectable({
  scope: Scope.DEFAULT,
})
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    const queryBuilder = this.songRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.releasedDate', 'DESC');
    return paginate<Song>(queryBuilder, options);
  }

  async create(songDTO: CreateSongDto) {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.lyrics = songDTO.lyrics;
    song.releasedDate = songDTO.releasedDate;

    song.artists = await this.artistRepository.findBy(songDTO.artists);

    return this.songRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return this.songRepository.find();
  }

  async findOne(id: number): Promise<Song> {
    const song = await this.songRepository.findOneBy({ id });
    if (!song) {
      throw new Error('Song not found');
    }
    return song;
  }

  async delete(id: number): Promise<void> {
    await this.songRepository.delete(id);
  }

  update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
    return this.songRepository.update(id, recordToUpdate);
  }
}
