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
import { AbuseReport } from './abusereport.entity';
import { Hit } from './hit.entity';
import { Review } from './review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Index({ unique: true })
  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiHideProperty()
  password: string;

  @Column()
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
}
