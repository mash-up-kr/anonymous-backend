import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Review } from "./review.entity";
import { User } from "./user.entity";

@Entity({ name: 'review_like' })
export class ReviewLike {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reviewId!: number;

    @Column()
    userId!: number;

    @ManyToOne(() => Review, (review) => review.liked_users)
    review!: Review;

    @ManyToOne(() => User, (user) => user.like_reviews)
    user!: User;

    @CreateDateColumn()
    createdAt: Date;
}