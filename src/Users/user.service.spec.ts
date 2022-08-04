import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { getModelToken } from 'nestjs-typegoose';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';

afterAll(async () => {
  await mongoose.connection.close();
  await mongoose.disconnect();
});

describe('UserService', () => {
  let service: UsersService;
  //const fakeModel = jest.fn();
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: User,
      },
      ],
      controllers: [UsersController],

    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should get the user create', async () => {
    const user = {
      email: 'sample@abc.com',
      password: 'abc'
    }
    const result = await service.create(user);
    expect(result.email).toBe(user.email);
  })
});
