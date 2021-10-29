import { User } from "src/entities/user.entity";
import { Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId,
    UpdateDateColumn,
} from "typeorm";
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Review } from "./review.entity";

@Entity({ name: "review_comments" })
export class Comment {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Review, (review) => review.comments)
    review: Promise<Review>;

    @ManyToOne(() => User)
    user: User;

    @ApiProperty({ type: Number })
    @RelationId((comment: Comment) => comment.user)
    userId: number;

    @ApiProperty()
    @Column({ type: 'text' })
    content: string;

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
    @ManyToOne(() => Comment)
    @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
    parent?: Comment;

    @ApiPropertyOptional({ type: Number })
    @RelationId((comment: Comment) => comment.parent)
    parentId?: number;

    @OneToMany(() => Comment, (comment) => comment.parent)
    children: Comment[];
}
