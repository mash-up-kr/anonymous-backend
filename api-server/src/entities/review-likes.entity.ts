import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity('review_likes')
export class ReviewLike {
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * relation
   */
  @ManyToOne(() => User, (user) => user.reviewLikes)
  user: User;

  /**
   * relation
   */
  @ManyToOne(() => Review, (review) => review.likes)
  review: Review;
}
