import {
    Table,
    PrimaryKey,
    AutoIncrement,
    Column,
    DataType,
    Model,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
} from 'sequelize-typescript';
import { Users } from './user.entity';

@Table({
    tableName: 'userimage',
})
export class UserImage extends Model<UserImage> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.BIGINT)
    userImageId: number;

    @ForeignKey(()=> Users)
    @Column(DataType.BIGINT)
    userId: number;

    @Column(DataType.BLOB('long'))
    image: Object;

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
