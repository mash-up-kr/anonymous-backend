import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from './comment.entity';
import { Keyword } from './keyword.entity';
import { User } from './user.entity';
import { App } from './app.entity';

export enum Hole {
  BLACK = 'black',
  WHITE = 'white',
}

@Entity()
export class Review {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  content: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Hole,
  })
  hole: Hole;

  @ManyToMany(() => Keyword, (keyword) => keyword.posts)
  @JoinTable({
    name: 'review_keywords',
  })
  keywords: Keyword[];

  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  @ManyToOne(() => App, (app) => app.reviews)
  app: App;

  @OneToMany(() => Comment, (comment) => comment.review)
  comments: Comment[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deletedAt: Date;
}
