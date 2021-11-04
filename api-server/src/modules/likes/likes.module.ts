import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewLike } from 'src/entities/review-like.entity';
import { LikesService } from './likes.service';

@Module({
    imports: [TypeOrmModule.forFeature([ReviewLike])],
    providers: [LikesService],
    exports: [LikesService],
})
export class LikesModule {}
