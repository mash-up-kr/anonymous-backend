import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { RemoveCommentResponseDto } from './dto/remove-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from '../../entities/comment.entity';
import { ReviewService } from '../review/review.service';
import { CommentResponseDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private readonly reviewService: ReviewService,
  ) {}

  async create(
    user: User,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const { reviewId, parentId, content } = createCommentDto;

    let review = null;
    if (reviewId) {
      review = await this.reviewService.findOne(reviewId);
    }

    let parent = null;
    if (parentId) {
      parent = await this.findOne(parentId);
      review = await parent.review;
    }

    const comment = this.commentRepository.create({
      user,
      review,
      parent,
      content,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async findAll(reviewId: number): Promise<CommentResponseDto[]> {

    const comment = await this.commentRepository
      .createQueryBuilder('comments')
      .select([
          'comments',
      ])
      .leftJoinAndSelect('comments.user', 'user')
      .where('comments.review=:reviewId',{reviewId})
      .orderBy('comments.id')
      .getMany();

      return this.formatCommentHierarchy(comment);
  }

  formatCommentHierarchy(comments: Comment[]): CommentResponseDto[] {
    const result = comments.reduce((acc, cur) => {
      const data = {
        ...cur,
        blocked: cur.abuseCount >= 5,
      };
      if (!cur.parentId) {
        acc[cur.id] = {
          ...data,
          children: [],
          childrenCount: 0,
        };
      } else {
        if (acc[cur.parentId]) {
          acc[cur.parentId].children = [
            ...acc[cur.parentId].children,
            data,
          ];
          acc[cur.parentId].childrenCount += 1;
        }
      }
      return acc;
    }, {});

    return Object.values(result);
  }


  findOne(id: number): Promise<Comment> {
    const comment = this.commentRepository.findOne(id);
    if (!comment) {
      throw new NotFoundException();
    }
    return comment;
  }

  async update(
    user: User,
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const { content } = updateCommentDto;
    if (!content) {
      throw new BadRequestException();
    }

    const comment = await this.findOne(id);

    if (comment.userId !== user.id) {
      throw new ForbiddenException();
    }

    comment.content = content;
    return await this.commentRepository.save(comment);
  }

  async remove(user: User, id: number): Promise<RemoveCommentResponseDto> {
    const comment = await this.findOne(id);

    if (!comment) {
      throw new NotFoundException();
    }

    if (comment.userId !== user.id) {
      throw new ForbiddenException(`Cannot delete other user's comment`);
    }

    const result = await this.commentRepository.softDelete(id);
    if (!result.affected) {
      return { isDeleted: false };
    }
    return { isDeleted: true };
  }

  async updateAbuseCount(id: number, amount: number): Promise<void> {
    try {
      const comment = await this.findOne(id);
      comment.abuseCount += amount;

      await this.commentRepository.save(comment);
    } catch (error) {
      
    }
  }
}
