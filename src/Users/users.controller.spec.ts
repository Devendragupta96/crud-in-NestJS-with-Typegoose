import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getModelToken, TypegooseModule } from 'nestjs-typegoose';
import { UsersController } from '../Users/users.controller';
import { UsersService } from '../Users/users.service';
import { UsersModule } from './users.module';
 
let mongod: MongoMemoryServer;
describe('UsersController', () => {
  let controller: UsersController;
  const fakeModel=jest.fn();
  beforeEach(async () => {
    mongod = await MongoMemoryServer.create();
    const module = await Test.createTestingModule({
      imports: [
        TypegooseModule.forRootAsync({
          useFactory: async () => ({
            uri: await mongod.getUri(),
          }),
        }),
        UsersModule],
      controllers: [UsersController],
      providers: [UsersService,
      {
        provide:getModelToken('User'),
        useValue:fakeModel
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
