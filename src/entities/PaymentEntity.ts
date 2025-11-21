import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn
} from 'typeorm';
import {BookingEntity} from "./BookingEntity";


export enum PaymentStatus {
    PENDING = 'pending',
    CONFIRMED = 'confirmed',
    FAILED = 'failed'
}


@Entity()
export class PaymentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => BookingEntity, booking => booking.payment)
    @JoinColumn()
    booking: BookingEntity;

    @Column('decimal')
    amount: number;

    @Column()
    paymentMethod: string;

    @Column({ nullable: true })
    proofUrl: string;

    @Column({ type: 'enum', enum: PaymentStatus })
    status: PaymentStatus;

    @CreateDateColumn()
    paidAt: Date;
}
