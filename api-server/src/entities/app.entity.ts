import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review.entity';

@Entity({ name: 'app' })
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  name: string;

  @Column()
  iconUrl: string;

  @Column({ default: 0 })
  review_count_white: number;

  @Column({ default: 0 })
  review_count_black: number;

  /**
   * Join columns
   */
  @OneToMany(() => Review, (review) => review.app)
  reviews: Review[];

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
