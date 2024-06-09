import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/CreateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UsersService) {}

  @Post('signup')
  signup(
    @Body()
    userDTO: CreateUserDto,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }
}
