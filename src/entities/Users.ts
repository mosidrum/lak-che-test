import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({
    type: "varchar",
    unique: true,
    length: 255,
  })
  email!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;
}
