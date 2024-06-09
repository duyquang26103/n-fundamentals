import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Song } from '../../songs/songs.entity';

export class CreatePlayListDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly songs: Song[];

  @IsNumber()
  @IsNotEmpty()
  readonly user: number;
}
