import { InjectRepository } from '@nestjs/typeorm';
import { Playlist } from './playlists.entity';
import { User } from '../users/user.entity';
import { Song } from '../songs/songs.entity';
import { CreatePlayListDto } from './dto/CreatePlayListDto';
import { Repository } from 'typeorm';

export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  async create(playListDto: CreatePlayListDto): Promise<Playlist> {
    const playlist = new Playlist();
    playlist.name = playListDto.name;

    playlist.songs = await this.songRepository.findBy(playListDto.songs);

    playlist.user = await this.userRepository.findOneBy({
      id: playListDto.user,
    });
    return this.playlistRepository.save(playlist);
  }
}
