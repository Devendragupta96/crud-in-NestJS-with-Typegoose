import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model } from 'mongoose';
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
  let model:Model<User>;
  const fakeModel = jest.fn();
  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: fakeModel,
      },
      ],
      controllers: [UsersController],

    }).compile();

    service = module.get<UsersService>(UsersService);
    //model=module.get<User>(User);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create the user', async () => {
    let user = {
      email: 'sample@abc.com',
      password: 'abc'
    }
    
    let result = await service.create(user);
    expect(result).toBeTruthy();
    
  });
  it('should get user detail by id',async ()=>{
    const result=await service.findUser('62eaba6b78e3f761a96ca4e7');
    expect(result).toBeDefined();
  });
});
