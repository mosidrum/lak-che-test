import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Guest} from "./GuestEntity";

@Entity()
export class Otp {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    code: string;

    @Column({ default: 'UNUSED' })
    status: 'UNUSED' | 'USED' | 'EXPIRED';

    @ManyToOne(() => Guest, guest => guest.otps)
    guest: Guest;

    @Column()
    expiresAt: Date;
}
