import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { TypegooseModule } from 'nestjs-typegoose';


@Module({
  imports:[TypegooseModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
