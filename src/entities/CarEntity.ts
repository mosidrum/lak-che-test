import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {UserEntity} from "./UserEntity";
import {BookingEntity} from "./BookingEntity";

@Entity()
export class CarEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @Column()
    plateNumber: string;


    @Column()
    brand: string;


    @Column()
    model: string;


    @Column()
    location: string;


    @Column('decimal')
    pricePerHour: number;


    @Column({ default: true })
    isAvailable: boolean;


    @ManyToOne(() => UserEntity, user => user.cars)
    owner: UserEntity;


    @OneToMany(() => BookingEntity, booking => booking.car)
    bookings: BookingEntity[];


    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;
}
