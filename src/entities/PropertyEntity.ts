import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne, OneToMany, OneToOne,
} from 'typeorm';
import {CallLog} from "./CallLogEntity";
import {User} from "./UserEntity";
import {Door} from "./DoorEntity";
import {Guest} from "./GuestEntity";


@Entity()
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    image: string;

    @Column({ default: true })
    isAvailable: boolean;

    @Column()
    qrCode: string;

    @ManyToOne(() => User, (user) => user.properties)
    owner: User;

    @OneToOne(() => Door, (door) => door.property)
    door: Door;

    @OneToMany(() => CallLog, (call) => call.property)
    callLogs: CallLog[];

    @OneToMany(() => Guest, guest => guest.property)
    guests: Guest[];
}
