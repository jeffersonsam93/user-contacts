import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly userName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber('IN')
    readonly phoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly image: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly update_by: string;
}
