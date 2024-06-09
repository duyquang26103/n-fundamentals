import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Playlist } from '../playlists/playlists.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  @Exclude()
  password: string;
  // Each user can have multiple playlists
  @OneToMany(() => Playlist, (playList) => playList.user)
  playLists: Playlist[];
}
