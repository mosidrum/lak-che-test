import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Guest} from "./GuestEntity";

export enum OtpStatus {
    UNUSED = 'unused',
    USED = 'used',
    EXPIRED = 'expired'
}

@Entity()
export class Otp {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    code: string;

    @Column({ default: OtpStatus.UNUSED })
    status: OtpStatus

    @ManyToOne(() => Guest, guest => guest.otps)
    guest: Guest;

    @Column()
    expiresAt: Date;
}
