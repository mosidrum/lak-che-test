import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn} from "typeorm";
import {BookingEntity} from "./BookingEntity";
import {CarEntity} from "./CarEntity";
import {EmailVerificationEntity} from "./EmailVerificationEntity";

export enum UserRole {
  OWNER = 'owner',
  RENTER = 'renter',
  ADMIN = 'admin',
  RENTAL_USER = 'rental_user'
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

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ default: false })
  documentsSubmitted: boolean;

  @Column({ type: 'text', default: '[]' })
  documents: string;

  @Column({ default: false })
  isSuspended: boolean;

  @OneToMany(() => CarEntity, car => car.owner)
  cars: CarEntity[];

  @OneToMany(() => BookingEntity, booking => booking.renter)
  bookings: BookingEntity[];

  @OneToMany(() => EmailVerificationEntity, verification => verification.user)
  emailVerifications: EmailVerificationEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
