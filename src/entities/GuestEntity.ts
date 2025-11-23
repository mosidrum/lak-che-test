import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import {Property} from "./PropertyEntity";
import {Otp} from "./OTPEntity";

@Entity()
export class Guest {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    ssn: string;

    @Column()
    phoneNumber: string;

    @ManyToOne(() => Property, property => property.guests, { nullable: true })
    property: Property;

    @OneToMany(() => Otp, otp => otp.guest)
    otps: Otp[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
