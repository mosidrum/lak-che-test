import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { PaymentEntity } from './PaymentEntity';
import {UserEntity} from "./UserEntity";
import {CarEntity} from "./CarEntity";


export enum BookingStatus {
    REQUESTED = 'requested',
    AWAITING_PAYMENT = 'awaiting_payment',
    PAID = 'paid',
    ACTIVE = 'active',
    RETURNED = 'returned',
    CANCELLED = 'cancelled',
    OVERDUE = 'overdue'
}


@Entity()
export class BookingEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.bookings)
    renter: UserEntity;

    @ManyToOne(() => CarEntity, car => car.bookings)
    car: CarEntity;

    @Column({ type: 'timestamp' })
    startTime: Date;

    @Column({ type: 'timestamp' })
    endTime: Date;

    @Column({ type: 'enum', enum: BookingStatus })
    status: BookingStatus;

    @OneToOne(() => PaymentEntity, payment => payment.booking)
    payment: PaymentEntity;

    @Column({ nullable: true })
    accessCode: string;

    @Column({ default: 0 })
    lateFee: number;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
