import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsOptional, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly userName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @IsPhoneNumber('IN')
    readonly phoneNumber: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly image: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly update_by: string;
}
