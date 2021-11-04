import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewLike } from 'src/entities/review-like.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(ReviewLike)
        private readonly likesRepository: Repository<ReviewLike>,
    ) {}

    async getLikedUsers(reviewId: number) {
        const [data, count] = await this.likesRepository.findAndCount({
            where: {
                reviewId,
            },
        });

        return {
            count,
            data,
        }
    }

    getLikePosts(user: User): Promise<ReviewLike[]> {
        return this.likesRepository.find({
            where: {
                user,
            },
            relations: ['review'],
        });
    }

    async isLiked(user: User, reviewId: number): Promise<boolean> {
        const liked = await this.likesRepository.findOne({
            where: {
                reviewId,
                user,
            },
        });

        return liked !== undefined;
    }

    async like(reviewId: number, user: User): Promise<ReviewLike> {
        const liked = await this.likesRepository.findOne({
            where: {
                reviewId,
                user,
            },
        });
        if (liked) {
            throw new BadRequestException();
        }
        const payload = this.likesRepository.create({
            reviewId,
            userId: user.id,
        });
        return this.likesRepository.save(payload);
    }
    
    async unlike(reviewId: number, user: User) {
        const liked = await this.likesRepository.findOne({
            where: {
                reviewId,
                user,
            },
        });
        if (liked && this.likesRepository.remove(liked)) {
            return {
                result: true,
            }
        }
        return {
            result: false,
        };
    }
}
