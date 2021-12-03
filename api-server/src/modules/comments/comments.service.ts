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

  async findAll(reviewId: number): Promise<Comment[]> {

    const comment = await this.commentRepository
      .createQueryBuilder('comments')
      .select([
          'comments',
      ])
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('comments.children', 'children')
      .leftJoinAndSelect('children.user', 'children_user')
      .where('comments.review=:reviewId',{reviewId})
      .andWhere('comments.parentId is null')
      .loadRelationCountAndMap('comments.childrenCount','comments.children')
      .getMany()

      return comment;
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

    if (comment.userId !== user.id) {
      throw new ForbiddenException();
    }

    await this.commentRepository.remove(comment);
    return { isDeleted: true };
  }
}
