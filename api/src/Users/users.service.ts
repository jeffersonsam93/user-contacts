import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { find, throwError } from 'rxjs';
import { Users } from 'src/entity/user.entity';
import { UserImage } from 'src/entity/userimage.entity';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateuser.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('Users')
        private readonly user: typeof Users,
        @Inject('UserImage')
        private readonly userImage: typeof UserImage,
        private readonly logger:Logger
    ){
        this.logger=new Logger('Users');
    }
  getAllUser() {
    this.logger.log('Get Users');
    return this.user.findAll();
  }

  async createUser(createuser:CreateUserDto):Promise<Users> {
    this.logger.log('Create User');
    const findPhone:Users[]=await this.user.findAll({
        where:{
            phoneNumber:createuser.phoneNumber
        }
    })
    if(findPhone.length===0){
        const user:Users=await this.user.create({
            userName:createuser.userName,
            phoneNumber:createuser.phoneNumber,
            update_by:createuser.update_by,
            create_by:createuser.update_by
        } as Partial<Users>);
        const userImage:UserImage=await this.userImage.create({
            userId:user.userId,
            image: Buffer.from(createuser.image,"base64"),
            update_by:createuser.update_by,
            create_by:createuser.update_by
        } as Partial<UserImage>)
        return this.user.findOne({
            where:{
                userId:user.userId
            },
            include: [UserImage]
        })
    } else {
        this.logger.error(`Phone number already available-${createuser.phoneNumber}`);
        throw new HttpException('Phone number already available', HttpStatus.FORBIDDEN);
    }
  }

  async getUserById(userId:number):Promise<Users> {
    this.logger.log(`Get User By Id-${userId}`);
    const findUser:Users=await this.user.findOne({
        where:{
            userId
        },
        include: [UserImage]
    });
    const buffer = Buffer.from(findUser.userImage.image as Buffer);
    const bufferBase64 = buffer.toString('base64');
    this.logger.log(bufferBase64);
    if(findUser && findUser.userId){
        return findUser
    } else{
        this.logger.error(`User ID not available-${userId}`);
        throw new HttpException('User ID not available', HttpStatus.FORBIDDEN);
    }
  }

  async updateUser(userId:number,updateUser:UpdateUserDto):Promise<Users> {
    this.logger.log(`Update User By Id-${userId}`);
    const findUser:Users=await this.user.findByPk(userId)
    if(findUser && findUser.userId){
        await this.user.update(updateUser,{ where: { userId }});
        if(updateUser.image){
            await this.userImage.update({...updateUser,image:Buffer.from(updateUser.image,"base64")},{ where: { userId }});
        }
        const user:Users=await this.user.findOne({
            where:{
                userId
            },
            include: [UserImage]
        })
        return user;
    } else {
        this.logger.error(`User ID not available for Update-${userId}`);
        throw new HttpException('Cannot update.User ID not available', HttpStatus.FORBIDDEN);
    }
  }

  async deleteUser(userId:number):Promise<Users> {
    this.logger.log(`Delete User By Id-${userId}`);
    const findUser:Users=await this.user.findByPk(userId)
    if(findUser && findUser.userId){
        const user:Users=await this.user.findOne({
            where:{
                userId
            },
            include: [UserImage]
        })
        await this.user.destroy({ where: { userId }})
        await this.userImage.destroy({ where: { userId }})
        return user;
    } else {
        this.logger.error(`User ID not available for Delete-${userId}`);
        throw new HttpException('Cannot delete.User ID not available', HttpStatus.FORBIDDEN);
    }
  }
}
