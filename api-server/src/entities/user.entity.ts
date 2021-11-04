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
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { AbuseReport } from './abuse-report.entity';
import { Hit } from './hit.entity';
import { Review } from './review.entity';
import { ReviewLike } from './review-like.entity';

export type JwtUser = Pick<User, 'id' | 'email'>;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @ApiHideProperty()
  password: string;

  @Column()
  @Index({ unique: true })
  @ApiProperty()
  nickname: string;

  @Column({ default: null })
  @ApiProperty()
  planetType: string;

  @Column({ default: null })
  @ApiProperty()
  avatarItemType: string;

  @Column({ default: false })
  @ApiProperty()
  isVerified: boolean;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => AbuseReport, (abusereport) => abusereport.user)
  abusereports: AbuseReport[];

  @OneToMany(() => Hit, (hit) => hit.user)
  hits: Hit[];

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => ReviewLike, (reviewLike) => reviewLike.user)
  like_reviews: ReviewLike[];
}
