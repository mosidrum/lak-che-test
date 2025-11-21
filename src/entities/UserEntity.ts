import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn} from "typeorm";
import {BookingEntity} from "./BookingEntity";
import {CarEntity} from "./CarEntity";

export enum UserRole {
  OWNER = 'owner',
  RENTER = 'renter',
  ADMIN = 'admin'
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ nullable: true })
  idDocumentUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => CarEntity, car => car.owner)
  cars: CarEntity[];

  @OneToMany(() => BookingEntity, booking => booking.renter)
  bookings: BookingEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
