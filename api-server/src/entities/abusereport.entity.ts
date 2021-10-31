import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  RelationId
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Type {
  Review = 'review',
  Reply = 'comment',
}

export enum Status {
  received = 'received',
  processing = 'processing',
  Done = 'done',
}

@Entity()
export class AbuseReport {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  targetId :number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Type,
  })
  type: Type;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Status,
    default : 'received'
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.abusereports)
  user: User;

  @ApiProperty({ type: Number })
  @RelationId((abusereport: AbuseReport) => abusereport.user)
  userId: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
