import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { Playlist } from '../playlists/playlists.entity';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
  @Column()
  releasedDate: Date;
  @Column({ type: 'time' })
  duration: Date;
  @Column('longtext')
  lyrics: string;
  @ManyToOne(() => Playlist, (playList) => playList.songs)
  playList: Playlist;
}
