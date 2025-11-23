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
import {AccessPin} from "./AccessPinEntity";

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

    @OneToMany(() => AccessPin, (pin) => pin.guest)
    accessPins: AccessPin[];


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
