import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Keyword } from "./keyword.entity";
import { User } from "./user.entity";

export enum Hole {
    BLACK = "black",
    WHITE = "white",
}

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    // @OneToOne(type => App)
    // @JoinColumn()
    // app: App;

    @Column('text')
    content: string;

    @Column({
        type: "enum",
        enum: Hole,
    })
    hole: Hole;

    @ManyToMany(() => Keyword, keyword => keyword.posts)
    @JoinTable({
        name: 'review_keywords'
    })
    keywords: Keyword[];

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
