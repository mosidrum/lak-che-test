import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Property} from "./PropertyEntity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ unique: true })
  phoneNumber: string;

  @Column({ type: 'enum', enum: ['OWNER', 'GUEST'] })
  role: 'OWNER' | 'GUEST';

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[];

  @CreateDateColumn()
  createdAt: Date;
}
