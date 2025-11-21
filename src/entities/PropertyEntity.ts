import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne, OneToMany,
} from 'typeorm';
import {CallLog} from "./CallLogEntity";
import {User} from "./UserEntity";
import {Door} from "./DoorEntity";


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

    @Column()
    qrCode: string;

    @ManyToOne(() => User, (user) => user.properties)
    owner: User;

    @OneToMany(() => Door, (door) => door.property)
    doors: Door[];

    @OneToMany(() => CallLog, (call) => call.property)
    callLogs: CallLog[];
}
