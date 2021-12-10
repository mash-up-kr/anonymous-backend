import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum AbuseType {
  Review = 'review',
  Reply = 'comment',
}

export enum Status {
  received = 'received',
  processing = 'processing',
  Done = 'done',
}

@Entity({ name: 'abuse_report' })
export class AbuseReport {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  targetId: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: AbuseType,
  })
  type: AbuseType;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: Status,
    default: 'received',
  })
  status: Status;

  @ManyToOne(() => User, (user) => user.abusereports, { onDelete: 'SET NULL' })
  user: User;

  @ApiProperty({ type: Number })
  @RelationId((abuseReport: AbuseReport) => abuseReport.user)
  userId: number;

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
