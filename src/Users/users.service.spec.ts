import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Model } from 'mongoose';
import { getModelToken, TypegooseModule } from 'nestjs-typegoose';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { jest } from '@jest/globals';
// let mongod: MongoMemoryServer;
// afterAll(async () => {
//   await mongoose.connection.close();
//   await mongoose.disconnect();
// });

describe('UserService', () => {
  let service: UsersService;

  // let model:Model<User>;
  const fakeModel = {
    create: jest.fn(),
    findById: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn()
  }
  // const fakeModel = jest.fn();
  beforeEach(async () => {
    //mongod = await MongoMemoryServer.create();
    const module: TestingModule = await Test.createTestingModule({
      // imports:[TypegooseModule.forRootAsync({
      //             useFactory: async () => ({
      //               uri: await mongod.getUri(),
      //             }),
      //           }),
      //   ],
      providers: [UsersService, {
        provide: getModelToken('User'),
        useValue: fakeModel,       //User
      },
      ],
      //controllers: [UsersController],

    }).compile();

    service = module.get<UsersService>(UsersService);
    //model=module.get<User>(User);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create the user', async () => {
    let user = {
      email: 'sample11@abc.com',
      password: 'abc'
    }

    let result = await service.create(user);
    //console.log(result);

    expect(result).toEqual({ ok: true });

  });
  it('should get user detail by id', async () => {
    const result = await service.findUser('62eaba6b78e3f761a96ca4e7');
    expect(result).toEqual({ ok: true });
  });
  it('should find all the users', async () => {
    const result = await service.findAll();
    expect(result).toBeDefined();
  });
  it('should delete the users', async () => {
    const result = await service.remove('62eaba6b78e3f761a96ca4e7');
    expect(result).toBeDefined();
  });
  it('should update the users', async () => {
    let user = {
      email: 'sample11@abc.com',
      password: 'abc'
    }
    const result = await service.update('62eaba6b78e3f761a96ca4e7', user);
    expect(result).toBeDefined();
  });
  it('should not create the user', async () => {
    let user = {
      email: 'abc',
      password: 'abc'
    }

    let result = await service.create(user);
    //console.log(result);

    expect(result.newUser).not.toBeDefined();

  });
});
