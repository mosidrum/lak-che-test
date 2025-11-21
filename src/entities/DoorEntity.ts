import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne, OneToMany
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

    @ManyToOne(() => Property, (property) => property.doors)
    property: Property;

    @OneToMany(() => AccessPin, (pin) => pin.door)
    accessPins: AccessPin[];
}
