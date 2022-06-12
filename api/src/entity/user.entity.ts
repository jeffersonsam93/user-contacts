import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasOne,
} from 'sequelize-typescript';
import { UserImage } from './userimage.entity';

@Table({
    tableName: 'users',
})
export class Users extends Model<Users> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    userId: number;

    @Column(DataType.STRING)
    userName: string;

    @Column(DataType.STRING)
    phoneNumber: string;

    @HasOne(() => UserImage)
    userImage: UserImage;

    @Column(DataType.STRING)
    create_by: string;

    @CreatedAt
    @Column({ field: 'create_on' })
    create_on: Date;

    @Column(DataType.STRING)
    update_by: string;

    @UpdatedAt
    @Column({ field: 'update_on' })
    update_on: Date;

    @DeletedAt
    @Column({ field: 'deleted_at' })
    deletedAt: Date;
}
