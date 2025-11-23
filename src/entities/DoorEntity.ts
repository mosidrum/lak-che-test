import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany, OneToOne, JoinColumn
} from 'typeorm';
import {Property} from "./PropertyEntity";
import {AccessPin} from "./AccessPinEntity";

@Entity()
export class Door {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    lockId: string;

    @Column({ default: false })
    hasBeenOpened: boolean;

    @OneToOne(() => Property, (property) => property.door, { onDelete: 'CASCADE' })
    @JoinColumn()
    property: Property;

    @OneToMany(() => AccessPin, (pin) => pin.door)
    accessPins: AccessPin[];
}
