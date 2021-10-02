import {
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne
  } from 'typeorm';
  import { User } from './user.entity';

  @Entity()
  export class Hit {
    @PrimaryGeneratedColumn()
    userId: number;

    /**
     * Timestamp
     */
    @CreateDateColumn()
    createdAt: Date;

    /**
   * Relations
   */
    @ManyToOne(() => User, (user) => user.hits)
    user: User;
  }
