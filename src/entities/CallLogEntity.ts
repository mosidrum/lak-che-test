import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Property} from "./PropertyEntity";
import { User } from "./UserEntity";

@Entity()
export class CallLog {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Property, (property) => property.callLogs)
    property: Property;

    @ManyToOne(() => User)
    owner: User;

    @Column()
    guestPhone: string;

    @Column({ type: 'enum', enum: ['ANSWERED', 'MISSED', 'ENDED'] })
    status: 'ANSWERED' | 'MISSED' | 'ENDED';

    @CreateDateColumn()
    createdAt: Date;
}
