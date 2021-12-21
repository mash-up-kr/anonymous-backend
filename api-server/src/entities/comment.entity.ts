import { User } from './user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Review } from './review.entity';

@Entity({ name: 'review_comments' })
export class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Review, (review) => review.comments, { onDelete: 'SET NULL' })
  review: Promise<Review>;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  user: User;

  @ApiProperty({ type: Number })
  @RelationId((comment: Comment) => comment.user)
  userId: number;

  @ApiProperty()
  @Column({ type: 'text' })
  content: string;

  @ApiProperty()
  @Column({ default: '' })
  reportUserIds: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * 답글
   */
  @ManyToOne(() => Comment, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
  parent?: Comment;

  @ApiPropertyOptional({ type: Number })
  @RelationId((comment: Comment) => comment.parent)
  parentId?: number;

  @OneToMany(() => Comment, (comment) => comment.parent)
  children: Comment[];
}
