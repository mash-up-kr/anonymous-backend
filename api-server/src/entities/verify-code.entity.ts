import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('verify_code')
export class VerifyCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Index({ unique: true })
  @Column()
  email: string;

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;
}
