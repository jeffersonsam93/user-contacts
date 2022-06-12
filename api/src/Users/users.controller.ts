import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserImage } from 'src/entity/userimage.entity';
import { Users } from '../entity/user.entity';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';
import { UsersService } from './users.service';

@Controller('Users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  getAllUser(): Promise<Users[]> {
    return this.usersService.getAllUser();
  }

  @Get(':userId')
  getUserById( @Param('userId', new ParseIntPipe()) userId: number): Promise<Users> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':userId')
  updateUser(@Param('userId', new ParseIntPipe()) userId: number,@Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return this.usersService.updateUser(userId,updateUserDto);
  }


  @Delete(':userId')
  deleteUser( @Param('userId', new ParseIntPipe()) userId: number): Promise<Users> {
    return this.usersService.deleteUser(userId);
  }
}
