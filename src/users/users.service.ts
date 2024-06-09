import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/CreateUserDto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    console.log('salt', salt);
    userDto.password = await bcrypt.hash(userDto.password, salt);
    console.log('password', userDto.password);
    const user = await this.userRepository.save(userDto);
    delete user.password;
    return user;
  }
}
