import { User } from "src/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId, UpdateDateColumn } from "typeorm";
import { Review } from "./review.entity";

@Entity({ name: "review_comments" })
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Review, (review) => review.comments)
    review: Promise<Review>;

    @ManyToOne(() => User)
    user: User;

    @RelationId((comment: Comment) => comment.user)
    userId: number;

    @Column({ type: 'text' })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;

    /**
     * 답글
     */
    @ManyToOne(() => Comment)
    @JoinColumn({ name: 'parentId', referencedColumnName: 'id' })
    parent?: Comment;

    @RelationId((comment: Comment) => comment.parent)
    parentId?: number;

    @OneToMany(() => Comment, (comment) => comment.parent)
    children: Comment[];
}
