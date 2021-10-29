import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { User } from './user.entity';

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
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    targetId :number;

    @Column({
      type: 'enum',
      enum: Type,
    })
    type: Type;

    @Column({
      type: 'enum',
      enum: Status,
      default : 'received'
    })
    status: Status;

    @ManyToOne(() => User, (user) => user.abusereports)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
  }
