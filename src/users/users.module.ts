import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/user.entity';
import {ResponseUtilService} from '../common/response'

@Module({
  imports:[TypeOrmModule.forFeature([users])],
  controllers: [UsersController],
  providers: [UsersService,ResponseUtilService],
})
export class UsersModule {}
