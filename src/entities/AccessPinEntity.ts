import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import {User} from "./UserEntity";
import {Property} from "./PropertyEntity";
import {Door} from "./DoorEntity";
import {Guest} from "./GuestEntity";

@Entity()
export class AccessPin {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    pinCode: string;

    @ManyToOne(() => Guest, (guest) => guest.accessPins)
    guest: Guest;

    @ManyToOne(() => Property)
    property: Property;

    @ManyToOne(() => Door, (door) => door.accessPins)
    door: Door;

    @Column({ type: 'timestamp' })
    validFrom: Date;

    @Column({ type: 'timestamp' })
    validUntil: Date;

    @Column({ type: 'enum', enum: ['ACTIVE', 'EXPIRED'] })
    status: 'ACTIVE' | 'EXPIRED';
}

