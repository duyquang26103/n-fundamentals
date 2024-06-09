import { PlaylistsService } from './playlists.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayListDto } from './dto/CreatePlayListDto';
import { Playlist } from './playlists.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlayListDto): Promise<Playlist> {
    return this.playlistsService.create(createPlaylistDto);
  }
}
