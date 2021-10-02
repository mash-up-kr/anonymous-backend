import { Keyword } from '../../entities/keyword.entity';
import { Module } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { KeywordController } from './keyword.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword])],
  controllers: [KeywordController],
  providers: [KeywordService],
  exports: [KeywordService],
})
export class KeywordModule {}
